export interface GMStudioDesktopApi {
  openProjectRepository: () => Promise<void>;
}

declare global {
  interface Window {
    gmStudio: GMStudioDesktopApi;
  }
}
