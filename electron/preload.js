const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectFiles: () => ipcRenderer.invoke('select-files'),
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  selectOutputFolder: () => ipcRenderer.invoke('select-output-folder'),
  processPDF: (filePath, options) => ipcRenderer.invoke('process-pdf', { filePath, options }),
  readOutputFile: (filePath) => ipcRenderer.invoke('read-output-file', filePath),
  onProgress: (callback) => ipcRenderer.on('ocr-progress', (event, data) => callback(data))
});
