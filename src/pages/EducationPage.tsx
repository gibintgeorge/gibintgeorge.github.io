import { Header } from '../components/Header';
import { Education } from '../components/Education';
import { BackButton } from '../components/BackButton';
import resumeData from '../data/resume-data.json';

export function EducationPage() {
    return (
        <>
            <BackButton />
            <Header personalInfo={resumeData.personalInfo} />
            <Education education={resumeData.education} />
        </>
    );
}
