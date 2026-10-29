import type { KeyboardEvent } from 'react';
import { Icon } from '../icons/Icon';
import type { WorkspaceTab } from '../../types/navigation';

interface WorkspaceTabsProps {
  tabs: WorkspaceTab[];
  activeTabId: string;
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
}

export function WorkspaceTabs({
  tabs,
  activeTabId,
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  onSelectTab,
  onCloseTab,
}: WorkspaceTabsProps) {
  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId);
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight')
      nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === 'ArrowLeft')
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    onSelectTab(nextTab.id);
    window.requestAnimationFrame(() =>
      document.getElementById(`tab-${nextTab.id}`)?.focus(),
    );
  };

  return (
    <div className="workspace-tabbar">
      <div
        className="history-controls"
        role="group"
        aria-label="Histórico de navegação"
      >
        <button
          type="button"
          aria-label="Voltar"
          title="Voltar"
          disabled={!canGoBack}
          onClick={onBack}
        >
          <Icon name="chevronLeft" />
        </button>
        <button
          type="button"
          aria-label="Avançar"
          title="Avançar"
          disabled={!canGoForward}
          onClick={onForward}
        >
          <Icon name="chevronRight" />
        </button>
      </div>
      <div
        className="tab-strip"
        role="tablist"
        aria-label="Páginas abertas"
        onKeyDown={onTabKeyDown}
      >
        {tabs.map((tab) => {
          const active = tab.id === activeTabId;
          return (
            <div
              className={`workspace-tab${active ? ' active' : ''}`}
              key={tab.id}
              role="presentation"
            >
              <button
                className="workspace-tab-select"
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={active}
                aria-controls="workspace-content"
                onClick={() => onSelectTab(tab.id)}
                title={tab.title}
              >
                <span>{tab.title}</span>
              </button>
              {tab.closable && (
                <button
                  className="workspace-tab-close"
                  type="button"
                  aria-label={`Fechar ${tab.title}`}
                  title={`Fechar ${tab.title}`}
                  onClick={() => onCloseTab(tab.id)}
                >
                  <Icon name="close" size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
