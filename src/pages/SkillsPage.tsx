import { Header } from '../components/Header';
import { Skills } from '../components/Skills';
import { BackButton } from '../components/BackButton';
import resumeData from '../data/resume-data.json';

export function SkillsPage() {
    return (
        <>
            <BackButton />
            <Header personalInfo={resumeData.personalInfo} />
            <Skills skills={resumeData.skills} />
        </>
    );
}
