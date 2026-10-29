import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Icon } from '../icons/Icon';
import type { CampaignProject, CreateCampaignInput } from '../../types/project';

interface ProjectDialogProps {
  mode: 'create' | 'open';
  projects: CampaignProject[];
  loadingProjects: boolean;
  projectLoadError: string | null;
  onClose: () => void;
  onRequestCreate: () => void;
  onRetryProjects: () => void;
  onCreate: (input: CreateCampaignInput) => Promise<void>;
  onOpen: (project: CampaignProject) => Promise<void>;
}

export function ProjectDialog({
  mode,
  projects,
  loadingProjects,
  projectLoadError,
  onClose,
  onRequestCreate,
  onRetryProjects,
  onCreate,
  onOpen,
}: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    dialogRef.current?.showModal();
    return () => dialogRef.current?.close();
  }, []);

  useEffect(() => {
    if (mode === 'create') {
      window.requestAnimationFrame(() => nameInputRef.current?.focus());
    }
  }, [mode]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const campaignName = name.trim();
    if (!campaignName) {
      setError('Digite um nome para a campanha.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await onCreate({ name: campaignName, description: description.trim() });
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Não foi possível criar a campanha.',
      );
    } finally {
      setBusy(false);
    }
  };

  const openProject = async (project: CampaignProject) => {
    setBusy(true);
    setError('');
    try {
      await onOpen(project);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Não foi possível abrir a campanha.',
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <dialog
      className="project-dialog"
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      <div className="dialog-heading">
        <div>
          <span className="eyebrow">GM STUDIO</span>
          <h2 id="project-dialog-title">
            {mode === 'create' ? 'Nova campanha' : 'Abrir campanha'}
          </h2>
        </div>
        <button
          className="icon-button dialog-close"
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          disabled={busy}
        >
          <Icon name="close" />
        </button>
      </div>

      {mode === 'create' ? (
        <form onSubmit={submit}>
          <label className="form-field">
            Nome da campanha
            <input
              ref={nameInputRef}
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
              placeholder="Ex.: As Crônicas da Lua Rubra"
              required
            />
          </label>
          <label className="form-field">
            Descrição <span className="optional-label">opcional</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={2000}
              rows={3}
              placeholder="Uma breve ideia para sua aventura"
            />
          </label>
          <p className="storage-note">
            <Icon name="check" size={16} /> Salva localmente neste computador.
          </p>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <div className="dialog-actions">
            <button
              className="text-button"
              type="button"
              onClick={onClose}
              disabled={busy}
            >
              Cancelar
            </button>
            <button
              className="new-project-button"
              type="submit"
              disabled={busy || !name.trim()}
            >
              {busy ? 'Criando…' : 'Criar campanha'}
            </button>
          </div>
        </form>
      ) : (
        <div className="open-project-list">
          {loadingProjects ? (
            <div className="dialog-loading" role="status">
              <span className="loading-dot" />
              Carregando campanhas salvas…
            </div>
          ) : projectLoadError ? (
            <div className="dialog-error" role="alert">
              <Icon name="info" />
              <p>{projectLoadError}</p>
              <button
                className="text-button"
                type="button"
                onClick={onRetryProjects}
              >
                Tentar novamente
              </button>
            </div>
          ) : projects.length ? (
            <>
              <p className="dialog-description">
                Escolha uma campanha salva neste computador.
              </p>
              <div className="dialog-projects">
                {projects.map((project) => (
                  <button
                    className="dialog-project-row"
                    type="button"
                    key={project.id}
                    onClick={() => void openProject(project)}
                    disabled={busy}
                  >
                    <span className="project-mark">
                      <Icon name="folderOpen" size={18} />
                    </span>
                    <span className="dialog-project-copy">
                      <strong>{project.name}</strong>
                      <small>
                        {project.description || 'Campanha do GM Studio'}
                      </small>
                    </span>
                    <Icon name="chevronRight" size={17} />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="dialog-empty">
              <span className="empty-icon">
                <Icon name="folderOpen" size={22} />
              </span>
              <h3>Nenhuma campanha salva ainda</h3>
              <p>
                Crie sua primeira campanha e ela ficará disponível aqui para
                abrir.
              </p>
              <button
                className="new-project-button"
                type="button"
                onClick={onRequestCreate}
              >
                Criar campanha
              </button>
            </div>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <div className="dialog-actions">
            <button
              className="text-button"
              type="button"
              onClick={onClose}
              disabled={busy}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
