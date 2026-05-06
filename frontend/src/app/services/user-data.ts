import { Injectable } from '@angular/core';
import { AuthenticationService } from './Authenticatiuon.Service';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public auth: AuthenticationService
  ) { }



  afterLogin = (httpData) => {

   
    if (httpData.status === 'error' || httpData.code)
     {
      return httpData.message || httpData.sqlMessage || 'Login failed';
    } 
    else if (httpData[0] && httpData[0].length > 0) 
    { 
        
      var id=httpData[0];
      console.log(id)
      debugger;
      localStorage.setItem('Access_Token',httpData.token);
      localStorage.setItem('Login_User',id[0].User_Details_Id);
      localStorage.setItem('uname',id[0].User_Details_Name);
      localStorage.setItem('User_Type',id[0].User_Type);
      localStorage.setItem('User_Type_Id',id[0].User_Type_Id);
      debugger;
      // localStorage.setItem('Employee_Id',id[0].Employee_Id);
      // localStorage.setItem('Employee_Name',id[0].Employee_Name);
      this.setToken(httpData.access_token);
      return true;
    }
    else
    {
      return httpData.message || 'Invalid username or password';
    }
  }
  login(loginData): Promise<any> {

    return this.auth.Login(loginData).then(this.afterLogin);
  }
  isLoggedIn(): boolean {
    return (localStorage.getItem('Access_Token') ? true : false);
  }

  // signup(signupData): Promise<any> {
  //   // return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
  //   //   this.setUsername(username);
  //   //   return this.events.publish('user:signup');
  //   // });
  //   return this.auth.signup(signupData).then(httpData => {
  //     return httpData;
  //   });
  // }

  
  logout() {
    localStorage.clear();
  }
  setToken(username: string) {
    return localStorage.setItem('token', username);
  }
  getToken(): Promise<any> {
    return localStorage.get('token');
  }



}
