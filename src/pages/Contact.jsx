import React, { useState } from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import PageTitle from '@/components/cv/PageTitle';
import SectionEyebrow from '@/components/cv/SectionEyebrow';
import { Mail, Linkedin, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import ContactRequestModal from '@/components/contact/ContactRequestModal';
import Turnstile, { turnstileEnabled } from '@/components/Turnstile';
import { postForm } from '@/api/postForm';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay }
});

export default function Contact() {
  const { t, language } = useLanguage();
  const [phoneModal, setPhoneModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [captchaKey, setCaptchaKey] = useState(0);

  const contacts = [
    { icon: Phone, label: t.contact.phone, value: t.contact.phoneRequest, sub: t.contact.phoneRequestSubtext, action: () => setPhoneModal(true) },
    { icon: Mail, label: t.contact.email, value: 'monica.lc.rocha@gmail.com', href: 'mailto:monica.lc.rocha@gmail.com' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Mónica Rocha', href: 'https://www.linkedin.com/in/m%C3%B3nica-rocha-baa19780/', external: true },
    { icon: MapPin, label: t.ui.location, value: t.ui.locationValue }
  ];

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) { setError(t.feedback.feedbackRequired); return; }
    if (turnstileEnabled && !token) { setError(t.ui.captcha); return; }
    setError('');
    setLoading(true);
    try {
      await postForm('/api/feedback', { feedback, email: feedbackEmail, token });
      setSuccess(true);
    } catch {
      setError(t.feedback.errorMessage);
      setToken('');
      setCaptchaKey(k => k + 1);
    } finally {
      setLoading(false);
    }
  };

  const cardInner = (Icon, label, value, sub, interactive) => (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F1ECE0' }}>
        <Icon className="w-4 h-4" style={{ color: '#A84E2A' }} aria-hidden="true" />
      </div>
      <span className="block">
        <span className="block font-spectral text-xs uppercase tracking-widest mb-1" style={{ color: '#6F6656' }}>{label}</span>
        <span className="block font-hanken text-sm font-medium" style={{ color: interactive ? '#A84E2A' : '#28241F' }}>{value}</span>
        {sub && <span className="block font-hanken text-xs mt-0.5" style={{ color: '#6F6656' }}>{sub}</span>}
      </span>
    </div>
  );
  const cardClass = 'block w-full text-left rounded-xl p-5 transition-all duration-200 hover:shadow-md';
  const cardStyle = { backgroundColor: '#fff', border: '1px solid #E4DCCD' };

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
          {contacts.map(({ icon, label, value, sub, href, action, external }, i) => {
            const anim = fadeUp(0.1 + i * 0.07);
            if (href) return (
              <motion.a key={i} {...anim} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={cardClass} style={cardStyle}>
                {cardInner(icon, label, value, sub, true)}
              </motion.a>
            );
            if (action) return (
              <motion.button key={i} {...anim} type="button" onClick={action} className={cardClass} style={cardStyle}>
                {cardInner(icon, label, value, sub, true)}
              </motion.button>
            );
            return (
              <motion.div key={i} {...anim} className={cardClass} style={cardStyle}>
                {cardInner(icon, label, value, sub, false)}
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Feedback section */}
      <motion.section {...fadeUp(0.25)}>
        <SectionEyebrow label={t.feedback.title} />
        <div className="max-w-xl">
          <p className="font-hanken text-sm leading-relaxed mb-1 whitespace-pre-line" style={{ color: '#5C544A' }}>{t.feedback.intro}</p>
          <p className="font-hanken text-xs italic mb-6" style={{ color: '#6F6656' }}>{t.feedback.anonymousNote}</p>

          {success ? (
            <div className="rounded-xl p-8 text-center" style={{ backgroundColor: '#F1ECE0', border: '1px solid #E4DCCD' }} role="status">
              <CheckCircle className="w-8 h-8 mx-auto mb-3" style={{ color: '#A84E2A' }} aria-hidden="true" />
              <p className="font-spectral text-lg" style={{ color: '#28241F' }}>{t.feedback.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="feedback-text" className="font-spectral text-xs uppercase tracking-widest block mb-1.5" style={{ color: '#6F6656' }}>
                  {t.feedback.feedbackLabel}
                </label>
                <textarea
                  id="feedback-text"
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder={t.feedback.feedbackPlaceholder}
                  rows={5}
                  maxLength={5000}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'feedback-error' : undefined}
                  className="w-full font-hanken text-sm px-4 py-3 rounded-xl resize-none outline-none transition-all"
                  style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD', color: '#28241F' }}
                  onFocus={e => e.target.style.borderColor = '#A84E2A'}
                  onBlur={e => e.target.style.borderColor = '#E4DCCD'}
                />
                {error && <p id="feedback-error" role="alert" className="font-hanken text-xs mt-1" style={{ color: '#A84E2A' }}>{error}</p>}
              </div>
              <div>
                <label htmlFor="feedback-email" className="font-spectral text-xs uppercase tracking-widest block mb-1.5" style={{ color: '#6F6656' }}>
                  {t.feedback.emailLabel}
                </label>
                <input
                  id="feedback-email"
                  type="email"
                  autoComplete="email"
                  value={feedbackEmail}
                  onChange={e => setFeedbackEmail(e.target.value)}
                  placeholder={t.feedback.emailHelper}
                  className="w-full font-hanken text-sm px-4 py-3 rounded-xl outline-none transition-all"
                  style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD', color: '#28241F' }}
                  onFocus={e => e.target.style.borderColor = '#A84E2A'}
                  onBlur={e => e.target.style.borderColor = '#E4DCCD'}
                />
              </div>
              <Turnstile key={captchaKey} onToken={setToken} language={language} />
              <button
                type="submit"
                disabled={loading}
                className="font-hanken text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all"
                style={{ backgroundColor: '#A84E2A', color: '#fff', opacity: loading ? 0.7 : 1 }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#8F4223'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#A84E2A'; }}
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                {loading ? t.ui.sending : t.feedback.submitButton}
              </button>
            </form>
          )}
        </div>
      </motion.section>

      <AnimatePresence>
        {phoneModal && <ContactRequestModal onClose={() => setPhoneModal(false)} />}
      </AnimatePresence>
    </div>
  );
}
