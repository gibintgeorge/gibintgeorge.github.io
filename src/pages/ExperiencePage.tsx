import { Header } from '../components/Header';
import { Experience } from '../components/Experience';
import resumeData from '../data/resume-data.json';

export function ExperiencePage() {
    return (
        <>
            <Header personalInfo={resumeData.personalInfo} />
            <Experience experience={resumeData.experience} defaultExpanded={true} />
        </>
    );
}
