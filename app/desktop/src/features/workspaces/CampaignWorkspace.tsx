import { Icon } from '../../components/icons/Icon';
import type { CampaignProject } from '../../types/project';
import type { PageId } from '../../types/navigation';

export function CampaignWorkspace({
  project,
  onOpenTool,
}: {
  project: CampaignProject;
  onOpenTool: (pageId: PageId) => void;
}) {
  return (
    <div className="campaign-workspace page-enter">
      <div className="campaign-heading">
        <h1>{project.name}</h1>
        {project.description && <p>{project.description}</p>}
        <small>
          <Icon name="clock" size={15} /> Criada em{' '}
          {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(
            new Date(project.createdAt),
          )}
        </small>
      </div>
      <div className="campaign-shortcuts">
        <button type="button" onClick={() => onOpenTool('notes')}>
          <Icon name="notebook" />
          <span>
            <strong>Notas e roteiros</strong>
          </span>
          <Icon className="directory-arrow" name="arrowUpRight" size={17} />
        </button>
        <button type="button" onClick={() => onOpenTool('mind-map')}>
          <Icon name="network" />
          <span>
            <strong>Mapa mental</strong>
          </span>
          <Icon className="directory-arrow" name="arrowUpRight" size={17} />
        </button>
        <button type="button" onClick={() => onOpenTool('session-planner')}>
          <Icon name="calendar" />
          <span>
            <strong>Planejador de sessões</strong>
          </span>
          <Icon className="directory-arrow" name="arrowUpRight" size={17} />
        </button>
      </div>
    </div>
  );
}
