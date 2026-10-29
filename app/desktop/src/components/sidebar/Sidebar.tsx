import { Icon } from '../icons/Icon';
import { sidebarGroups } from './navigationItems';
import type { PageId } from '../../types/navigation';

interface SidebarProps {
  activePageId?: PageId;
  onNavigate: (pageId: PageId) => void;
  onNewProject: () => void;
  onOpenProject: () => void;
}

export function Sidebar({
  activePageId,
  onNavigate,
  onNewProject,
  onOpenProject,
}: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Navegação principal">
      <div className="project-actions">
        <button
          className="new-project-button sidebar-primary"
          type="button"
          aria-label="Novo projeto"
          title="Novo projeto"
          onClick={onNewProject}
        >
          Novo projeto
        </button>
        <button
          className="open-project-link"
          type="button"
          aria-label="Abrir projeto"
          title="Abrir projeto"
          onClick={onOpenProject}
        >
          <Icon name="folderOpen" size={17} /> Abrir projeto
        </button>
      </div>

      <nav className="sidebar-navigation">
        <button
          className={`sidebar-item${activePageId === 'dashboard' ? ' active' : ''}`}
          type="button"
          aria-label="Início"
          title="Início"
          onClick={() => onNavigate('dashboard')}
          aria-current={activePageId === 'dashboard' ? 'page' : undefined}
        >
          <Icon name="home" /> <span>Início</span>
        </button>
        {sidebarGroups.map((group) => (
          <section
            className="sidebar-group"
            aria-label={group.title}
            key={group.title}
          >
            <h2>{group.title}</h2>
            {group.items.map((item) => (
              <button
                className={`sidebar-item${activePageId === item.pageId ? ' active' : ''}`}
                key={item.pageId}
                type="button"
                aria-label={item.label}
                title={item.label}
                onClick={() => onNavigate(item.pageId)}
                aria-current={activePageId === item.pageId ? 'page' : undefined}
              >
                <Icon name={item.icon} /> <span>{item.label}</span>
              </button>
            ))}
          </section>
        ))}
      </nav>

      <footer className="sidebar-brand">
        <span>GM STUDIO</span>
      </footer>
    </aside>
  );
}
