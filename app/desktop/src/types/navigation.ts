import type { CampaignProject } from './project';

export type PageId =
  | 'dashboard'
  | 'saved-workspaces'
  | 'tools'
  | 'trash'
  | 'about'
  | 'github'
  | 'updates'
  | 'settings'
  | 'audio-studio'
  | 'mind-map'
  | 'notes'
  | 'pdf-reader'
  | 'character-sheets'
  | 'media-library'
  | 'session-planner'
  | 'encounter-tracker'
  | 'world-builder';

export interface PageTab {
  id: string;
  pageId?: PageId;
  projectId?: string;
  title: string;
  closable: boolean;
}

export type WorkspaceTab = PageTab | (PageTab & { projectId: string });

export const campaignTab = (project: CampaignProject): WorkspaceTab => ({
  id: `campaign:${project.id}`,
  projectId: project.id,
  title: project.name,
  closable: true,
});
