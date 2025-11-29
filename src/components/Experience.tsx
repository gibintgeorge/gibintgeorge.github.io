import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp, FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi';
import './Experience.css';

interface ExperienceItem {
    role: string;
    company: string;
    location: string;
    period: string;
    highlights: string[];
}

interface ExperienceProps {
    experience: ExperienceItem[];
    defaultExpanded?: boolean;
    linkTo?: string;
}

export const Experience = ({ experience, defaultExpanded = false, linkTo }: ExperienceProps) => {
    // When defaultExpanded is true, expand all items (set to -1 to indicate all expanded)
    // When false, expand only the first item (index 0)
    const [expandedIndex, setExpandedIndex] = useState<number | null>(defaultExpanded ? -1 : 0);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const toggleExpand = (index: number) => {
        // Only allow toggling if not in defaultExpanded mode (i.e., on home page)
        if (!defaultExpanded) {
            setExpandedIndex(expandedIndex === index ? null : index);
        }
    };

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
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section ref={ref} className="experience-section">
            {linkTo ? (
                <Link to={linkTo} className="section-title-link">
                    <h2 className="section-title">Professional Experience</h2>
                </Link>
            ) : (
                <h2 className="section-title">Professional Experience</h2>
            )}
            <motion.div
                className="experience-timeline"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                {experience.map((exp, index) => (
                    <motion.div
                        key={index}
                        className="experience-item"
                        variants={itemVariants}
                    >
                        <div className="timeline-dot"></div>
                        <div className="experience-card">
                            <div
                                className={`experience-header ${defaultExpanded ? 'non-clickable' : ''}`}
                                onClick={() => toggleExpand(index)}
                            >
                                <div className="experience-title-section">
                                    <h3 className="experience-role">
                                        <FiBriefcase className="role-icon" />
                                        {exp.role}
                                    </h3>
                                    <p className="experience-company">{exp.company}</p>
                                    <div className="experience-meta">
                                        <span className="meta-item">
                                            <FiMapPin className="meta-icon" />
                                            {exp.location}
                                        </span>
                                        <span className="meta-item">
                                            <FiCalendar className="meta-icon" />
                                            {exp.period}
                                        </span>
                                    </div>
                                </div>
                                {!defaultExpanded && (
                                    <motion.button
                                        className="expand-button"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={expandedIndex === index ? "Collapse" : "Expand"}
                                    >
                                        {expandedIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                                    </motion.button>
                                )}
                            </div>
                            <AnimatePresence>
                                {(expandedIndex === index || expandedIndex === -1) && (
                                    <motion.div
                                        className="experience-highlights"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ul>
                                            {exp.highlights.map((highlight, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                >
                                                    {highlight}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};
