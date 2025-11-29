import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Summary.css';

interface SummaryProps {
    summary: string;
}

export const Summary = ({ summary }: SummaryProps) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <motion.section
            ref={ref}
            className="summary-section"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="section-title">About Me</h2>
            <div className="summary-content">
                <p>{summary}</p>
            </div>
        </motion.section>
    );
};
