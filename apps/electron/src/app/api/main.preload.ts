import { contextBridge, ipcRenderer } from 'electron';

console.log("preload imports finish\nelectron preload script start");

const electronAPI = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
  saveUserData: (event,username:string, password:string) => ipcRenderer.invoke('saveUserData',event,username, password)
};

contextBridge.exposeInMainWorld('electron', electronAPI);
console.log("electron preload script end");


