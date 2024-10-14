import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ElectronInterProcessCommunicationService } from './services/electron-inter-process-communication.service';
// import { NxWelcomeComponent } from './nx-welcome.component';
    // NxWelcomeComponent,

@Component({
  standalone: true,
  imports: [
    RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  constructor(
    electronIPC: ElectronInterProcessCommunicationService
  ) {

    // const userLoginResult = electronIPC.sendUserLoginData(
    //   "testUser",
    //   "testPassword"
    // );

    // userLoginResult.then(
    //   (resolve) => {
    //     console.log(resolve);
    //     this.isUserLoginSuccess = resolve;
    //   }
    // ).catch((reject) => {
    //   console.log(reject);
    //   this.isUserLoginSuccess = "failure!!!"
    //  });
    // this.window.electronAPI.saveUserData('test user', 'test password');

    electronIPC.sendUserLoginData("test","test");


  }
    // window.testApi();

    // this.window.electronAPI.saveUserData('test user', 'test password');

  isUserLoginSuccess:any ="fuck it" ;
  title = 'renderer';
}
