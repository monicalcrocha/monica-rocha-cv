import { Target, Activity, Briefcase, GraduationCap, Users, Wrench, StickyNote, Mail } from 'lucide-react';

export const NAV = [
  { key: 'opportunity', path: '/', icon: Target },
  { key: 'activity', path: '/atividade', icon: Activity },
  { key: 'projects', path: '/projetos', icon: Briefcase },
  { key: 'training', path: '/formacao', icon: GraduationCap },
  { key: 'leadership', path: '/lideranca', icon: Users },
  { key: 'tools', path: '/ferramentas', icon: Wrench },
  { key: 'notes', path: '/notas', icon: StickyNote },
  { key: 'contact', path: '/contacto', icon: Mail },
];
