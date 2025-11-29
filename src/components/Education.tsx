import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiMapPin } from 'react-icons/fi';
import './Education.css';

interface EducationItem {
    degree: string;
    institution: string;
    location: string;
    year: string;
}

interface EducationProps {
    education: EducationItem[];
}

export const Education = ({ education }: EducationProps) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <section ref={ref} className="education-section">
            <h2 className="section-title">Education</h2>
            <motion.div
                className="education-grid"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        className="education-card"
                        variants={itemVariants}
                        whileHover={{ y: -5, boxShadow: "0 12px 30px var(--shadow-color)" }}
                    >
                        <div className="education-icon">
                            <FiAward />
                        </div>
                        <h3 className="education-degree">{edu.degree}</h3>
                        <p className="education-institution">{edu.institution}</p>
                        <div className="education-details">
                            <span className="education-location">
                                <FiMapPin className="detail-icon" />
                                {edu.location}
                            </span>
                            <span className="education-year">{edu.year}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};
