import { Header } from '../components/Header';
import { Summary } from '../components/Summary';
import { Skills } from '../components/Skills';
import { Experience } from '../components/Experience';
import { Education } from '../components/Education';
import resumeData from '../data/resume-data.json';

export function HomePage() {
    return (
        <>
            <Header personalInfo={resumeData.personalInfo} />
            <Summary summary={resumeData.summary} linkTo="/summary" />
            <Skills skills={resumeData.skills} linkTo="/skills" />
            <Experience experience={resumeData.experience} linkTo="/experience" />
            <Education education={resumeData.education} linkTo="/education" />
        </>
    );
}
