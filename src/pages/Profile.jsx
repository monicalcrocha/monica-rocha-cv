import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, Mail } from 'lucide-react';
import SectionEyebrow from '@/components/cv/SectionEyebrow';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay }
});

const wordSizes = [
  { w: 0, size: 'text-2xl font-semibold', color: '#A84E2A' },
  { w: 1, size: 'text-xl font-medium', color: '#28241F' },
  { w: 2, size: 'text-base font-normal', color: '#5C544A' },
  { w: 3, size: 'text-sm font-normal', color: '#6F6656' },
];

function weightToStyle(weight) {
  const map = { 3: 0, 2: 1, 1: 2, 0: 3 };
  return wordSizes[map[weight] ?? 3];
}

function AnimatedCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!isInView) return;
    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 10) clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <span ref={ref} className="font-jetbrains font-bold" style={{ color: '#A84E2A', fontSize: '1.25rem' }}>
      +{count}
    </span>
  );
}

export default function Profile() {
  const { t } = useLanguage();

  return (
    <div className="space-y-16">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col-reverse md:flex-row items-start gap-10 md:gap-14 pt-4"
      >
        {/* Left: text */}
        <div className="flex-1 min-w-0">
          <p className="font-spectral text-base font-medium mb-3" style={{ color: '#A84E2A' }}>
            Business Development Manager
          </p>
          <h1 className="font-spectral font-medium leading-[1.1] mb-4" style={{ fontSize: 'clamp(2.6rem, 6vw, 4.2rem)', color: '#28241F' }}>
            Mónica<br />Rocha<span style={{ color: '#A84E2A' }}>.</span>
          </h1>
          <p className="font-hanken text-base mb-6" style={{ color: '#5C544A' }}>
            {t.ui.tagline}
          </p>
          <div className="flex flex-col gap-2 text-sm font-jetbrains" style={{ color: '#6F6656' }}>
            <span className="flex items-baseline gap-1">
              <AnimatedCounter />
              <span className="font-jetbrains text-sm" style={{ color: '#6F6656' }}>{' '}{t.ui.yearsExperience}</span>
            </span>
            <span>B2C · B2B · {t.ui.international}</span>
          </div>
          <div className="flex flex-wrap gap-3 mt-7">
            <a
              href="/files/CV-MonicaRocha.pdf"
              download="Monica_Rocha_CV.pdf"
              className="inline-flex items-center gap-2 font-hanken text-sm px-5 py-2.5 rounded-lg transition-colors"
              style={{ backgroundColor: '#A84E2A', color: '#fff' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#8F4223'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#A84E2A'}
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              {t.ui.ctaDownload} <span className="opacity-80">{t.ui.downloadLang}</span>
            </a>
            <Link
              to="/Contact"
              className="inline-flex items-center gap-2 font-hanken text-sm px-5 py-2.5 rounded-lg transition-colors"
              style={{ border: '1px solid #A84E2A', color: '#A84E2A' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F1ECE0'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {t.ui.ctaContact}
            </Link>
          </div>
        </div>

        {/* Right: photo */}
        <div className="flex-shrink-0 w-full max-w-[340px] md:w-[340px] mx-auto md:mx-0">
          <div className="w-full max-w-[340px] aspect-[4/5]" style={{
            borderRadius: 18,
            overflow: 'hidden',
            border: '4px solid #E7DAC1',
            boxShadow: '0 12px 36px rgba(168,78,42,0.12)'
          }}>
            <img
              src="/files/IMG_8312.jpg"
              alt="Mónica Rocha"
              width="340"
              height="425"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
        </div>
      </motion.section>

      {/* BIO */}
      <motion.section {...fadeUp(0.1)}>
        <SectionEyebrow label={t.ui.eyebrowProfile} />
        <div className="space-y-4 max-w-2xl">
          {t.profile.introduction.map((p, i) => (
            <p key={i} className="font-hanken text-base leading-relaxed" style={{ color: '#5C544A' }}>{p}</p>
          ))}
        </div>
      </motion.section>

      {/* COMPETÊNCIAS */}
      <motion.section {...fadeUp(0.15)}>
        <SectionEyebrow label={t.ui.eyebrowSkills} />
        <div className="flex flex-wrap gap-2">
          {t.profile.skills.map((skill, i) => (
            <span
              key={i}
              className="font-hanken text-sm px-3 py-1.5 rounded-full transition-all duration-150 cursor-default"
              style={{ border: '1px solid #E4DCCD', color: '#5C544A', backgroundColor: '#F1ECE0' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#A84E2A';
                e.currentTarget.style.color = '#A84E2A';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E4DCCD';
                e.currentTarget.style.color = '#5C544A';
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.section>

      {/* IDIOMAS + CARTA */}
      <motion.section {...fadeUp(0.2)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD' }}>
            <p className="font-jetbrains text-xs uppercase tracking-widest mb-4" style={{ color: '#A84E2A' }}>
              {t.profile.languagesTitle}
            </p>
            <ul className="space-y-2">
              {t.profile.languages.map((lang, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span className="font-hanken font-medium" style={{ color: '#28241F' }}>{lang.name}</span>
                  <span className="font-jetbrains text-xs" style={{ color: '#6F6656' }}>{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD' }}>
            <p className="font-jetbrains text-xs uppercase tracking-widest mb-4" style={{ color: '#A84E2A' }}>
              {t.profile.drivingLicenseTitle}
            </p>
            <p className="font-spectral text-xl" style={{ color: '#28241F' }}>{t.profile.drivingLicense}</p>
          </div>
        </div>
      </motion.section>

      {/* WORD CLOUD */}
      <motion.section {...fadeUp(0.25)}>
        <SectionEyebrow label={t.profile.wordCloudTitle} />
        <div className="flex flex-wrap gap-x-5 gap-y-3 items-baseline">
          {t.profile.wordCloudWords.map((w, i) => {
            const style = weightToStyle(w.weight);
            return (
              <motion.span
                key={i}
                className={`font-hanken ${style.size} transition-opacity duration-200 hover:opacity-70 cursor-default`}
                style={{ color: style.color }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.025 }}
              >
                {w.text}
              </motion.span>
            );
          })}
        </div>
        <p className="font-hanken text-xs mt-6 italic" style={{ color: '#6F6656' }}>
          {t.profile.recommendationsNote}
        </p>
      </motion.section>
    </div>
  );
}