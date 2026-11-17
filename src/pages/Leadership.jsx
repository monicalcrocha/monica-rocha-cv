import React from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { motion } from 'framer-motion';
import SectionEyebrow from '@/components/cv/SectionEyebrow';
import PageTitle from '@/components/cv/PageTitle';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay }
});

const stylesData = [
  {
    title: 'Liderar pelo exemplo',
    titleEN: 'Leading by Example',
    subtitle: 'Faço e mostro',
    subtitleEN: 'I do and show',
    bullets: ['Dou o exemplo através da execução', 'Partilho resultados para motivar a equipa'],
    bulletsEN: ['I lead by example through execution', 'I share results to motivate the team']
  },
  {
    title: 'Motivação & desenvolvimento',
    titleEN: 'Motivation & Development',
    subtitle: '',
    subtitleEN: '',
    bullets: ['Acompanho a equipa de forma próxima', 'Acredito nas pessoas e no seu potencial', 'Puxo pela equipa mesmo quando é desafiante'],
    bulletsEN: ['I stay close to the team', 'I believe in people and their potential', 'I push the team even when it is challenging']
  },
  {
    title: 'Transparência & aprendizagem',
    titleEN: 'Transparency & Learning',
    subtitle: '',
    subtitleEN: '',
    bullets: ['Mostro o que funciona e o que não funciona', 'Uso erros como oportunidades de aprendizagem', 'Promovo um ambiente de confiança e abertura'],
    bulletsEN: ['I show what works and what does not', 'I use mistakes as learning opportunities', 'I promote an environment of trust and openness']
  },
  {
    title: 'Persistência & apoio',
    titleEN: 'Persistence & Support',
    subtitle: '',
    subtitleEN: '',
    bullets: ['Não desisto das pessoas', 'Dou a mão a quem precisa', 'Ajudo a ultrapassar dificuldades e puxo a equipa para cima'],
    bulletsEN: ['I do not give up on people', 'I support those who need it', 'I help overcome difficulties and lift the team up']
  }
];

const stepsData = [
  { pt: 'Começo sempre pelo objetivo e pelas pessoas', en: 'I always start with the objective and the people' },
  { pt: 'Defino prioridades claras e foco no que gera impacto', en: 'I define clear priorities and focus on what generates impact' },
  { pt: 'Organizo o trabalho para reduzir ruído e aumentar eficiência', en: 'I organise work to reduce noise and increase efficiency' },
  { pt: 'Uso resultados e insights para orientar decisões', en: 'I use results and insights to guide decisions' },
  { pt: 'Executo, acompanho e ajusto continuamente', en: 'I execute, follow up and adjust continuously' },
];

const valuesData = ['Honestidade', 'Respeito', 'Responsabilidade', 'Ambição', 'Foco', 'Trabalho em equipa', 'Melhoria contínua'];
const valuesDataEN = ['Honesty', 'Respect', 'Responsibility', 'Ambition', 'Focus', 'Teamwork', 'Continuous improvement'];

const rolePoints = [
  { pt: 'Liderança da equipa comercial', en: 'Leadership of the commercial team' },
  { pt: 'Definição de estratégia e prioridades comerciais', en: 'Defining commercial strategy and priorities' },
  { pt: 'Coaching e acompanhamento individual', en: 'Coaching and individual follow-up' },
  { pt: 'Ponte entre comercial e liderança da empresa', en: 'Bridge between commercial team and company leadership' },
];

export default function Leadership() {
  const { t, language } = useLanguage();
  const isPT = language === 'pt';

  return (
    <div className="space-y-14">
      <motion.div {...fadeUp(0)}>
        <PageTitle title={t.leadership.title} />
        <SectionEyebrow label={t.eyebrows.leadership} />
      </motion.div>

      {/* Role Card */}
      <motion.section {...fadeUp(0.1)}>
        <div className="rounded-xl p-6" style={{ backgroundColor: '#F1ECE0', border: '1px solid #E4DCCD' }}>
          <p className="font-jetbrains text-xs uppercase tracking-widest mb-2" style={{ color: '#A84E2A' }}>
            {t.leadership.roleTitle}
          </p>
          <p className="font-spectral text-xl font-medium mb-4" style={{ color: '#28241F' }}>
            Business Development Manager · DIG-IN · {t.ui.since}
          </p>
          <ul className="space-y-2">
            {rolePoints.map((p, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: '#A84E2A' }} />
                <span className="font-hanken text-sm" style={{ color: '#5C544A' }}>{isPT ? p.pt : p.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Leadership styles */}
      <motion.section {...fadeUp(0.15)}>
        <p className="font-jetbrains text-xs uppercase tracking-widest mb-5" style={{ color: '#A84E2A' }}>
          {t.leadership.styleTitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stylesData.map((s, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.15 + i * 0.06)}
              className="rounded-xl p-5 transition-shadow duration-200 hover:shadow-md"
              style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD' }}
            >
              <p className="font-spectral text-base font-semibold mb-1" style={{ color: '#28241F' }}>
                {isPT ? s.title : s.titleEN}
              </p>
              {(isPT ? s.subtitle : s.subtitleEN) && (
                <p className="font-hanken text-xs italic mb-3" style={{ color: '#6F6656' }}>
                  {isPT ? s.subtitle : s.subtitleEN}
                </p>
              )}
              <ul className="space-y-1.5 mt-2">
                {(isPT ? s.bullets : s.bulletsEN).map((b, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: '#A84E2A' }} />
                    <span className="font-hanken text-sm" style={{ color: '#5C544A' }}>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How I work */}
      <motion.section {...fadeUp(0.3)}>
        <p className="font-jetbrains text-xs uppercase tracking-widest mb-3" style={{ color: '#A84E2A' }}>
          {t.leadership.howIWorkTitle}
        </p>
        <p className="font-hanken text-sm italic mb-5" style={{ color: '#6F6656' }}>
          {isPT ? 'Acredito que bons resultados vêm de clareza, organização e consistência.' : 'I believe good results come from clarity, organisation and consistency.'}
        </p>
        <ol className="space-y-3">
          {stepsData.map((step, i) => (
            <motion.li
              key={i}
              {...fadeUp(0.3 + i * 0.06)}
              className="flex items-center gap-4 px-5 py-3.5 rounded-xl"
              style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD' }}
            >
              <span
                className="font-jetbrains text-xs font-medium flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#F1ECE0', color: '#A84E2A' }}
              >
                {i + 1}
              </span>
              <span className="font-hanken text-sm" style={{ color: '#28241F' }}>{isPT ? step.pt : step.en}</span>
            </motion.li>
          ))}
        </ol>
      </motion.section>

      {/* Values */}
      <motion.section {...fadeUp(0.4)}>
        <p className="font-jetbrains text-xs uppercase tracking-widest mb-4" style={{ color: '#A84E2A' }}>
          {t.leadership.valuesTitle}
        </p>
        <div className="flex flex-wrap gap-2">
          {(isPT ? valuesData : valuesDataEN).map((v, i) => (
            <span
              key={i}
              className="font-hanken text-sm px-4 py-2 rounded-full transition-all duration-150"
              style={{ backgroundColor: '#F1ECE0', border: '1px solid #E4DCCD', color: '#5C544A' }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#A84E2A';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = '#A84E2A';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#F1ECE0';
                e.currentTarget.style.color = '#5C544A';
                e.currentTarget.style.borderColor = '#E4DCCD';
              }}
            >
              {v}
            </span>
          ))}
        </div>
      </motion.section>
    </div>
  );
}