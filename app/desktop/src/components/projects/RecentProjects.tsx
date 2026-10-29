import { Icon } from '../icons/Icon';
import type { CampaignProject } from '../../types/project';

interface RecentProjectsProps {
  projects: CampaignProject[];
  loading: boolean;
  loadError: string | null;
  view: 'list' | 'cards';
  onViewChange: (view: 'list' | 'cards') => void;
  onRetry: () => void;
  onCreate: () => void;
  onOpen: (project: CampaignProject) => void;
}

function recentLabel(date: string) {
  const time = new Date(date).getTime();
  if (!Number.isFinite(time)) return 'Data indisponível';
  return `Aberta em ${new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }).format(time)}`;
}

function ProjectCover({ name }: { name: string }) {
  return (
    <span className="project-cover" aria-hidden="true">
      <span className="project-cover-mark">
        {name.slice(0, 1).toLocaleUpperCase('pt-BR') || '✦'}
      </span>
    </span>
  );
}

export function RecentProjects({
  projects,
  loading,
  loadError,
  view,
  onViewChange,
  onRetry,
  onCreate,
  onOpen,
}: RecentProjectsProps) {
  return (
    <section
      className="recent-projects"
      aria-labelledby="recent-projects-title"
    >
      <div className="section-heading">
        <div>
          <h2 id="recent-projects-title">Projetos recentes</h2>
        </div>
        {projects.length > 0 && (
          <div
            className="view-toggle"
            role="group"
            aria-label="Visualização dos projetos"
          >
            <button
              className={view === 'list' ? 'selected' : ''}
              type="button"
              aria-label="Visualizar em lista"
              aria-pressed={view === 'list'}
              title="Lista"
              onClick={() => onViewChange('list')}
            >
              <Icon name="list" />
            </button>
            <button
              className={view === 'cards' ? 'selected' : ''}
              type="button"
              aria-label="Visualizar em cards"
              aria-pressed={view === 'cards'}
              title="Cards"
              onClick={() => onViewChange('cards')}
            >
              <Icon name="grid" />
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="projects-loading" role="status">
          <span className="loading-dot" />
          Carregando suas campanhas salvas…
        </div>
      ) : loadError ? (
        <div className="project-load-error" role="alert">
          <Icon name="info" />
          <span>
            <strong>Não foi possível carregar as campanhas.</strong>
            <small>{loadError}</small>
          </span>
          <button className="text-button" type="button" onClick={onRetry}>
            Tentar novamente
          </button>
        </div>
      ) : projects.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhum projeto recente</h3>
          <button
            className="new-project-button"
            type="button"
            onClick={onCreate}
          >
            Novo projeto
          </button>
        </div>
      ) : (
        <div
          className={`project-grid ${view === 'list' ? 'list-view' : 'card-view'}`}
        >
          {projects.map((project) => (
            <button
              className="recent-project"
              type="button"
              key={project.id}
              onClick={() => onOpen(project)}
            >
              <ProjectCover name={project.name} />
              <span className="recent-project-copy">
                <strong>{project.name}</strong>
                <small>{recentLabel(project.lastOpenedAt)}</small>
                {project.description && view === 'cards' && (
                  <span className="project-description">
                    {project.description}
                  </span>
                )}
              </span>
              <Icon
                className="recent-project-arrow"
                name="arrowUpRight"
                size={17}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
