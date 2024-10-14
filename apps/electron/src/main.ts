import SquirrelEvents from './app/events/squirrel.events';
import ElectronEvents from './app/events/electron.events';

import UpdateEvents from './app/events/update.events';
// import {saveUserData } from './app/dbCRUD/testUserCRUD.js'

import { saveUserData }  from  './app/dbCRUD/testUserCRUD';

import { app, BrowserWindow } from 'electron';

import App from './app/app';

import { ipcMain } from 'electron';

export default class Main {
  static initialize() {
    if (SquirrelEvents.handleEvents()) {
      // squirrel event handled (except first run event) and app will exit in 1000ms, so don't do anything else
      app.quit();
    }
  }

  static bootstrapApp() {
    App.main(app, BrowserWindow);
  }

  static bootstrapAppEvents() {
    ElectronEvents.bootstrapElectronEvents();

    // initialize auto updater service
    if (!App.isDevelopmentMode()) {
      // UpdateEvents.initAutoUpdateService();
    }
  }
}

// handle setup events as quickly as possible
Main.initialize();

// bootstrap app
Main.bootstrapApp();
Main.bootstrapAppEvents();

// App Electron and App Angular Data Interchange
ipcMain.handle(
  'userLoginDataSubmission',
  async (
    event,
    username,
    password
  ) => {
    return new Promise(
      (resolve,reject) => {


          console.log(username, password, event);

        if (username != "" && password != "") {

          console.log("working data from promise")
          resolve({status:"success mother fucker"});

        } else {
          console.log("Not working")
          reject("nu ughhh, not working")
        }
      }
    );
  }
);

