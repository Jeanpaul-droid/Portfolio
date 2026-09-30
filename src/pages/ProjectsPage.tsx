import { motion } from 'framer-motion';
import Projects from '../components/Projects';

/** /projects — full catalogue with filters and details modal. */
export default function ProjectsPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Projects />
    </motion.main>
  );
}
