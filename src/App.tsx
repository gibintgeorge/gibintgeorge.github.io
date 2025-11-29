import { useTheme } from './hooks/useTheme';
import { ThemeToggle } from './components/ThemeToggle';
import { Header } from './components/Header';
import { Summary } from './components/Summary';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import resumeData from './data/resume-data.json';
import './App.css';

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="app">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <div className="container">
                <Header personalInfo={resumeData.personalInfo} />
                <Summary summary={resumeData.summary} />
                <Skills skills={resumeData.skills} />
                <Experience experience={resumeData.experience} />
                <Education education={resumeData.education} />
            </div>
            <footer className="footer">
                <p>© {new Date().getFullYear()} {resumeData.personalInfo.name}. Built with React & TypeScript.</p>
            </footer>
        </div>
    );
}

export default App;
