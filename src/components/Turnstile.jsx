import { useEffect, useRef } from 'react';
import { TURNSTILE_SITE_KEY } from '@/config';

export const turnstileEnabled = Boolean(TURNSTILE_SITE_KEY);

let loader;
function loadScript() {
  if (window.turnstile) return Promise.resolve();
  if (!loader) {
    loader = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return loader;
}

// Cloudflare Turnstile anti-spam check. Remount (change `key`) to get a fresh token after a failed submit.
export default function Turnstile({ onToken, language }) {
  const ref = useRef(null);
  const widgetId = useRef(null);
  const cb = useRef(onToken);
  cb.current = onToken;

  useEffect(() => {
    if (!turnstileEnabled) return;
    let cancelled = false;
    loadScript().then(() => {
      if (cancelled || !ref.current) return;
      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: TURNSTILE_SITE_KEY,
        language: language === 'pt' ? 'pt-br' : 'en',
        theme: 'light',
        callback: (token) => cb.current(token),
        'expired-callback': () => cb.current(''),
        'error-callback': () => cb.current(''),
      });
    }).catch(() => {});
    return () => {
      cancelled = true;
      if (widgetId.current != null && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [language]);

  if (!turnstileEnabled) return null;
  return <div ref={ref} style={{ minHeight: 65 }} />;
}
