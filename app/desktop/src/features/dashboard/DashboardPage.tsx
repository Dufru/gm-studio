import type { PageId } from '../../types/navigation';
import type { CampaignProject } from '../../types/project';
import { RecentProjects } from '../../components/projects/RecentProjects';
import { ToolCarousel } from './ToolCarousel';
import { WorkspaceIntro } from './WorkspaceIntro';

interface DashboardPageProps {
  projects: CampaignProject[];
  loadingProjects: boolean;
  projectLoadError: string | null;
  projectView: 'list' | 'cards';
  onProjectViewChange: (view: 'list' | 'cards') => void;
  onRetryProjects: () => void;
  onCreateProject: () => void;
  onOpenProject: (project: CampaignProject) => void;
  onOpenTool: (pageId: PageId) => void;
}

export function DashboardPage({
  projects,
  loadingProjects,
  projectLoadError,
  projectView,
  onProjectViewChange,
  onRetryProjects,
  onCreateProject,
  onOpenProject,
  onOpenTool,
}: DashboardPageProps) {
  return (
    <div className="dashboard page-enter">
      <section className="welcome-section">
        <h1>O que vamos mestrar hoje?</h1>
      </section>
      <div className="dashboard-feature-row">
        <WorkspaceIntro />
        <ToolCarousel onOpen={onOpenTool} />
      </div>
      <RecentProjects
        projects={projects}
        loading={loadingProjects}
        loadError={projectLoadError}
        view={projectView}
        onViewChange={onProjectViewChange}
        onRetry={onRetryProjects}
        onCreate={onCreateProject}
        onOpen={onOpenProject}
      />
    </div>
  );
}
