import { pageRegistry } from './pageRegistry';
import type { PageId } from '../../types/navigation';

export function PlaceholderPage({
  pageId,
  onOpenRepository,
}: {
  pageId: PageId;
  onOpenRepository: () => void;
}) {
  const page = pageRegistry[pageId];
  return (
    <div className={`feature-page page-enter feature-${pageId}`}>
      <div className="feature-page-heading">
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </div>
      <div className="feature-page-state">
        <span className="feature-status-dot" aria-hidden="true" />
        <span>{page.status}</span>
        {pageId === 'github' && (
          <button
            className="repository-button"
            type="button"
            onClick={onOpenRepository}
          >
            Abrir no GitHub
          </button>
        )}
      </div>
    </div>
  );
}
