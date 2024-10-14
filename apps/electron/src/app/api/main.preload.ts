import { contextBridge, ipcRenderer } from 'electron';
import { getRegisteredUsers, saveUserData, verifyUser} from './../dbCRUD/testUserCRUD';

console.log("preload imports finish\nelectron preload script start");

const electronAPI = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
  saveUserData: (event, username: string, password: string) => {
    ipcRenderer.invoke(
      'saveUserData',
      event,
      username,
      password
    )
  },
  verifyUser: ( username: string, password: string) => {
    ipcRenderer.invoke("verify-user", username, password )
      ;
  },
  getRegisteredUsers: () => {
    ipcRenderer.invoke('get-registered-users');
  }
};

contextBridge.exposeInMainWorld('electron', electronAPI);
console.log("electron preload script end");


