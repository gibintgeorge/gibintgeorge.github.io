import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { ThemeToggle } from './components/ThemeToggle';
import { HomePage } from './pages/HomePage';
import { SummaryPage } from './pages/SummaryPage';
import { SkillsPage } from './pages/SkillsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { EducationPage } from './pages/EducationPage';
import resumeData from './data/resume-data.json';
import './App.css';

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Router>
            <div className="app">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/summary" element={<SummaryPage />} />
                        <Route path="/skills" element={<SkillsPage />} />
                        <Route path="/experience" element={<ExperiencePage />} />
                        <Route path="/education" element={<EducationPage />} />
                    </Routes>
                </div>
                <footer className="footer">
                    <p>© {new Date().getFullYear()} {resumeData.personalInfo.name}</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
