import { useCallback, useMemo, useState } from 'react';
import { toolCatalog } from '../../features/dashboard/toolCatalog';
import type { PageId, PageTab, WorkspaceTab } from '../../types/navigation';
import { campaignTab } from '../../types/navigation';
import type { CampaignProject } from '../../types/project';
import { pageRegistry } from '../../features/pages/pageRegistry';

interface NavigationState {
  tabs: WorkspaceTab[];
  activeId: string;
  backStack: string[];
  forwardStack: string[];
}

function pageTab(pageId: PageId): PageTab {
  const tool = toolCatalog.find((item) => item.id === pageId);
  const page = pageRegistry[pageId];
  return {
    id: `page:${pageId}`,
    pageId,
    title: tool?.title ?? page.title,
    closable: pageId !== 'dashboard',
  };
}

const initialTab = { ...pageTab('dashboard'), closable: false };

export function useWorkspaceNavigation(projects: CampaignProject[]) {
  const [state, setState] = useState<NavigationState>({
    tabs: [initialTab],
    activeId: initialTab.id,
    backStack: [],
    forwardStack: [],
  });

  const activate = useCallback((tab: WorkspaceTab) => {
    setState((current) => {
      if (current.activeId === tab.id) return current;
      const exists = current.tabs.some((item) => item.id === tab.id);
      return {
        ...current,
        tabs: exists
          ? current.tabs.map((item) => (item.id === tab.id ? tab : item))
          : [...current.tabs, tab],
        activeId: tab.id,
        backStack: [...current.backStack, current.activeId],
        forwardStack: [],
      };
    });
  }, []);

  const navigate = useCallback(
    (pageId: PageId) => activate(pageTab(pageId)),
    [activate],
  );

  const openProject = useCallback(
    (project: CampaignProject) => activate(campaignTab(project)),
    [activate],
  );

  const selectTab = useCallback((tabId: string) => {
    setState((current) => {
      if (
        current.activeId === tabId ||
        !current.tabs.some((tab) => tab.id === tabId)
      )
        return current;
      return {
        ...current,
        activeId: tabId,
        backStack: [...current.backStack, current.activeId],
        forwardStack: [],
      };
    });
  }, []);

  const closeTab = useCallback((tabId: string) => {
    setState((current) => {
      const index = current.tabs.findIndex((tab) => tab.id === tabId);
      if (index < 0 || !current.tabs[index].closable) return current;
      const tabs = current.tabs.filter((tab) => tab.id !== tabId);
      const wasActive = current.activeId === tabId;
      const replacement = tabs[Math.max(0, index - 1)] ?? tabs[0];
      const validIds = new Set(tabs.map((tab) => tab.id));
      return {
        ...current,
        tabs,
        activeId: wasActive && replacement ? replacement.id : current.activeId,
        backStack: current.backStack.filter(
          (id) =>
            validIds.has(id) &&
            !(wasActive && replacement && id === replacement.id),
        ),
        forwardStack: wasActive
          ? []
          : current.forwardStack.filter((id) => validIds.has(id)),
      };
    });
  }, []);

  const back = useCallback(
    () =>
      setState((current) => {
        const target = [...current.backStack]
          .reverse()
          .find((id) => current.tabs.some((tab) => tab.id === id));
        if (!target) return current;
        return {
          ...current,
          activeId: target,
          backStack: current.backStack.slice(
            0,
            current.backStack.lastIndexOf(target),
          ),
          forwardStack: [...current.forwardStack, current.activeId],
        };
      }),
    [],
  );

  const forward = useCallback(
    () =>
      setState((current) => {
        const target = [...current.forwardStack]
          .reverse()
          .find((id) => current.tabs.some((tab) => tab.id === id));
        if (!target) return current;
        return {
          ...current,
          activeId: target,
          forwardStack: current.forwardStack.slice(
            0,
            current.forwardStack.lastIndexOf(target),
          ),
          backStack: [...current.backStack, current.activeId],
        };
      }),
    [],
  );

  const tabs = useMemo(
    () =>
      state.tabs.map((tab) => {
        if (!tab.projectId) return tab;
        const project = projects.find((item) => item.id === tab.projectId);
        return project ? campaignTab(project) : tab;
      }),
    [projects, state.tabs],
  );

  return {
    tabs,
    activeTab: tabs.find((tab) => tab.id === state.activeId) ?? tabs[0],
    canGoBack: state.backStack.some((id) =>
      state.tabs.some((tab) => tab.id === id),
    ),
    canGoForward: state.forwardStack.some((id) =>
      state.tabs.some((tab) => tab.id === id),
    ),
    navigate,
    openProject,
    selectTab,
    closeTab,
    back,
    forward,
  };
}
