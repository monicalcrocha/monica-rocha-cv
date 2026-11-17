import React, { useState } from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import SectionEyebrow from '@/components/cv/SectionEyebrow';
import PageTitle from '@/components/cv/PageTitle';
import { Plus, Minus } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay }
});

const projectsData = [
  {
    title: 'Migração CRM para Supabase',
    tag: 'Iniciativa Própria',
    context: 'A empresa usava Airtable como CRM comercial. Identifiquei limitações de escalabilidade e custos crescentes.',
    did: 'Desenhei e implementei uma migração para Supabase com estrutura relacional, dashboards e automações, fora do horário de trabalho.',
    result: 'Solução funcional entregue pro-ativamente, demonstrando capacidade técnica e iniciativa além do âmbito da função.'
  },
  {
    title: 'Pipeline Internacional',
    tag: 'Análise Estratégica',
    context: 'A DIG-IN identificou oportunidade de expansão internacional mas não tinha o pipeline mapeado.',
    did: 'Analisei +1.100 registos do CRM, classifiquei ~90 leads em 3 tiers de prioridade e construí um dashboard interativo em português.',
    result: 'Entregue ferramenta de decisão estratégica utilizada pela liderança para priorizar mercados de expansão.'
  },
  {
    title: 'Demos Visuais',
    tag: 'Demo & Apresentação',
    context: 'Necessidade de demonstrar o valor dos dados da empresa e como os apresentamos a diversas marcas e grupos de restauração com perfis diferentes no que respeita a análise de dados.',
    did: 'Criei plataformas demonstrativas com dados fictícios. Estas apresentações da empresa passam a ser interativas e com exemplos reais de como entregamos as nossas soluções.',
    result: 'As apresentações são muito mais claras e todos os potenciais clientes conseguem entender melhor o que entregamos e conseguimos também gerar mais credibilidade.'
  },
  {
    title: 'AI & Automações',
    tag: 'Iniciativa Própria',
    context: 'Criação de ferramentas digitais, workflows com AI e sistemas de apoio à organização, análise e tomada de decisão.',
    did: '• Desenvolvimento de dashboards para acompanhar performance, progresso de projetos e informação operacional\n• Criação de AI agents e workflows automatizados para apoiar tarefas repetitivas, organização de informação e rotinas de trabalho\n• Escrita e otimização de prompts para diferentes contextos de negócio, incluindo dados, comunicação, reporting e preparação de reuniões\n• Utilização de AI para estruturar informação, gerar insights e aumentar a eficiência individual e da equipa',
    result: 'Redução de tempo em tarefas operacionais, maior rapidez na análise e preparação de decisões, e melhor estruturação de informação crítica para equipas e projetos.'
  }
];

const projectsDataEN = [
  {
    title: 'CRM Migration to Supabase',
    tag: 'Own Initiative',
    context: 'The company used Airtable as commercial CRM. I identified scalability limitations and growing costs.',
    did: 'Designed and implemented a migration to Supabase with relational structure, dashboards and automations, outside working hours.',
    result: 'Functional solution delivered proactively, demonstrating technical capacity and initiative beyond the role scope.'
  },
  {
    title: 'International Pipeline',
    tag: 'Strategic Analysis',
    context: 'DIG-IN identified an opportunity for international expansion but had no mapped pipeline.',
    did: 'Analysed 1,100+ CRM records, classified ~90 leads in 3 priority tiers and built an interactive dashboard.',
    result: 'Delivered a strategic decision tool used by leadership to prioritise expansion markets.'
  },
  {
    title: 'Visual Demos',
    tag: 'Demo & Presentation',
    context: 'Need to demonstrate the value of company data and how we present it to different brands and restaurant groups with varying data analysis profiles.',
    did: 'Created demonstration platforms with fictional data. These company presentations became interactive with real examples of how we deliver our solutions.',
    result: 'Presentations are much clearer and all potential clients can better understand what we deliver, also generating more credibility.'
  },
  {
    title: 'AI & Automations',
    tag: 'Own Initiative',
    context: 'Creation of digital tools, AI workflows and support systems for organisation, analysis and decision-making.',
    did: '• Development of Base44 dashboards to track performance, project progress and operational information\n• Creation of AI agents and automated workflows to support repetitive tasks, information organisation and work routines\n• Writing and optimising prompts for different business contexts, including data, communication, reporting and meeting preparation\n• Using AI to structure information, generate insights and increase individual and team efficiency',
    result: 'Reduced time on operational tasks, faster analysis and decision preparation, and better structuring of critical information for teams and projects.'
  }
];

export default function Projects() {
  const { t, language } = useLanguage();
  const [expanded, setExpanded] = useState(null);
  const data = language === 'pt' ? projectsData : projectsDataEN;

  const contextLabel = t.projects.contextLabel;
  const actionsLabel = t.projects.actionsLabel;
  const resultLabel = t.projects.resultLabel;

  return (
    <div className="space-y-12">
      <motion.div {...fadeUp(0)}>
        <PageTitle title={t.projects.title} />
        <SectionEyebrow label={t.eyebrows.projects} />
      </motion.div>

      <div className="space-y-3">
        {data.map((project, i) => {
          const isExp = expanded === i;
          return (
            <motion.div
              key={i}
              {...fadeUp(i * 0.07)}
              className="rounded-xl overflow-hidden transition-shadow duration-200"
              style={{
                backgroundColor: '#fff',
                border: '1px solid #E4DCCD',
                boxShadow: isExp ? '0 4px 20px rgba(40,36,31,0.09)' : 'none'
              }}
            >
              <button
                onClick={() => setExpanded(isExp ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-spectral text-lg font-medium" style={{ color: '#28241F' }}>{project.title}</span>
                  <span
                    className="font-jetbrains text-xs px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: '#F1ECE0', color: '#C15F36', border: '1px solid #E4DCCD' }}
                  >
                    {project.tag}
                  </span>
                </div>
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all"
                  style={{ backgroundColor: isExp ? '#C15F36' : '#F1ECE0', color: isExp ? '#fff' : '#8C8270' }}
                >
                  {isExp ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                </div>
              </button>

              <AnimatePresence>
                {isExp && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-6"
                    style={{ borderTop: '1px solid #E4DCCD' }}
                  >
                    <div className="pt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { label: contextLabel, text: project.context },
                        { label: actionsLabel, text: project.did },
                        { label: resultLabel, text: project.result },
                      ].map(({ label, text }, j) => (
                        <div key={j}>
                          <p className="font-jetbrains text-xs uppercase tracking-widest mb-2" style={{ color: '#C15F36' }}>{label}</p>
                          <div className="font-hanken text-sm leading-relaxed" style={{ color: '#5C544A' }}>
                            {text.includes('\n') ? text.split('\n').map((line, k) => (
                              <p key={k} className={k > 0 ? 'mt-1.5' : ''}>{line}</p>
                            )) : text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}