import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';
import './Header.css';

interface PersonalInfo {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
}

interface HeaderProps {
    personalInfo: PersonalInfo;
}

export const Header = ({ personalInfo }: HeaderProps) => {
    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.header
            className="header"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 className="header-name" variants={itemVariants}>
                {personalInfo.name}
            </motion.h1>
            <motion.p className="header-title" variants={itemVariants}>
                {personalInfo.title}
            </motion.p>
            <motion.div className="header-contact" variants={itemVariants}>
                <div className="contact-item">
                    <FiMapPin className="contact-icon" />
                    <span>{personalInfo.location}</span>
                </div>
                <div className="contact-item">
                    <FiMail className="contact-icon" />
                    <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </div>
                <div className="contact-item">
                    <FiPhone className="contact-icon" />
                    <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                </div>
            </motion.div>
            <motion.div className="header-social" variants={itemVariants}>
                {personalInfo.github && (
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link">
                        <FiGithub className="social-icon" />
                    </a>
                )}
                {personalInfo.linkedin && (
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                        <FiLinkedin className="social-icon" />
                    </a>
                )}
            </motion.div>
            <motion.div className="header-download" variants={itemVariants}>
                <a 
                    href="/GibinGeorgeReact.pdf" 
                    download="Gibin_George_Resume.pdf"
                    className="download-button"
                >
                    <span className="download-content">
                        <FiDownload className="download-icon" />
                        Download Resume
                    </span>
                </a>
            </motion.div>
        </motion.header>
    );
};
