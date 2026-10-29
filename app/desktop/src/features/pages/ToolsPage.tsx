import { Icon } from '../../components/icons/Icon';
import { toolCatalog } from '../dashboard/toolCatalog';
import type { PageId } from '../../types/navigation';

export function ToolsPage({ onOpen }: { onOpen: (pageId: PageId) => void }) {
  return (
    <div className="feature-page page-enter">
      <div className="feature-page-heading">
        <span className="eyebrow">BIBLIOTECA</span>
        <h1>Ferramentas</h1>
      </div>
      <div className="tools-directory">
        {toolCatalog.map((tool) => (
          <button
            className="directory-tool"
            key={tool.id}
            type="button"
            onClick={() => onOpen(tool.id)}
          >
            <span className="directory-tool-icon">
              <Icon name={tool.icon} size={21} />
            </span>
            <span>
              <strong>{tool.title}</strong>
              <small>{tool.description}</small>
            </span>
            <Icon className="directory-arrow" name="arrowUpRight" size={17} />
          </button>
        ))}
      </div>
    </div>
  );
}
