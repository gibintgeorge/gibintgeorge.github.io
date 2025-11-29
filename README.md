# Gibin Thattayath George - Portfolio

A modern, interactive portfolio website built with React, TypeScript, and Framer Motion. Features a beautiful dark/light theme toggle with localStorage persistence, smooth animations, and responsive design.

🌐 **Live Demo**: [https://gibintgeorge.github.io](https://gibintgeorge.github.io)

## 🚀 Features

- ✨ **Modern UI/UX** - Clean, professional design with smooth animations
- 🌓 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Vite for optimal speed
- 🎨 **Framer Motion Animations** - Smooth, professional animations throughout
- ♿ **Accessible** - WCAG compliant design
- 🔧 **TypeScript** - Type-safe codebase
- 📦 **Component-Based** - Modular, reusable components
- 🚀 **Auto-Deploy** - GitHub Actions workflow for automatic deployment

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **CSS3** - Styling with CSS variables for theming
- **GitHub Pages** - Hosting
- **GitHub Actions** - CI/CD

## 📦 Local Development

1. Clone the repository:
```bash
git clone https://github.com/gibintgeorge/gibintgeorge.github.io.git
cd gibintgeorge.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📝 Customization

### Update Resume Data

Edit `src/data/resume-data.json` to update your personal information, skills, experience, and education.

### Theme Customization

Modify CSS variables in `src/App.css` to customize colors:

```css
:root[data-theme="light"] {
    --accent-color: #2563eb;
    --gradient-start: #3b82f6;
    --gradient-end: #8b5cf6;
    /* ... */
}
```

### Components

All components are in `src/components/`:
- `Header.tsx` - Personal info and social links
- `Summary.tsx` - Professional summary
- `Skills.tsx` - Skills categorized by type
- `Experience.tsx` - Work experience with expandable details
- `Education.tsx` - Educational background
- `ThemeToggle.tsx` - Dark/light mode toggle

## 🚀 Deployment

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

The GitHub Actions workflow will:
1. Build the React app
2. Deploy to GitHub Pages
3. Make it available at your GitHub Pages URL

## 📄 License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ using React, TypeScript, and Vite
