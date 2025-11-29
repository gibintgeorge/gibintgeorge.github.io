import { Header } from '../components/Header';
import { Summary } from '../components/Summary';
import { BackButton } from '../components/BackButton';
import resumeData from '../data/resume-data.json';

export function SummaryPage() {
    return (
        <>
            <BackButton />
            <Header personalInfo={resumeData.personalInfo} />
            <Summary summary={resumeData.summary} />
        </>
    );
}
