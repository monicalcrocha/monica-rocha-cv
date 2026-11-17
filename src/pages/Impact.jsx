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

const forceData = [
  {
    title: 'B2B & Gestão de carteira',
    bullets: [
      'Gestão de carteira de clientes e acompanhamento dedicado',
      'Desenvolvimento de propostas comerciais',
      'Foco em satisfação e retenção'
    ]
  },
  {
    title: 'Parcerias & Crescimento',
    bullets: [
      'Identificação de oportunidades e criação de parcerias',
      'Soluções ajustadas a objetivos do cliente',
      'Alinhamento entre expectativas internas e externas'
    ]
  },
  {
    title: 'Dados aplicados ao negócio',
    bullets: [
      'Interpretação de insights/dashboards para apoiar decisões',
      'Capacidade de traduzir necessidades de negócio em requisitos claros',
      'Colaboração próxima com equipas internas para melhorar produto/fit'
    ]
  },
  {
    title: 'Excelência em Customer Experience',
    bullets: [
      'Experiência em hotelaria premium e gestão de VIPs',
      'Resolução de problemas com elevado padrão de serviço',
      'Orientação à qualidade e detalhe'
    ]
  }
];

const highlights = [
  'Estabeleci novas parcerias na área de dados com grandes grupos FMCG e restauração (DIG-IN).',
  'Alcancei elevados níveis de satisfação e bons resultados comerciais na gestão de carteira B2B (Vodafone Business).',
  'Melhores resultados de KPIs da equipa (Hostmaker).',
  'Organização da estadia de Ariana Grande em conjunto com o Tour Manager, e criação de WOW Stories reconhecidas pela Direção Geral (Penha Longa Resort).',
  'Apoio à equipa na construção de plataformas, organização de CRM e gestão diária de tarefas (DIG-IN).'
];

const forceDataEN = [
  {
    title: 'B2B & Portfolio Management',
    bullets: [
      'Client portfolio management and dedicated follow-up',
      'Development of commercial proposals',
      'Focus on satisfaction and retention'
    ]
  },
  {
    title: 'Partnerships & Growth',
    bullets: [
      'Identifying opportunities and creating partnerships',
      'Solutions tailored to client objectives',
      'Alignment between internal and external expectations'
    ]
  },
  {
    title: 'Data Applied to Business',
    bullets: [
      'Interpretation of insights/dashboards to support decisions',
      'Ability to translate business needs into clear requirements',
      'Close collaboration with internal teams to improve product/fit'
    ]
  },
  {
    title: 'Excellence in Customer Experience',
    bullets: [
      'Experience in premium hospitality and VIP management',
      'Problem resolution with high service standards',
      'Quality and detail orientation'
    ]
  }
];

const highlightsEN = [
  'Established new partnerships in data with major FMCG and restaurant groups (DIG-IN).',
  'Achieved high satisfaction levels and strong commercial results in B2B portfolio management (Vodafone Business).',
  'Best KPI numbers on the team (Hostmaker).',
  'Organized the stay of Ariana Grande along with her Tour Manager, and created big WOW Stories recognized by the General Manager (Penha Longa Resort).',
  'Supported the team in building platforms, organizing CRM and managing daily tasks (DIG-IN).'
];

export default function Impact() {
  const { t, language } = useLanguage();
  const isPT = language === 'pt';

  return (
    <div className="space-y-14">
      <motion.div {...fadeUp(0)}>
        <PageTitle title={t.impact.title} />
        <SectionEyebrow label={isPT ? 'Forças & conquistas' : 'Strengths & achievements'} />
      </motion.div>

      {/* Forces grid */}
      <motion.section {...fadeUp(0.1)}>
        <p className="font-jetbrains text-xs uppercase tracking-widest mb-6" style={{ color: '#C15F36' }}>
          {t.impact.strengthsTitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(isPT ? forceData : forceDataEN).map((force, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.1 + i * 0.06)}
              className="rounded-xl p-5 transition-shadow duration-200 hover:shadow-md"
              style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD' }}
            >
              <p className="font-spectral text-lg font-medium mb-3" style={{ color: '#28241F' }}>{force.title}</p>
              <ul className="space-y-1.5">
                {force.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: '#C15F36' }} />
                    <span className="font-hanken text-sm" style={{ color: '#5C544A' }}>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Highlights */}
      <motion.section {...fadeUp(0.25)}>
        <p className="font-jetbrains text-xs uppercase tracking-widest mb-6" style={{ color: '#C15F36' }}>
          {t.impact.achievementsTitle}
        </p>
        <ol className="space-y-4">
          {(isPT ? highlights : highlightsEN).map((h, i) => (
            <motion.li
              key={i}
              {...fadeUp(0.25 + i * 0.07)}
              className="flex items-start gap-4 rounded-xl p-5"
              style={{ backgroundColor: '#F1ECE0', border: '1px solid #E4DCCD' }}
            >
              <span
                className="font-jetbrains text-sm font-medium flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ backgroundColor: '#C15F36', color: '#fff' }}
              >
                {i + 1}
              </span>
              <span className="font-hanken text-sm leading-relaxed" style={{ color: '#5C544A' }}>{h}</span>
            </motion.li>
          ))}
        </ol>
      </motion.section>
    </div>
  );
}