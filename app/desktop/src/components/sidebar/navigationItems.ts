import type { IconName } from '../icons/Icon';
import type { PageId } from '../../types/navigation';

export interface SidebarItemDefinition {
  label: string;
  icon: IconName;
  pageId: PageId;
}

export const sidebarGroups: {
  title: string;
  items: SidebarItemDefinition[];
}[] = [
  {
    title: 'Biblioteca',
    items: [
      { label: 'Espaços salvos', icon: 'panels', pageId: 'saved-workspaces' },
      { label: 'Ferramentas', icon: 'grid', pageId: 'tools' },
      { label: 'Lixeira', icon: 'trash', pageId: 'trash' },
    ],
  },
  {
    title: 'GM Studio',
    items: [
      { label: 'Sobre o GM Studio', icon: 'info', pageId: 'about' },
      { label: 'Projeto no GitHub', icon: 'github', pageId: 'github' },
      { label: 'Atualizações', icon: 'bell', pageId: 'updates' },
      { label: 'Configurações', icon: 'settings', pageId: 'settings' },
    ],
  },
];
