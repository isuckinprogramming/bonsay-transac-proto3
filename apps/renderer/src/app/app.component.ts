import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ElectronInterProcessCommunicationService } from './services/electron-inter-process-communication.service';
// import { NxWelcomeComponent } from './nx-welcome.component';
    // NxWelcomeComponent,

@Component({
  standalone: true,
  imports: [
    RouterModule,
    LoginComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  constructor(
    electronIPC: ElectronInterProcessCommunicationService
  ) {



    // electronIPC.sendUserLoginData("test","test");
  }

  isUserLoginSuccess:any ="fuck it" ;
  title = 'bonsay transac proto 3';
}
