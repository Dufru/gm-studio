export interface GMStudioDesktopApi {
  openProjectRepository: () => Promise<void>;
  mainWindowReady: () => void;
}

declare global {
  interface Window {
    gmStudio: GMStudioDesktopApi;
  }
}
