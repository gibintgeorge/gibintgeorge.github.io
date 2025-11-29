import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './Skills.css';

interface Skill {
    category: string;
    items: string[];
}

interface SkillsProps {
    skills: Skill[];
    linkTo?: string;
}

export const Skills = ({ skills, linkTo }: SkillsProps) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section ref={ref} className="skills-section">
            {linkTo ? (
                <Link to={linkTo} className="section-title-link">
                    <h2 className="section-title">Skills & Expertise</h2>
                </Link>
            ) : (
                <h2 className="section-title">Skills & Expertise</h2>
            )}
            <motion.div
                className="skills-grid"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        className="skill-category"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                    >
                        <h3 className="skill-category-title">{skill.category}</h3>
                        <div className="skill-tags">
                            {skill.items.map((item, idx) => (
                                <motion.span
                                    key={idx}
                                    className="skill-tag"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};
