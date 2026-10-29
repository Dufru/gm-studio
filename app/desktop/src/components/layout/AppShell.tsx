import type { ReactNode } from 'react';
import type { PageId, WorkspaceTab } from '../../types/navigation';
import { Sidebar } from '../sidebar/Sidebar';
import { TopBar } from './TopBar';
import { WorkspaceTabs } from './WorkspaceTabs';

interface AppShellProps {
  children: ReactNode;
  activeTab: WorkspaceTab;
  tabs: WorkspaceTab[];
  canGoBack: boolean;
  canGoForward: boolean;
  onNavigate: (pageId: PageId) => void;
  onNewProject: () => void;
  onOpenProject: () => void;
  onBack: () => void;
  onForward: () => void;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
}

export function AppShell(props: AppShellProps) {
  return (
    <div className="app-layout">
      <TopBar />
      <div className="app-body">
        <Sidebar
          activePageId={props.activeTab.pageId}
          onNavigate={props.onNavigate}
          onNewProject={props.onNewProject}
          onOpenProject={props.onOpenProject}
        />
        <section className="workspace-area" aria-label="Área de trabalho">
          <WorkspaceTabs
            tabs={props.tabs}
            activeTabId={props.activeTab.id}
            canGoBack={props.canGoBack}
            canGoForward={props.canGoForward}
            onBack={props.onBack}
            onForward={props.onForward}
            onSelectTab={props.onSelectTab}
            onCloseTab={props.onCloseTab}
          />
          <main
            className="main-content"
            id="workspace-content"
            role="tabpanel"
            aria-labelledby={`tab-${props.activeTab.id}`}
            key={props.activeTab.id}
          >
            {props.children}
          </main>
        </section>
      </div>
    </div>
  );
}
