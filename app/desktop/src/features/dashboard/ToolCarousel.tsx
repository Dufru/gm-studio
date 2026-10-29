import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { Icon } from '../../components/icons/Icon';
import type { PageId } from '../../types/navigation';
import { toolCatalog } from './toolCatalog';

export function ToolCarousel({ onOpen }: { onOpen: (pageId: PageId) => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  const updateScrollState = useCallback(() => {
    const element = scroller.current;
    if (!element) return;
    setCanScrollBack(element.scrollLeft > 4);
    setCanScrollForward(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 4,
    );
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  const scroll = (direction: number) => {
    const element = scroller.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>('.tool-card');
    const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 0;
    const step =
      (card?.getBoundingClientRect().width ?? element.clientWidth) + gap;
    element.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const handleCarouselKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      scroll(event.key === 'ArrowRight' ? 1 : -1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      scroller.current?.scrollTo({
        left: event.key === 'Home' ? 0 : scroller.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="tool-section" aria-label="Ferramentas">
      <div className="carousel-actions">
        <button
          className="icon-button carousel-arrow"
          type="button"
          aria-label="Ver ferramentas anteriores"
          title="Anterior"
          disabled={!canScrollBack}
          onClick={() => scroll(-1)}
        >
          <Icon name="chevronLeft" />
        </button>
        <button
          className="icon-button carousel-arrow"
          type="button"
          aria-label="Ver próximas ferramentas"
          title="Próximas"
          disabled={!canScrollForward}
          onClick={() => scroll(1)}
        >
          <Icon name="chevronRight" />
        </button>
      </div>
      <div
        className="tool-scroller"
        role="group"
        aria-label="Ferramentas disponíveis. Use as setas para navegar."
        ref={scroller}
        onScroll={updateScrollState}
        onKeyDown={handleCarouselKey}
      >
        {toolCatalog.map((tool) => (
          <button
            className={`tool-card${tool.image ? ' has-image' : ''}`}
            key={tool.id}
            type="button"
            onClick={() => onOpen(tool.id)}
          >
            {tool.image ? (
              <img src={tool.image} alt="" />
            ) : (
              <span className="tool-card-art">
                <Icon name={tool.icon} size={34} />
              </span>
            )}
            <span className="tool-card-copy">
              <span className="tool-card-title">{tool.title}</span>
              <span className="tool-card-description">{tool.description}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
