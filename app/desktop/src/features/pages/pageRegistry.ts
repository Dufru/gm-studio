import type { PageId } from '../../types/navigation';

export interface PageDefinition {
  title: string;
  description: string;
  status: string;
}

export const pageRegistry: Record<PageId, PageDefinition> = {
  dashboard: {
    title: 'Início',
    description: 'Campanhas e ferramentas.',
    status: 'Visão geral',
  },
  'saved-workspaces': {
    title: 'Espaços salvos',
    description: 'Layouts independentes para organizar suas ferramentas.',
    status: 'Em desenvolvimento',
  },
  tools: {
    title: 'Ferramentas',
    description: 'Ferramentas de preparação e condução.',
    status: 'Catálogo de ferramentas',
  },
  trash: {
    title: 'Lixeira',
    description: 'Projetos removidos serão exibidos aqui.',
    status: 'Lixeira vazia',
  },
  about: {
    title: 'Sobre o GM Studio',
    description: 'Aplicativo local para organizar campanhas de RPG.',
    status: 'Desenvolvimento inicial',
  },
  github: {
    title: 'Projeto no GitHub',
    description: 'Código-fonte do GM Studio.',
    status: 'Repositório do projeto',
  },
  updates: {
    title: 'Atualizações',
    description: 'Notas de versão do aplicativo.',
    status: 'Atualizações automáticas indisponíveis',
  },
  settings: {
    title: 'Configurações',
    description: 'Preferências do aplicativo.',
    status: 'Em desenvolvimento',
  },
  'audio-studio': {
    title: 'Estúdio de áudio',
    description: 'Músicas, ambiência e efeitos sonoros.',
    status: 'Em desenvolvimento',
  },
  'mind-map': {
    title: 'Mapa mental',
    description: 'Conexões entre pistas, personagens e lugares.',
    status: 'Em desenvolvimento',
  },
  notes: {
    title: 'Notas e roteiros',
    description: 'Ideias, cenas e roteiros de sessão.',
    status: 'Em desenvolvimento',
  },
  'pdf-reader': {
    title: 'Leitor de PDF',
    description: 'Regras e materiais de referência.',
    status: 'Em desenvolvimento',
  },
  'character-sheets': {
    title: 'Fichas de personagem',
    description: 'Personagens jogadores, NPCs e criaturas.',
    status: 'Em desenvolvimento',
  },
  'media-library': {
    title: 'Biblioteca de mídia',
    description: 'Imagens e referências visuais.',
    status: 'Em desenvolvimento',
  },
  'session-planner': {
    title: 'Planejador de sessões',
    description: 'Cenas, ganchos e objetivos.',
    status: 'Em desenvolvimento',
  },
  'encounter-tracker': {
    title: 'Encontros',
    description: 'Desafios e encontros da campanha.',
    status: 'Em desenvolvimento',
  },
  'world-builder': {
    title: 'Construtor de mundos',
    description: 'Regiões, facções e história do cenário.',
    status: 'Em desenvolvimento',
  },
};
