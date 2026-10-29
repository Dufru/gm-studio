function WorkspaceIllustration() {
  return (
    <div className="workspace-illustrations" aria-hidden="true">
      <div className="illustration-tile selected">
        <svg
          viewBox="0 0 120 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect
            x="24"
            y="17"
            width="66"
            height="72"
            rx="3"
            transform="rotate(-10 24 17)"
          />
          <rect x="35" y="13" width="66" height="74" rx="3" />
          <path d="M44 24h47v24H44zM44 56h20v19H44zM70 57h21M70 64h21M70 71h15m24-4 14 13-8 1-2 9-5-23Z" />
          <circle cx="94" cy="17" r="9" />
          <path d="M94 12v10M89 17h10" />
        </svg>
      </div>
      <div className="illustration-tile">
        <svg
          viewBox="0 0 120 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="16" y="13" width="82" height="67" rx="4" />
          <path d="M16 23h82M24 18h1m6 0h1m6 0h1M23 29h15v33H23zM45 30h43v22H45zM45 58h19v15H45zM69 58h19M69 64h19m-38-30 33 15m0-15L50 49m7 33-5 10m5-10 6 9m-6-9V66m0 16 7 6m-7-6-5 5" />
          <circle cx="99" cy="72" r="11" />
          <path d="m94 76 2-5 7-6 3 3-6 7-6 1Z" />
        </svg>
      </div>
    </div>
  );
}

export function WorkspaceIntro() {
  return (
    <article className="workspace-card">
      <h2>Crie seu próprio espaço</h2>
      <WorkspaceIllustration />
      <p>Organize as ferramentas e os painéis da sua mesa.</p>
    </article>
  );
}
