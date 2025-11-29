import { Header } from '../components/Header';
import { Education } from '../components/Education';
import resumeData from '../data/resume-data.json';

export function EducationPage() {
    return (
        <>
            <Header personalInfo={resumeData.personalInfo} />
            <Education education={resumeData.education} />
        </>
    );
}
