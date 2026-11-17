// Cloudflare Worker: serves the built site (static assets) and handles the two forms.
// Emails are sent through Cloudflare Email Routing (send_email binding) to the owner's inbox.
import { EmailMessage } from 'cloudflare:email';

const FROM = 'cv@mrocha.io';

function b64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function buildMime({ from, to, subject, text, replyTo }) {
  const headers = [
    `From: CV Mónica Rocha <${from}>`.replace('ó', 'o'),
    `To: ${to}`,
    `Subject: =?UTF-8?B?${b64(subject)}?=`,
    `Message-ID: <${crypto.randomUUID()}@mrocha.io>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ];
  if (replyTo) headers.push(`Reply-To: ${replyTo}`);
  const body = b64(text).replace(/.{76}/g, '$&\r\n');
  return headers.join('\r\n') + '\r\n\r\n' + body;
}

const clean = (v, max = 5000) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max);
const isEmail = (v) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(v);

async function send(env, subject, text, replyTo) {
  const raw = buildMime({ from: FROM, to: env.TO_EMAIL, subject, text, replyTo });
  await env.MAILER.send(new EmailMessage(FROM, env.TO_EMAIL, raw));
}

const json = (data, status = 200) => Response.json(data, { status });

const ALLOWED_ORIGINS = ['https://monica-rocha-cv.mrocha.io'];

// Cloudflare Turnstile check. Skipped only while TURNSTILE_SECRET is not configured.
async function verifyTurnstile(token, req, env) {
  if (!env.TURNSTILE_SECRET) return true;
  if (!token) return false;
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET);
  body.append('response', String(token));
  const ip = req.headers.get('CF-Connecting-IP');
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const out = await res.json().catch(() => ({}));
  return out.success === true;
}

async function handleContact(req, env) {
  const d = await req.json().catch(() => ({}));
  if (!(await verifyTurnstile(d.token, req, env))) return json({ error: 'Verification failed' }, 403);
  const name = clean(d.name, 200), email = clean(d.email, 200), company = clean(d.company, 200);
  const phone = clean(d.phone, 50), reason = clean(d.reason);
  if (!name || !email || !company) return json({ error: 'Missing required fields' }, 400);
  if (!isEmail(email)) return json({ error: 'Invalid email' }, 400);
  await send(env, 'Pedido de contacto — CV Interativo',
    `Nome: ${name}\nEmail: ${email}\nEmpresa: ${company}\nTelefone: ${phone || 'N/A'}\nMotivo: ${reason || 'N/A'}`,
    email);
  return json({ success: true });
}

async function handleFeedback(req, env) {
  const d = await req.json().catch(() => ({}));
  if (!(await verifyTurnstile(d.token, req, env))) return json({ error: 'Verification failed' }, 403);
  const feedback = clean(d.feedback), email = clean(d.email, 200);
  if (!feedback) return json({ error: 'Feedback is required' }, 400);
  await send(env, 'Feedback CV Interativo',
    `Feedback:\n${feedback}\n\nEmail: ${email || 'Anónimo'}`,
    isEmail(email) ? email : undefined);
  return json({ success: true });
}

export default {
  async fetch(req, env) {
    const { pathname } = new URL(req.url);
    if (pathname.startsWith('/api/')) {
      if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
      const origin = req.headers.get('Origin');
      const sameOrigin = origin === new URL(req.url).origin;
      if (!origin || !(sameOrigin || ALLOWED_ORIGINS.includes(origin))) return json({ error: 'Forbidden' }, 403);
      if (Number(req.headers.get('Content-Length') || 0) > 20000) return json({ error: 'Too large' }, 413);
      try {
        if (pathname === '/api/contact') return await handleContact(req, env);
        if (pathname === '/api/feedback') return await handleFeedback(req, env);
        return json({ error: 'Not found' }, 404);
      } catch (err) {
        console.error(err);
        return json({ error: 'Failed to send' }, 500);
      }
    }
    return env.ASSETS.fetch(req);
  },
};
