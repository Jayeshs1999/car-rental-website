import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { checkMinLengthForPassword, checkUpperCaseLetterInPassword, checkLowerCaseLetterInPassword, checkNumericInPassword, checkSpecialCharacterInPassword } from '../event.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
hide=true
firebaseErrorMsg:string
  registerForm:FormGroup
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router, private afAuth: AngularFireAuth) { 
    this.firebaseErrorMsg=''
  }


  ngOnInit(): void {

    this.registerForm=this.formBuilder.group({
      firstname:['',[Validators.required]],
      lastname:['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
        password:['',  [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
          checkMinLengthForPassword(),
          checkUpperCaseLetterInPassword(),
          checkLowerCaseLetterInPassword(),
          checkNumericInPassword(),
          checkSpecialCharacterInPassword(),
        ]]
    })
  }
  get password() {
    return this.registerForm.controls['password'];
  }

  getErrorMessageForEmail(){
    if(this.registerForm.get('email')?.hasError('email')){
      return "Not a valid email"
    }
    return this.registerForm.get('email')?.hasError('required')?'Email is required':'';
  }

  onRegister(value:any){
    if(this.registerForm.invalid)
      console.log("error")

    this.authService.signUpUser(this.registerForm.value).then((result:any)=>{
      if(result==null){
        console.log("Result inside onRegister Button : ",result)
        // this.router.navigate(['/login'])
      }
      else if(result.isValid==false){
        this.firebaseErrorMsg=result.message
      console.log("errors")
      }
    }).catch((error:any)=>{
console.log("error")
    })
  }

 
}
