import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkLowerCaseLetterInPassword, checkMinLengthForPassword, checkNumericInPassword, checkSpecialCharacterInPassword, checkUpperCaseLetterInPassword } from '../event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
hide=true
  loginForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.loginForm=this.formBuilder.group({
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
  onLogin(value:any){

    console.log(value)
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  getErrorMessageForEmail(){
    if(this.loginForm.get('email')?.hasError('email')){
      return "Not a valid email"
    }
    return this.loginForm.get('email')?.hasError('required')?'Email is required':'';
  }

}
