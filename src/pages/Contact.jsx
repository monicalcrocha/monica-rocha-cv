import React, { useState } from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { motion } from 'framer-motion';
import PageTitle from '@/components/cv/PageTitle';
import SectionEyebrow from '@/components/cv/SectionEyebrow';
import { Mail, Linkedin, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import ContactRequestModal from '@/components/contact/ContactRequestModal';
import { postForm } from '@/api/postForm';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay }
});

export default function Contact() {
  const { t } = useLanguage();
  const [phoneModal, setPhoneModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const contacts = [
    { icon: Phone, label: t.contact.phone, value: t.contact.phoneRequest, sub: t.contact.phoneRequestSubtext, action: () => setPhoneModal(true) },
    { icon: Mail, label: t.contact.email, value: 'monica.lc.rocha@gmail.com', href: 'mailto:monica.lc.rocha@gmail.com' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Monica Rocha', href: 'https://www.linkedin.com/in/m%C3%B3nica-rocha-baa19780/' },
    { icon: MapPin, label: 'Localização', value: 'Lisboa, Portugal' }
  ];

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) { setError(t.feedback.feedbackRequired); return; }
    setError('');
    setLoading(true);
    try {
      await postForm('/api/feedback', { feedback, email: feedbackEmail });
      setSuccess(true);
    } catch (err) {
      setError('Erro ao enviar feedback. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-14">
      <motion.div {...fadeUp(0)}>
        <PageTitle title={t.contact.title} />
      </motion.div>

      {/* Contact cards */}
      <motion.section {...fadeUp(0.05)}>
        <SectionEyebrow label={t.eyebrows.contact} />
        <motion.p {...fadeUp(0.1)} className="font-spectral text-xl font-medium mb-6" style={{ color: '#5C544A' }}>
          {t.contact.cta}
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map(({ icon: Icon, label, value, sub, href, action }, i) => {
            const card = (
              <motion.div
                key={i}
                {...fadeUp(0.1 + i * 0.07)}
                className="rounded-xl p-5 transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD', cursor: (href || action) ? 'pointer' : 'default' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F1ECE0' }}>
                    <Icon className="w-4 h-4" style={{ color: '#C15F36' }} />
                  </div>
                  <div>
                    <p className="font-spectral text-xs uppercase tracking-widest mb-1" style={{ color: '#8C8270' }}>{label}</p>
                    <p className="font-hanken text-sm font-medium" style={{ color: (href || action) ? '#C15F36' : '#28241F' }}>{value}</p>
                    {sub && <p className="font-hanken text-xs mt-0.5" style={{ color: '#8C8270' }}>{sub}</p>}
                  </div>
                </div>
              </motion.div>
            );
            if (href) return <a key={i} href={href} target="_blank" rel="noopener noreferrer">{card}</a>;
            if (action) return <button key={i} onClick={action} className="text-left w-full">{card}</button>;
            return <div key={i}>{card}</div>;
          })}
        </div>
      </motion.section>

      {/* Feedback section */}
      <motion.section {...fadeUp(0.25)}>
        <SectionEyebrow label={t.feedback.title} />
        <div className="max-w-xl">
          <p className="font-hanken text-sm leading-relaxed mb-1" style={{ color: '#5C544A' }}>{t.feedback.intro}</p>
          <p className="font-hanken text-xs italic mb-6" style={{ color: '#8C8270' }}>{t.feedback.anonymousNote}</p>

          {success ? (
            <div className="rounded-xl p-8 text-center" style={{ backgroundColor: '#F1ECE0', border: '1px solid #E4DCCD' }}>
              <CheckCircle className="w-8 h-8 mx-auto mb-3" style={{ color: '#C15F36' }} />
              <p className="font-spectral text-lg" style={{ color: '#28241F' }}>{t.feedback.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="font-spectral text-xs uppercase tracking-widest block mb-1.5" style={{ color: '#8C8270' }}>
                  {t.feedback.feedbackLabel}
                </label>
                <textarea
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder={t.feedback.feedbackPlaceholder}
                  rows={5}
                  className="w-full font-hanken text-sm px-4 py-3 rounded-xl resize-none outline-none transition-all"
                  style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD', color: '#28241F' }}
                  onFocus={e => e.target.style.borderColor = '#C15F36'}
                  onBlur={e => e.target.style.borderColor = '#E4DCCD'}
                />
                {error && <p className="font-hanken text-xs mt-1" style={{ color: '#C15F36' }}>{error}</p>}
              </div>
              <div>
                <label className="font-spectral text-xs uppercase tracking-widest block mb-1.5" style={{ color: '#8C8270' }}>
                  {t.feedback.emailLabel}
                </label>
                <input
                  type="email"
                  value={feedbackEmail}
                  onChange={e => setFeedbackEmail(e.target.value)}
                  placeholder={t.feedback.emailHelper}
                  className="w-full font-hanken text-sm px-4 py-3 rounded-xl outline-none transition-all"
                  style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD', color: '#28241F' }}
                  onFocus={e => e.target.style.borderColor = '#C15F36'}
                  onBlur={e => e.target.style.borderColor = '#E4DCCD'}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="font-hanken text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all"
                style={{ backgroundColor: '#C15F36', color: '#fff', opacity: loading ? 0.7 : 1 }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#a84e2a'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#C15F36'; }}
              >
                <Send className="w-4 h-4" />
                {loading ? '...' : t.feedback.submitButton}
              </button>
            </form>
          )}
        </div>
      </motion.section>

      {phoneModal && <ContactRequestModal onClose={() => setPhoneModal(false)} />}
    </div>
  );
}