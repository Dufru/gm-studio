export type Locale = 'en' | 'pt-BR';

export const translations = {
  en: {
    menus: ['File', 'Edit', 'View', 'Help'],
    appMenu: 'Application menu',
    language: 'Language',
    languageMenu: 'Choose language',
    languageNames: { en: 'English', 'pt-BR': 'Português (Brasil)' },
    sidebarLabel: 'GM Studio navigation',
    resources: 'Resources',
    featuredTools: 'Featured tools',
    library: 'Library',
    gmStudio: 'GM Studio',
    sidebarActions: ['New Project', 'Open Project'],
    sidebarItems: [
      ['Saved Workspaces', 'Tools', 'Trash'],
      ['About GM Studio', 'GitHub Project', 'Updates', 'Settings'],
    ],
    welcome: 'Welcome to GM Studio. What are we running today?',
    workspaceTitle: 'Create Your Own Space',
    workspaceDescription:
      'Choose your tools, organize your panels, and build a workspace that works your way.',
    workspaceCardLabel: 'Create Your Own Space',
    tools: [
      {
        title: 'Audio Studio',
        description:
          'Set the tone for each scene with music and sound effects.',
      },
      {
        title: 'Mind Map',
        description: 'Connect clues, characters, and places.',
      },
      {
        title: 'Notes & Scripts',
        description: 'Record ideas and prepare your sessions.',
      },
    ],
    recentProjects: 'Recent Projects',
    emptyTitle: 'Your Next Adventure Starts Here.',
    emptyDescription:
      'Your projects will appear here when you create or open a campaign.',
    createAdventure: 'Create Adventure',
  },
  'pt-BR': {
    menus: ['Arquivo', 'Editar', 'Visualizar', 'Ajuda'],
    appMenu: 'Menu do aplicativo',
    language: 'Idioma',
    languageMenu: 'Escolher idioma',
    languageNames: { en: 'English', 'pt-BR': 'Português (Brasil)' },
    sidebarLabel: 'Navegação do GM Studio',
    resources: 'Recursos',
    featuredTools: 'Ferramentas em destaque',
    library: 'Biblioteca',
    gmStudio: 'GM Studio',
    sidebarActions: ['Novo projeto', 'Abrir projeto'],
    sidebarItems: [
      ['Espaços salvos', 'Ferramentas', 'Lixeira'],
      [
        'Sobre o GM Studio',
        'Projeto no GitHub',
        'Atualizações',
        'Configurações',
      ],
    ],
    welcome: 'Boas vindas ao GM Studio, o que vamos mestrar hoje?',
    workspaceTitle: 'Crie seu próprio espaço',
    workspaceDescription:
      'Escolha suas ferramentas, organize os painéis e monte um ambiente que funcione do seu jeito.',
    workspaceCardLabel: 'Crie seu próprio espaço',
    tools: [
      {
        title: 'Estúdio de áudio',
        description: 'Dê o tom de cada cena com músicas e efeitos sonoros.',
      },
      {
        title: 'Mapa mental',
        description: 'Conecte pistas, personagens e lugares.',
      },
      {
        title: 'Notas e roteiros',
        description: 'Registre ideias e prepare suas sessões.',
      },
    ],
    recentProjects: 'Projetos recentes',
    emptyTitle: 'Sua próxima aventura começa aqui.',
    emptyDescription:
      'Seus projetos aparecerão aqui quando você criar ou abrir uma campanha.',
    createAdventure: 'Criar aventura',
  },
} as const;
