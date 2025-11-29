import { Header } from '../components/Header';
import { Skills } from '../components/Skills';
import resumeData from '../data/resume-data.json';

export function SkillsPage() {
    return (
        <>
            <Header personalInfo={resumeData.personalInfo} />
            <Skills skills={resumeData.skills} />
        </>
    );
}
