import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { checkLowerCaseLetterInPassword, checkMinLengthForPassword, checkNumericInPassword, checkSpecialCharacterInPassword, checkUpperCaseLetterInPassword } from '../event.service';
import { ProductsModule } from '../products/products.module';
import { ViewAllProductComponent } from '../products/view-all-product/view-all-product.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
hide=true
  loginForm:FormGroup;
  firebaseErrorMessage:string
  isLogIn:boolean
  constructor(private formBuilder: FormBuilder, private authService:AuthService,private afAuth:AngularFireAuth,private router:Router) { }

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
  onLogin(value:any) {
    if(this.loginForm.invalid)
    return;
    this.authService.loginUser(this.loginForm.value.email,this.loginForm.value.password).then((result:any)=>{
      if(result==null){
        console.log("Logging in...")
        alert("Congratulation !! Login Successfully")
        this.isLogIn=true
        this.router.navigate(["/products/products"])

      }
      else if(result.isValid==false){
        console.log('login error',result);
        this.firebaseErrorMessage=result.message
        alert("Invalid Email and password :( ")
        this.loginForm.reset()
      }
    })
    
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
