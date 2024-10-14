/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { app, ipcMain } from 'electron';
import { environment } from '../../environments/environment';
import { getRegisteredUsers, saveUserData, verifyUser} from './../dbCRUD/testUserCRUD';


export default class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

// Retrieve app version
ipcMain.handle(
  'get-app-version', (event) => {
  console.log(`Fetching application version... [v${environment.version}]`);

  return environment.version;
});

// Handle App termination
ipcMain.on('quit', (event, code) => {
  app.exit(code);
});

ipcMain.handle('get-registered-users',getRegisteredUsers)
ipcMain.handle('verify-user',
  (username, password) => {
    verifyUser(username, password)
  })

// ipcMain.handle(
//   'saveUserData',
//   ( event,username,password ) => {
//     console.log("success trigger but no data received if there is data it would be presented", event,username,password);
//     return true;
//     // saveUserData();
//   }
// )
