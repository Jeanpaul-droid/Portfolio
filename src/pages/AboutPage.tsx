import { motion } from 'framer-motion';
import About from '../components/About';
import Testimonials from '../components/Testimonials';

/** /about — full profile, journey and social proof. */
export default function AboutPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <About />
      <Testimonials />
    </motion.main>
  );
}
