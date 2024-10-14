import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { UserCredentials } from './../DataTransactionObjects';  // Import your interface here

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {

  private userSubject: BehaviorSubject<UserCredentials | null>;
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor() {
    this.userSubject = new BehaviorSubject<UserCredentials | null>(null);
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
  }

  // Log in a user by interacting with Electron's IPC and store credentials
  async login(userName: string, password: string): Promise<boolean> {

    const result = await (window as any).electron.verifyUser(userName, password);
    console.log("login result is " + result + " Credential is username: " + userName + " , Password: " + password)

    // result.then(
    //   (res:any) => {

    //     const user: UserCredentials = result.user;
    //     this.userSubject.next(user);
    //     this.isLoggedInSubject.next(true);

    //     console.log("Succesful log in : resolution = "+ res);
    //     return true;
    //   }
    // ).catch(
    //   (err:any) => {

    //     result.sucess = false;
    //   }
    // );
    if (result) {

      const user: UserCredentials = result.user;
      this.userSubject.next(user);
      this.isLoggedInSubject.next(true);

      console.log("Succesful log in");
      return true;

    } else {

      return false;
    }
  }

  // Log out user and clear data
  logout(): void {
    this.userSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  // Register a user through Electron's IPC API
  async register(user: UserCredentials): Promise<boolean> {
    const result = await (window as any).electron.registerUser(user);

    return result.success;
  }


  // Get all registered usernames
  async getRegisteredUsers(): Promise<string[]> {
    return await (window as any).electron.getRegisteredUsers();
  }

  // Observable to get the current user data
  getUser(): Observable<UserCredentials | null> {
    return this.userSubject.asObservable();
  }

  // Check if the user is logged in
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
