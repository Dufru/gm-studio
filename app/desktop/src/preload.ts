import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('gmStudio', {
  openProjectRepository: () =>
    ipcRenderer.invoke('app:open-project-repository'),
});
