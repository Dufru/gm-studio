import { useEffect, useState } from 'react';
import './index.css';
import audioImage from './assets/card-audio.jpg';
import mindMapImage from './assets/card-mind-map.jpg';
import notesImage from './assets/card-notes.jpg';
import workspaceArt from './assets/workspace-art.png';
import { Icon, type IconName } from './components/icons/Icon';
import { translations, type Locale } from './i18n';

function WorkspaceIllustrations() {
  return (
    <div className="workspace-illustrations" aria-hidden="true">
      <div
        className="illustration-tile selected"
        style={{ backgroundImage: `url("${workspaceArt}")` }}
      />
      <div
        className="illustration-tile editor"
        style={{ backgroundImage: `url("${workspaceArt}")` }}
      />
    </div>
  );
}

function WorkspaceCard({
  title,
  description,
  onSelect,
}: {
  title: string;
  description: string;
  onSelect?: () => void;
}) {
  return (
    <button
      className="workspace-card"
      type="button"
      onClick={onSelect}
      aria-labelledby="workspace-card-title"
      aria-describedby="workspace-card-description"
    >
      <h2 id="workspace-card-title">{title}</h2>
      <WorkspaceIllustrations />
      <p id="workspace-card-description">{description}</p>
    </button>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale>('en');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const copy = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const sidebarGroups: {
    title: string;
    items: { label: string; icon: IconName; external?: boolean }[];
  }[] = [
    {
      title: copy.library,
      items: [
        { label: copy.sidebarItems[0][0], icon: 'panels' },
        { label: copy.sidebarItems[0][1], icon: 'grid' },
        { label: copy.sidebarItems[0][2], icon: 'trash' },
      ],
    },
    {
      title: copy.gmStudio,
      items: [
        { label: copy.sidebarItems[1][0], icon: 'info' },
        { label: copy.sidebarItems[1][1], icon: 'github', external: true },
        { label: copy.sidebarItems[1][2], icon: 'bell' },
        { label: copy.sidebarItems[1][3], icon: 'settings' },
      ],
    },
  ];

  const featuredTools = [
    { ...copy.tools[0], image: audioImage },
    { ...copy.tools[1], image: mindMapImage },
    { ...copy.tools[2], image: notesImage },
  ];

  return (
    <div className="app-layout">
      <header className="topbar">
        <div
          className="menu-bar"
          aria-label={copy.appMenu}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              setLanguageMenuOpen(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setLanguageMenuOpen(false);
          }}
        >
          {copy.menus.map((menu) => (
            <button
              className="menu-button"
              key={menu}
              type="button"
              onClick={() => setLanguageMenuOpen(false)}
            >
              {menu}
            </button>
          ))}
          <div className="language-control">
            <button
              className="menu-button language-button"
              type="button"
              aria-haspopup="true"
              aria-expanded={languageMenuOpen}
              onClick={() => setLanguageMenuOpen((open) => !open)}
            >
              {copy.language}
              <span aria-hidden="true" className="menu-chevron">
                ▾
              </span>
            </button>
            {languageMenuOpen && (
              <div
                className="language-menu"
                role="group"
                aria-label={copy.languageMenu}
              >
                {(['en', 'pt-BR'] as const).map((option) => (
                  <button
                    className="language-option"
                    key={option}
                    type="button"
                    aria-pressed={locale === option}
                    onClick={() => {
                      setLocale(option);
                      setLanguageMenuOpen(false);
                    }}
                  >
                    {copy.languageNames[option]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar" aria-label={copy.sidebarLabel}>
          <div className="project-actions">
            <button className="new-project-button" type="button">
              {copy.sidebarActions[0]}
            </button>
            <button className="open-project-link" type="button">
              {copy.sidebarActions[1]}
            </button>
          </div>

          <nav className="sidebar-navigation" aria-label={copy.resources}>
            {sidebarGroups.map((group) => (
              <section className="sidebar-group" key={group.title}>
                <h2>{group.title}</h2>
                {group.items.map((item) => (
                  <button
                    className="sidebar-item"
                    key={item.label}
                    type="button"
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                    {item.external && (
                      <Icon
                        className="external-link-icon"
                        name="externalLink"
                        size={14}
                      />
                    )}
                  </button>
                ))}
              </section>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          <div className="dashboard">
            <header className="welcome-heading">
              <h1>{copy.welcome}</h1>
            </header>

            <section
              className="dashboard-feature-row"
              aria-label={copy.featuredTools}
            >
              <WorkspaceCard
                title={copy.workspaceTitle}
                description={copy.workspaceDescription}
              />

              {featuredTools.map((tool) => (
                <button className="tool-card" key={tool.title} type="button">
                  <img src={tool.image} alt="" />
                  <span className="tool-card-copy">
                    <span className="tool-card-title">{tool.title}</span>
                    <span className="tool-card-description">
                      {tool.description}
                    </span>
                  </span>
                </button>
              ))}
            </section>

            <section className="recent-projects" aria-labelledby="recent-title">
              <h2 id="recent-title">{copy.recentProjects}</h2>
              <div className="empty-state">
                <h3>{copy.emptyTitle}</h3>
                <p>{copy.emptyDescription}</p>
                <button className="new-project-button" type="button">
                  {copy.createAdventure}
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
