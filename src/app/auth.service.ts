import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean
  fromSignin = false
  isSignIn = false



  subjectNotifier: Subject<null> = new Subject<null>();
  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.userLoggedIn = false
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true
      } else {
        this.userLoggedIn = false
      }
    })
  }
  notifyAboutChange() {
    this.subjectNotifier.next(null);
  }

  signUpUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then((result) => {
      let emailLower = user.email.toLowerCase();

      localStorage.setItem("firstname", user.firstname)
      localStorage.setItem("lastname", user.lastname)
      console.log("Result inside signUpService :", result)
      console.log(result.user);
      result.user?.sendEmailVerification()
      this.fromSignin = true
    }).catch((error) => {
      console.log("auth service : signup error", error)
      if (error.code)
        return { isValid: false, message: error.message }
    })


  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((data) => {
      console.log("Auth service: login success")
      console.log("Result inside signInService :", data)


    }).catch(error => {
      console.log('auth service: login error...');
      console.log('error code', error.code)
      if (error.code)
        return { isValid: false, message: error.message }
    })
  }
}


