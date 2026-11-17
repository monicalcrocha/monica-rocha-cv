import React, { useState } from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { motion } from 'framer-motion';
import SectionEyebrow from '@/components/cv/SectionEyebrow';
import { base44 } from '@/api/base44Client';
import { Send, CheckCircle } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay }
});

export default function Feedback() {
  const { t } = useLanguage();
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) { setError(t.feedback.feedbackRequired); return; }
    setError('');
    setLoading(true);
    await base44.integrations.Core.SendEmail({
      to: 'monica.lc.rocha@gmail.com',
      subject: 'Feedback CV Interativo',
      body: `Feedback:\n${feedback}\n\nEmail: ${email || 'Anónimo'}`
    });
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="space-y-12">
      <motion.div {...fadeUp(0)}>
        <h1 className="font-spectral text-4xl font-medium mb-2" style={{ color: '#28241F' }}>{t.feedback.title}</h1>
        <SectionEyebrow label="A sua opinião" />
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="max-w-xl">
        <p className="font-hanken text-sm leading-relaxed mb-2" style={{ color: '#5C544A' }}>{t.feedback.intro}</p>
        <p className="font-hanken text-xs italic" style={{ color: '#8C8270' }}>{t.feedback.anonymousNote}</p>
      </motion.div>

      {success ? (
        <motion.div {...fadeUp(0)} className="rounded-xl p-8 text-center" style={{ backgroundColor: '#F1ECE0', border: '1px solid #E4DCCD' }}>
          <CheckCircle className="w-10 h-10 mx-auto mb-3" style={{ color: '#C15F36' }} />
          <p className="font-spectral text-xl" style={{ color: '#28241F' }}>{t.feedback.successMessage}</p>
        </motion.div>
      ) : (
        <motion.form {...fadeUp(0.15)} onSubmit={handleSubmit} className="space-y-5 max-w-xl">
          <div>
            <label className="font-jetbrains text-xs uppercase tracking-widest block mb-2" style={{ color: '#8C8270' }}>
              {t.feedback.feedbackLabel}
            </label>
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder={t.feedback.feedbackPlaceholder}
              rows={5}
              className="w-full font-hanken text-sm px-4 py-3 rounded-xl resize-none outline-none transition-all"
              style={{
                backgroundColor: '#fff',
                border: '1px solid #E4DCCD',
                color: '#28241F'
              }}
              onFocus={e => e.target.style.borderColor = '#C15F36'}
              onBlur={e => e.target.style.borderColor = '#E4DCCD'}
            />
            {error && <p className="font-hanken text-xs mt-1" style={{ color: '#C15F36' }}>{error}</p>}
          </div>

          <div>
            <label className="font-jetbrains text-xs uppercase tracking-widest block mb-2" style={{ color: '#8C8270' }}>
              {t.feedback.emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
        </motion.form>
      )}
    </div>
  );
}