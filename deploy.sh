#!/bin/bash

# Portfolio Deployment Script for Oracle Cloud VM
# This script automates the deployment process

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Portfolio Deployment Script ===${NC}\n"

# Configuration - UPDATE THESE VALUES


VM_PORT="22"                        # Default: SSH port (usually 22)
SSH_KEY="$HOME/.ssh/id_rsa"        # Default private key path
REMOTE_DIR="/var/www/portfolio"     # Where to deploy on the server
NGINX_CONF="/etc/nginx/sites-available/portfolio"

usage() {
    echo "Usage: $0 [--user <vm_user> | -u <vm_user>] [--host <vm_ip> | -h <vm_ip>] [--port <port> | -p <port>]"
    echo "Example: $0 --user ubuntu --host 1.2.3.4 --port 22"
}

# Parse command-line arguments (support long and short forms)
while [[ $# -gt 0 ]]; do
    case $1 in
        --user|-u)
            VM_USER="$2"
            shift 2
            ;;
        --host|-h)
            VM_HOST="$2"
            shift 2
            ;;
        --port|-p)
            VM_PORT="$2"
            shift 2
            ;;
        --key|-k)
            SSH_KEY="$2"
            shift 2
            ;;
        --help|-help|-\?| -help)
            usage
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            usage
            exit 1
            ;;
    esac
done

# Basic validation
if [[ -z "$VM_HOST" || "$VM_HOST" == "your-vm-ip-address" ]]; then
    echo -e "${RED}Error: You must provide a valid VM host/IP via --host or -h${NC}"
    usage
    exit 1
fi

if [[ -z "$VM_USER" ]]; then
    echo -e "${YELLOW}Warning: VM user is empty, using default 'ubuntu'${NC}"
    VM_USER="ubuntu"
fi

if [[ -z "$VM_PORT" ]]; then
    echo -e "${YELLOW}Warning: VM port is empty, using default '22'${NC}"
    VM_PORT="22"
fi

# Check that SSH key file exists
if [[ ! -f "$SSH_KEY" ]]; then
    echo -e "${YELLOW}Warning: SSH key not found at $SSH_KEY${NC}"
    echo -e "${YELLOW}The script will still attempt to use SSH but may prompt for a password.${NC}"
fi

# Check if SSH key exists
if [ ! -f ~/.ssh/id_rsa ]; then
    echo -e "${YELLOW}Warning: No SSH key found at ~/.ssh/id_rsa${NC}"
    echo "You may need to enter your password multiple times"
fi

# Step 1: Build the project
echo -e "${GREEN}Step 1: Building the project...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}Error: Build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build completed successfully${NC}\n"

# Step 2: Create deployment archive
echo -e "${GREEN}Step 2: Creating deployment archive...${NC}"
tar -czf portfolio-build.tar.gz -C dist .
echo -e "${GREEN}✓ Archive created${NC}\n"

# Step 3: Upload files to server
echo -e "${GREEN}Step 3: Uploading files to server...${NC}"
scp -i "$SSH_KEY" -P $VM_PORT portfolio-build.tar.gz ${VM_USER}@${VM_HOST}:~/ || {
    echo -e "${RED}Error: Failed to upload files${NC}"
    exit 1
}
echo -e "${GREEN}✓ Files uploaded${NC}\n"

# Step 4: Deploy on server
echo -e "${GREEN}Step 4: Deploying on server...${NC}"
ssh -i "$SSH_KEY" -p $VM_PORT ${VM_USER}@${VM_HOST} << 'ENDSSH'
    set -e
    
    # Create directory if it doesn't exist
    sudo mkdir -p /var/www/portfolio
    
    # Extract files
    sudo tar -xzf ~/portfolio-build.tar.gz -C /var/www/portfolio/
    
    # Set proper permissions
    sudo chown -R www-data:www-data /var/www/portfolio
    sudo chmod -R 755 /var/www/portfolio
    
    # Clean up
    rm ~/portfolio-build.tar.gz
    
    echo "Files deployed successfully"
ENDSSH

echo -e "${GREEN}✓ Deployment completed${NC}\n"

# Step 5: Upload and configure Nginx
echo -e "${GREEN}Step 5: Configuring Nginx...${NC}"
scp -i "$SSH_KEY" -P $VM_PORT nginx.conf ${VM_USER}@${VM_HOST}:~/ || {
    echo -e "${RED}Error: Failed to upload nginx config${NC}"
    exit 1
}

ssh -i "$SSH_KEY" -p $VM_PORT ${VM_USER}@${VM_HOST} << 'ENDSSH'
    set -e
    
    # Copy nginx config
    sudo cp ~/nginx.conf /etc/nginx/sites-available/portfolio
    
    # Enable site
    sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
    
    # Remove default config if exists
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test nginx configuration
    sudo nginx -t
    
    # Reload nginx
    sudo systemctl reload nginx
    
    # Clean up
    rm ~/nginx.conf
    
    echo "Nginx configured and reloaded"
ENDSSH

echo -e "${GREEN}✓ Nginx configured${NC}\n"

# Clean up local files
rm portfolio-build.tar.gz

echo -e "${GREEN}==================================${NC}"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}==================================${NC}"
echo -e "\nYour portfolio should now be accessible at:"
echo -e "${YELLOW}http://${VM_HOST}:3000${NC}"
echo -e "\nMake sure port 3000 is open in your Oracle Cloud security rules!\n"
