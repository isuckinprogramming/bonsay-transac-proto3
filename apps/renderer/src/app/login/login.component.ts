import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import { UserStatusService } from '../services/user-status-service.service';
// import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone:true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,NgClass,NgIf

  ]
})
export class LoginComponent
  // implements OnInit
{
  loginForm: FormGroup;
  loginError: string | null = null; // To hold the error message
  isUsernameValid = true;
  registeredUsers = ["test user1","test user2","testAdminUserVer2"];
  constructor(
    private fb: FormBuilder,
    private userStatusService: UserStatusService
  ) {
    // Create the reactive form
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  // Should fetch data about existing user names here
  // ngOnInit(): void {}

  // Method to handle login
  onLogin() {

    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;


    if (!this.registeredUsers.includes(username)) {

      this.isUsernameValid = false;
      this.loginError = 'User does not exist.';
      return;

    }
    this.isUsernameValid = true;
    this.loginError = null;

    const logInResult = this.userStatusService.login(username, password);

    logInResult.then(
      (resolve) => {

        // userStatusService.us
        // console.log(
        //   'Login successful',
        //   { username, password },
        //   "Login return ", resolve
        // );
      }
    );

    logInResult.catch((err) => {
      // console.log(err)
    });

  }
}
