export interface CampaignProject {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  lastOpenedAt: string;
}

export interface CreateCampaignInput {
  name: string;
  description: string;
}
