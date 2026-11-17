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

const toolsData = [
  {
    labelPT: 'CRM & Operação',
    labelEN: 'CRM & Operations',
    items: [
      'Salesforce',
      'Zendesk',
      'Airtable',
      'Gestão de leads e CRM interno',
      'Ferramentas de gestão comercial e follow-up'
    ],
    itemsEN: [
      'Salesforce',
      'Zendesk',
      'Airtable',
      'Lead management and internal CRM',
      'Commercial management and follow-up tools'
    ]
  },
  {
    labelPT: 'Dashboards & No-Code',
    labelEN: 'Dashboards & No-Code',
    items: [
      'Base44 (criação de dashboards e plataformas internas)',
      'Looker Studio',
      'Dashboards internos e ferramentas de reporting'
    ],
    itemsEN: [
      'Base44 (building dashboards and internal platforms)',
      'Looker Studio',
      'Internal dashboards and reporting tools'
    ]
  },
  {
    labelPT: 'IA & Produtividade',
    labelEN: 'AI & Productivity',
    items: [
      'Desenvolvimento de AI agents e workflows automatizados para otimização de processos internos',
      'Automação de tarefas operacionais e repetitivas, aumentando a eficiência individual e da equipa',
      'Estruturação e síntese de informação com AI para suporte rápido à tomada de decisão',
      'Prompt engineering aplicado a contexto de negócio (dados, vendas, comunicação e estratégia)',
      'Utilização de AI para geração de insights acionáveis e preparação de reuniões e propostas',
      'Aplicação prática de AI no dia a dia para aumento de produtividade, redução de esforço manual e melhoria da qualidade de output'
    ],
    itemsEN: [
      'Development of AI agents and automated workflows to optimise internal processes',
      'Automation of operational and repetitive tasks, increasing individual and team efficiency',
      'Structuring and synthesising information with AI for quick decision-making support',
      'Prompt engineering applied to business context (data, sales, communication and strategy)',
      'Using AI to generate actionable insights and prepare meetings and proposals',
      'Practical application of AI in daily work to increase productivity, reduce manual effort and improve output quality'
    ]
  },
  {
    labelPT: 'Ferramentas de Trabalho',
    labelEN: 'Work Tools',
    items: [
      'Slack (colaboração e comunicação interna)',
      'Excel (organização, análise funcional e reporting)',
      'PowerPoint / Google Slides / Canva (apresentações comerciais e estratégicas)',
      'Trello / Asana (gestão de tarefas e projetos)'
    ],
    itemsEN: [
      'Slack (collaboration and internal communication)',
      'Excel (organisation, functional analysis and reporting)',
      'PowerPoint / Google Slides / Canva (commercial and strategic presentations)',
      'Trello / Asana (task and project management)'
    ]
  }
];

export default function Tools() {
  const { t, language } = useLanguage();
  const isPT = language === 'pt';

  return (
    <div className="space-y-12">
      <motion.div {...fadeUp(0)}>
        <PageTitle title={t.tools.title} />
        <SectionEyebrow label={t.ui.toolsEyebrow} />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {toolsData.map((cat, i) => (
          <motion.div
            key={i}
            {...fadeUp(0.08 + i * 0.07)}
            className="rounded-xl p-6 transition-shadow duration-200 hover:shadow-md"
            style={{ backgroundColor: '#fff', border: '1px solid #E4DCCD' }}
          >
            <p className="font-spectral text-base font-semibold mb-4" style={{ color: '#28241F' }}>
              {isPT ? cat.labelPT : cat.labelEN}
            </p>
            <ul className="space-y-2">
              {(isPT ? cat.items : (cat.itemsEN || cat.items)).map((item, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#A84E2A' }} />
                  <span className="font-hanken text-sm leading-relaxed" style={{ color: '#28241F' }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        {...fadeUp(0.4)}
        className="rounded-xl p-5"
        style={{ backgroundColor: '#F1ECE0', border: '1px solid #E4DCCD' }}
      >
        <p className="font-hanken text-sm italic" style={{ color: '#6F6656' }}>
          {t.ui.toolsClosing}
        </p>
      </motion.div>
    </div>
  );
}