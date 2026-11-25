// Turnstile: real site key in production; Cloudflare's always-pass test key on localhost.
const isLocal = typeof location !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
export const TURNSTILE_SITE_KEY = isLocal ? '1x00000000000000000000AA' : '0x4AAAAAAGF1t2DUdTWWMT2-';
export const CV_PDF = '/files/CV-MonicaRocha.pdf';
