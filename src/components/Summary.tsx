import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './Summary.css';

interface SummaryProps {
    summary: string;
    linkTo?: string;
}

export const Summary = ({ summary, linkTo }: SummaryProps) => {
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
            {linkTo ? (
                <Link to={linkTo} className="section-title-link">
                    <h2 className="section-title">About Me</h2>
                </Link>
            ) : (
                <h2 className="section-title">About Me</h2>
            )}
            <div className="summary-content">
                <p>{summary}</p>
            </div>
        </motion.section>
    );
};
