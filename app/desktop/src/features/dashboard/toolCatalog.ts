import type { IconName } from '../../components/icons/Icon';
import type { PageId } from '../../types/navigation';

export interface ToolCardDefinition {
  id: PageId;
  title: string;
  description: string;
  image?: string;
  icon: IconName;
}

import audioImage from '../../assets/card-audio.jpg';
import mindMapImage from '../../assets/card-mind-map.jpg';
import notesImage from '../../assets/card-notes.jpg';

export const toolCatalog: ToolCardDefinition[] = [
  {
    id: 'audio-studio',
    title: 'Estúdio de áudio',
    description: 'Músicas e efeitos sonoros.',
    image: audioImage,
    icon: 'audio',
  },
  {
    id: 'mind-map',
    title: 'Mapa mental',
    description: 'Conecte pistas, pessoas e lugares.',
    image: mindMapImage,
    icon: 'network',
  },
  {
    id: 'notes',
    title: 'Notas e roteiros',
    description: 'Escreva ideias e roteiros.',
    image: notesImage,
    icon: 'notebook',
  },
  {
    id: 'pdf-reader',
    title: 'Leitor de PDF',
    description: 'Consulte regras e referências.',
    icon: 'fileText',
  },
  {
    id: 'character-sheets',
    title: 'Fichas de personagem',
    description: 'Organize personagens e NPCs.',
    icon: 'contact',
  },
  {
    id: 'media-library',
    title: 'Biblioteca de mídia',
    description: 'Imagens e referências visuais.',
    icon: 'image',
  },
  {
    id: 'session-planner',
    title: 'Planejador de sessões',
    description: 'Organize cenas e sessões.',
    icon: 'calendar',
  },
  {
    id: 'encounter-tracker',
    title: 'Encontros',
    description: 'Prepare e acompanhe encontros.',
    icon: 'swords',
  },
  {
    id: 'world-builder',
    title: 'Construtor de mundos',
    description: 'Lugares, facções e histórias.',
    icon: 'globe',
  },
];
