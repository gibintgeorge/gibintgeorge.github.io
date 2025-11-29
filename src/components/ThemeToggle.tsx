import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import './ThemeToggle.css';

interface ThemeToggleProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
    return (
        <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <FiMoon className="theme-icon" />
            ) : (
                <FiSun className="theme-icon" />
            )}
        </motion.button>
    );
};
