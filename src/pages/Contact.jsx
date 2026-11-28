import { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { postForm } from '@/lib/postForm';
import Turnstile, { turnstileEnabled } from '@/components/Turnstile';
import { Card, PageHeading } from '@/components/ui';

const inputCls = 'w-full text-sm px-3 py-2 rounded-lg border border-line bg-white text-ink placeholder:text-faint focus:outline-none focus:border-accent';
const labelCls = 'block text-[11px] uppercase tracking-wider text-faint font-medium mb-1';
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function CaptchaFailed() {
  const { t } = useLanguage();
  return <p role="alert" className="text-sm text-accent">{t.crm.captchaFailed}</p>;
}

function Success({ children }) {
  return (
    <div role="status" className="rounded-lg bg-okSoft text-ok p-5 text-sm flex items-start gap-2">
      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />{children}
    </div>
  );
}

function ContactRequest() {
  const { t, language } = useLanguage();
  const c = t.contactRequest;
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', reason: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [token, setToken] = useState('');
  const [key, setKey] = useState(0);
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const set = (f, v) => setForm(s => ({ ...s, [f]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = c.errorName;
    if (!form.email.trim()) err.email = c.errorEmail;
    else if (!isEmail(form.email)) err.email = t.crm.emailInvalid;
    if (!form.company.trim()) err.company = c.errorCompany;
    if (turnstileEnabled && !token) err.submit = t.ui.captcha;
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    try {
      await postForm('/api/contact', { ...form, token });
      setDone(true);
    } catch {
      setErrors({ submit: c.errorSending });
      setToken(''); setKey(k => k + 1);
    } finally { setLoading(false); }
  };

  if (done) return <Success>{c.successMessage}</Success>;
  const fields = [
    { f: 'name', label: c.nameLabel, ph: c.namePlaceholder, req: true, ac: 'name' },
    { f: 'email', label: c.emailLabel, ph: c.emailPlaceholder, req: true, ac: 'email', type: 'email' },
    { f: 'company', label: c.companyLabel, ph: c.companyPlaceholder, req: true, ac: 'organization' },
    { f: 'phone', label: c.phoneLabel, ph: c.phonePlaceholder, ac: 'tel', type: 'tel' },
  ];
  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      <p className="text-sm text-muted">{c.description}</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {fields.map(({ f, label, ph, req, ac, type }) => (
          <div key={f}>
            <label htmlFor={`cr-${f}`} className={labelCls}>{label}{req && <span className="text-accent"> *</span>}</label>
            <input id={`cr-${f}`} type={type || 'text'} autoComplete={ac} value={form[f]} onChange={e => set(f, e.target.value)}
              placeholder={ph} aria-invalid={!!errors[f]} aria-describedby={errors[f] ? `cr-${f}-e` : undefined} className={inputCls} />
            {errors[f] && <p id={`cr-${f}-e`} role="alert" className="text-xs text-accent mt-1">{errors[f]}</p>}
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="cr-reason" className={labelCls}>{c.reasonLabel}</label>
        <textarea id="cr-reason" rows={3} maxLength={5000} value={form.reason} onChange={e => set('reason', e.target.value)} placeholder={c.reasonPlaceholder} className={`${inputCls} resize-none`} />
      </div>
      <Turnstile key={key} onToken={setToken} language={language} onError={() => setCaptchaFailed(true)} />
      {captchaFailed && <CaptchaFailed />}
      {errors.submit && <p role="alert" className="text-sm text-accent">{errors.submit}</p>}
      <button type="submit" disabled={loading} className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-accent text-white hover:bg-accentHover disabled:opacity-70">
        <Send className="w-4 h-4" aria-hidden="true" />{loading ? t.ui.sending : c.submitButton}
      </button>
    </form>
  );
}

function Feedback() {
  const { t, language } = useLanguage();
  const c = t.feedback;
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [token, setToken] = useState('');
  const [key, setKey] = useState(0);
  const [captchaFailed, setCaptchaFailed] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const textErr = !text.trim() ? c.feedbackRequired : '';
    const mailErr = email.trim() && !isEmail(email) ? t.crm.emailInvalid : '';
    setError(textErr); setEmailError(mailErr); setFormError('');
    if (textErr || mailErr) return;
    if (turnstileEnabled && !token) { setFormError(t.ui.captcha); return; }
    setLoading(true);
    try {
      await postForm('/api/feedback', { feedback: text, email, token });
      setDone(true);
    } catch {
      setFormError(c.errorMessage); setToken(''); setKey(k => k + 1);
    } finally { setLoading(false); }
  };

  if (done) return <Success>{c.successMessage}</Success>;
  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      <p className="text-sm text-muted whitespace-pre-line">{c.intro}</p>
      <p className="text-xs text-faint italic">{c.anonymousNote}</p>
      <div>
        <label htmlFor="fb-text" className={labelCls}>{c.feedbackLabel}</label>
        <textarea id="fb-text" rows={4} maxLength={5000} value={text} onChange={e => setText(e.target.value)} placeholder={c.feedbackPlaceholder}
          aria-invalid={!!error} aria-describedby={error ? 'fb-e' : undefined} className={`${inputCls} resize-none`} />
        {error && <p id="fb-e" role="alert" className="text-xs text-accent mt-1">{error}</p>}
      </div>
      <div>
        <label htmlFor="fb-email" className={labelCls}>{c.emailLabel}</label>
        <input id="fb-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={c.emailHelper}
          aria-invalid={!!emailError} aria-describedby={emailError ? 'fb-email-e' : undefined} className={inputCls} />
        {emailError && <p id="fb-email-e" role="alert" className="text-xs text-accent mt-1">{emailError}</p>}
      </div>
      <Turnstile key={key} onToken={setToken} language={language} onError={() => setCaptchaFailed(true)} />
      {captchaFailed && <CaptchaFailed />}
      {formError && <p role="alert" className="text-sm text-accent">{formError}</p>}
      <button type="submit" disabled={loading} className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-line text-ink hover:bg-side disabled:opacity-70">
        <Send className="w-4 h-4" aria-hidden="true" />{loading ? t.ui.sending : c.submitButton}
      </button>
    </form>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const cards = [
    { icon: Mail, label: t.contact.email, value: 'monica.lc.rocha@gmail.com', href: 'mailto:monica.lc.rocha@gmail.com' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Mónica Rocha', href: 'https://www.linkedin.com/in/m%C3%B3nica-rocha-baa19780/', external: true },
    { icon: Github, label: 'GitHub', value: 'monicalcrocha', href: 'https://github.com/monicalcrocha', external: true },
    { icon: MapPin, label: t.ui.location, value: t.ui.locationValue },
  ];
  return (
    <div className="space-y-5">
      <PageHeading>{t.crm.contact.title}</PageHeading>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map(({ icon: Icon, label, value, href, external }) => {
          const inner = (<>
            <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
            <span className="block text-[11px] uppercase tracking-wider text-faint font-medium mt-2">{label}</span>
            <span className={`block text-sm font-medium break-all ${href ? 'text-accent' : 'text-ink'}`}>{value}</span>
          </>);
          return href
            ? <a key={label} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="bg-white border border-line rounded-xl p-4 hover:border-accent">{inner}</a>
            : <div key={label} className="bg-white border border-line rounded-xl p-4">{inner}</div>;
        })}
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <Card title={t.crm.contact.requestPhone}><ContactRequest /></Card>
        <Card title={t.crm.contact.feedback}><Feedback /></Card>
      </div>
    </div>
  );
}
