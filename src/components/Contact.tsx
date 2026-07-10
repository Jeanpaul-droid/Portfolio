import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideLeft, slideRight, fadeUpVariants, inViewProps } from '../utils/animations';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const contactInfo = [
  {
    icon: <Phone size={18} />,
    label: 'Téléphone (Appel direct)',
    value: '+229 0156100070',
    href: 'tel:+2290156100070',
    mono: true,
  },
  {
    icon: <Mail size={18} />,
    label: 'Email professionnel',
    value: 'jeanpaul.desouza@outlook.com',
    href: 'mailto:jeanpaul.desouza@outlook.com',
    mono: true,
  },
  {
    icon: <MapPin size={18} />,
    label: 'Localisation',
    value: 'Cotonou, Bénin',
    href: null,
    mono: false,
  },
];

const inputBase =
  'w-full px-4 py-4 rounded-2xl bg-[var(--bg-app)] border text-base text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-all duration-200 font-body font-light';

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;
    if (!form.name.trim()) { tempErrors.name = 'Veuillez saisir votre nom.'; isValid = false; }
    if (!form.email.trim()) { tempErrors.email = 'Veuillez saisir votre adresse email.'; isValid = false; }
    else if (!/\S+@\S+\.\S+/.test(form.email)) { tempErrors.email = 'L\'adresse email saisie est invalide.'; isValid = false; }
    if (!form.subject.trim()) { tempErrors.subject = 'Veuillez saisir le sujet du message.'; isValid = false; }
    if (!form.message.trim()) { tempErrors.message = 'Le message ne peut pas être vide.'; isValid = false; }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setStatusMessage('');
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setStatus('success');
        setStatusMessage(result.message || 'Votre message a été enregistré avec succès !');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.error || 'Une erreur est survenue lors de l\'enregistrement.');
      }
    } catch (err: unknown) {
      setStatus('error');
      const errorMessage = err instanceof Error ? err.message : 'Impossible d\'envoyer le message. Veuillez réessayer.';
      setStatusMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="container max-w-4xl mx-auto">

        {/* Section Title */}
        <motion.div
          {...inViewProps}
          variants={fadeUpVariants}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center">
            Me <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Contacter</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4" />
          <p className="text-center text-[var(--text-muted)] max-w-lg font-light font-body">
            Vous avez un projet ou une opportunité de développement ? Laissez-moi un message.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Contact Details */}
          <motion.div
            {...inViewProps}
            variants={slideLeft}
            className="md:col-span-5"
          >
            <div className="p-8 rounded-2xl glass-effect border border-[var(--border-color)] flex flex-col gap-7">
              <h3 className="text-xl font-bold font-heading text-[var(--text-primary)]">Mes coordonnées</h3>

              {contactInfo.map((info, idx) => {
                const content = (
                  <motion.div
                    key={idx}
                    whileHover={info.href ? { x: 4 } : {}}
                    className={`flex items-start gap-5 group ${info.href ? 'cursor-pointer' : ''}`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-[var(--electric)] group-hover:bg-[var(--electric)] group-hover:text-white transition-all duration-300 shadow-sm">
                      {info.icon}
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-xs text-[var(--text-muted)] font-medium font-body uppercase tracking-wide">{info.label}</span>
                      <span className={`text-sm font-semibold text-[var(--text-primary)] break-all leading-snug ${info.mono ? 'font-mono' : 'font-body'}`}>
                        {info.value}
                      </span>
                    </div>
                  </motion.div>
                );

                return info.href ? (
                  <a key={idx} href={info.href}>{content}</a>
                ) : (
                  <div key={idx}>{content}</div>
                );
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            {...inViewProps}
            variants={slideRight}
            className="md:col-span-7"
          >
            <form onSubmit={handleSubmit} noValidate className="p-8 rounded-2xl glass-effect border border-[var(--border-color)] text-left flex flex-col gap-6">

              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl flex items-start gap-3 border text-sm font-body font-medium ${status === 'success'
                      ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}
                >
                  {status === 'success' ? <CheckCircle size={20} className="shrink-0" /> : <AlertCircle size={20} className="shrink-0" />}
                  <span>{statusMessage}</span>
                </motion.div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[var(--text-secondary)] font-body">Votre Nom</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Jean Dupont"
                  className={`${inputBase} focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-[var(--border-color)]'}`} />
                {errors.name && <span className="text-xs text-red-400 font-medium font-body">{errors.name}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[var(--text-secondary)] font-body">Votre Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="nom@exemple.com"
                  className={`${inputBase} focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-[var(--border-color)]'}`} />
                {errors.email && <span className="text-xs text-red-400 font-medium font-body">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[var(--text-secondary)] font-body">Sujet</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Proposition de projet / Collaboration"
                  className={`${inputBase} focus:border-blue-500 ${errors.subject ? 'border-red-500' : 'border-[var(--border-color)]'}`} />
                {errors.subject && <span className="text-xs text-red-400 font-medium font-body">{errors.subject}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[var(--text-secondary)] font-body">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Dites-moi tout sur votre projet..." rows={5}
                  className={`${inputBase} resize-none focus:border-blue-500 ${errors.message ? 'border-red-500' : 'border-[var(--border-color)]'}`} />
                {errors.message && <span className="text-xs text-red-400 font-medium font-body">{errors.message}</span>}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full flex items-center justify-center gap-2.5 py-4 mt-1 rounded-2xl text-white font-body font-semibold text-base transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-xl hover:shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Envoyer le message <Send size={16} /></>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
