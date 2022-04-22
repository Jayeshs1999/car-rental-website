import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn:boolean
  constructor(private router:Router,private afAuth:AngularFireAuth) {
    this.userLoggedIn=false
    this.afAuth.onAuthStateChanged((user)=>{
    if(user){
      this.userLoggedIn=true
    }else{
      this.userLoggedIn=false
    }
    })
   }

   signUpUser(user:any): Promise<any> {
     return this.afAuth.createUserWithEmailAndPassword(user.email,user.password).then((result)=>{
       let emailLower=user.email.toLowerCase();
       console.log("Result inside signUpService :",result)
       console.log(result.user);
       result.user?.sendEmailVerification()
     }).catch((error)=>{
       console.log("auth service : signup error",error)
       if(error.code)
       return {isValid: false,message:error.message}
     })
   }

   loginUser(email:string,password:string): Promise<any>{
     return this.afAuth.signInWithEmailAndPassword(email,password).then(()=>{
       console.log("Auth service: login success")
     }).catch(error=>{
       console.log('auth service: login error...');
       console.log('error code', error.code)
       if(error.code)
       return {isValid: false,message:error.message}
     })
   }
}


