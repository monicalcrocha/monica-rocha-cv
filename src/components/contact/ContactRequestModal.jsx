import React, { useState } from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { motion } from 'framer-motion';
import { useModal } from '@/hooks/useModal';
import Turnstile, { turnstileEnabled } from '@/components/Turnstile';
import { postForm } from '@/api/postForm';
import { X, Send, CheckCircle } from 'lucide-react';

export default function ContactRequestModal({ onClose }) {
  const { t, language } = useLanguage();
  const dialogRef = useModal(true, onClose);
  const [token, setToken] = useState('');
  const [captchaKey, setCaptchaKey] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', reason: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t.contactRequest.errorName;
    if (!form.email.trim()) e.email = t.contactRequest.errorEmail;
    if (!form.company.trim()) e.company = t.contactRequest.errorCompany;
    if (turnstileEnabled && !token) e.submit = t.ui.captcha;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await postForm('/api/contact', {
        name: form.name, email: form.email, company: form.company,
        phone: form.phone, reason: form.reason, token
      });
      setSuccess(true);
    } catch {
      setErrors({ submit: t.contactRequest.errorSending });
      setToken('');
      setCaptchaKey(k => k + 1);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    fontFamily: 'Hanken Grotesk, sans-serif',
    fontSize: '0.875rem',
    padding: '0.625rem 1rem',
    borderRadius: '0.625rem',
    outline: 'none',
    backgroundColor: '#F7F4ED',
    border: '1px solid #E4DCCD',
    color: '#28241F',
    transition: 'border-color 0.15s'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(40,36,31,0.55)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-request-title"
        className="max-w-md w-full rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD', boxShadow: '0 20px 50px rgba(40,36,31,0.15)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="contact-request-title" className="font-spectral text-xl font-medium" style={{ color: '#28241F' }}>{t.contactRequest.title}</h2>
          <button type="button" onClick={onClose} aria-label={t.ui.close} className="p-1.5 rounded-lg" style={{ color: '#6F6656' }}>
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8" role="status">
            <CheckCircle className="w-10 h-10 mx-auto mb-3" style={{ color: '#A84E2A' }} />
            <p className="font-hanken text-sm" style={{ color: '#5C544A' }}>{t.contactRequest.successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <p className="font-hanken text-sm" style={{ color: '#6F6656' }}>{t.contactRequest.description}</p>
            {[
              { label: t.contactRequest.nameLabel, field: 'name', placeholder: t.contactRequest.namePlaceholder, required: true },
              { label: t.contactRequest.emailLabel, field: 'email', placeholder: t.contactRequest.emailPlaceholder, required: true },
              { label: t.contactRequest.companyLabel, field: 'company', placeholder: t.contactRequest.companyPlaceholder, required: true },
              { label: t.contactRequest.phoneLabel, field: 'phone', placeholder: t.contactRequest.phonePlaceholder },
            ].map(({ label, field, placeholder, required }) => (
              <div key={field}>
                <label htmlFor={`cr-${field}`} className="font-jetbrains text-xs uppercase tracking-widest block mb-1.5" style={{ color: '#6F6656' }}>
                  {label}{required && <span style={{ color: '#A84E2A' }}> *</span>}
                </label>
                <input
                  id={`cr-${field}`}
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  autoComplete={{ name: 'name', email: 'email', company: 'organization', phone: 'tel' }[field]}
                  aria-invalid={!!errors[field]}
                  aria-describedby={errors[field] ? `cr-${field}-error` : undefined}
                  value={form[field]}
                  onChange={e => update(field, e.target.value)}
                  placeholder={placeholder}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#A84E2A'}
                  onBlur={e => e.target.style.borderColor = '#E4DCCD'}
                />
                {errors[field] && <p id={`cr-${field}-error`} role="alert" className="font-hanken text-xs mt-1" style={{ color: '#A84E2A' }}>{errors[field]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="cr-reason" className="font-jetbrains text-xs uppercase tracking-widest block mb-1.5" style={{ color: '#6F6656' }}>
                {t.contactRequest.reasonLabel}
              </label>
              <textarea
                id="cr-reason"
                maxLength={5000}
                value={form.reason}
                onChange={e => update('reason', e.target.value)}
                placeholder={t.contactRequest.reasonPlaceholder}
                rows={3}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => e.target.style.borderColor = '#A84E2A'}
                onBlur={e => e.target.style.borderColor = '#E4DCCD'}
              />
            </div>
            <Turnstile key={captchaKey} onToken={setToken} language={language} />
            {errors.submit && (
              <p role="alert" className="font-hanken text-sm" style={{ color: '#A84E2A' }}>{errors.submit}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-hanken text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all"
              style={{ backgroundColor: '#A84E2A', color: '#fff', opacity: loading ? 0.7 : 1 }}
            >
              <Send className="w-4 h-4" />
              {loading ? t.contactRequest.sending : t.contactRequest.submitButton}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}