import { Header } from '../components/Header';
import { Experience } from '../components/Experience';
import { BackButton } from '../components/BackButton';
import resumeData from '../data/resume-data.json';

export function ExperiencePage() {
    return (
        <>
            <BackButton />
            <Header personalInfo={resumeData.personalInfo} />
            <Experience experience={resumeData.experience} defaultExpanded={true} />
        </>
    );
}
