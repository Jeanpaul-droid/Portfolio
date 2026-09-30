import { motion } from 'framer-motion';
import Contact from '../components/Contact';

/** /contact — details and WhatsApp form. */
export default function ContactPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Contact />
    </motion.main>
  );
}
