import { Injectable, OnInit } from '@angular/core';
// import { Window } from './../../types';
// interface Window {
//   electronAPI: {
//     runQuery: (query: string, params: any[]) => Promise<any>;
//   };
// }

@Injectable({
  providedIn: 'root'
})
export class ElectronInterProcessCommunicationService {


  // window.electronAPI.


  // Check if the app is running in Electron environment
  // isElectron(): boolean {
  //   return !!( window && window['electronAPI'] );
  // }

  sendUserLoginData(
      username: string,
      password: string
    ): void {

      // return window['electronAPI'].runQuery(query, params);
    //   return window.userLoginDataSubmission
    //     .sendUserLoginData(
    //       username,
    //
    //     );


    window.electron.saveUserData('test user', 'test password')
      .then(
        (resolve) => {
          console.log("is resolved, resolve value is " + resolve)
        }
      ).
      catch(
        (error) => {console.log(error) }
      );


    // return Promise.reject('Not running in Electron environment');

  }
}
