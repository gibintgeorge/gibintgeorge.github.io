import { Header } from '../components/Header';
import { Summary } from '../components/Summary';
import resumeData from '../data/resume-data.json';

export function SummaryPage() {
    return (
        <>
            <Header personalInfo={resumeData.personalInfo} />
            <Summary summary={resumeData.summary} />
        </>
    );
}
