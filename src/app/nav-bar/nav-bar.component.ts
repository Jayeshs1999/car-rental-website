import { ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SsmlBreakStrength } from 'twilio/lib/twiml/VoiceResponse';
import { AuthService } from '../auth.service';
import { checkLowerCaseLetterInPassword } from '../event.service';
import { AddProductComponent } from '../products/add-product/add-product.component';
import { ProductService } from '../products/product.service';
import { DialogForDeleteComponent } from './dialog-for-delete/dialog-for-delete.component';

export interface DialogData {
  userNotLogin:boolean
  userLogin:boolean
  firstname:string
  isShowing:boolean
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

userNotLogin=true
userLogin=false
 cartItemLenght:any
 lenght=0
 email:any
 firstname:any
 lastname:any
 hidden = false;
 isShowing:boolean
 url=localStorage.getItem("url");

 toggleSidenav(){
   this.isShowing=!this.isShowing;
   console.log(this.isShowing)
 }
 callMethods(){
   this.toggleSidenav()
 }


 toggleBadgeVisibility() {
   this.hidden = true;
  
 }
 

 notifierSubscription: Subscription = this.productService.eventEmitterNotifier.subscribe(notified => {
  // originator has notified me. refresh my data here.
  console.log(notified)
  this.lenght=this.lenght+1
  console.log("lenght :",this.lenght)
  this.hidden = false;
});

notifierSubscriptionForDelete: Subscription = this.productService.subjectNotifier.subscribe(notified => {
  // originator has notified me. refresh my data here.
  this.lenght=this.lenght-1
  console.log("lenght :",this.lenght)
});

notifierSubscriptionForLoginAndCartVisibility: Subscription = this.authService.subjectNotifier.subscribe(notified => {
  // originator has notified me. refresh my data here.
  this.userNotLogin=true
  this.userLogin=false
  this.isShowing=false
 
});


  constructor(private afAuth:AngularFireAuth,private router:Router,private authService:AuthService,
    public dialog: MatDialog,
    private productService:ProductService
     )  {
      
}

onSelectFile(event:any) { // called each time file input changes
  if (event.target.files && event.target.files[0]) {
    console.log("even.target.files :", event.target.files)
    console.log("even.target.files[0] :", event.target.files[0])
    var reader = new FileReader();
    console.log("reader :",reader)

    console.log(reader.readAsDataURL(event.target.files[0])); // read file as data url

    reader.onload = (event :any) => { // called once readAsDataURL is completed
      console.log("event :",event)
      this.url = event.target.result;
      console.log("url :",this.url)
      localStorage.setItem("url",`${this.url}`)
    }
  }
}

linkClicked(){
  this.isShowing=false
}
  ngOnInit(): void {

    this.hidden = false;
      this.afAuth.onAuthStateChanged((user)=>{
        
          this.email=user?.email
          console.log("user data",user)
          this.firstname=localStorage.getItem("firstname")
          this.lastname=localStorage.getItem("lastname")
          console.log("Firstname :",this.firstname)

          if(user)
          {
            this.userNotLogin=false
            this.userLogin=true 
          }
      })


    this.productService.viewAllCartItems().subscribe(data=>{
      this.cartItemLenght=data
      for (let value of this.cartItemLenght){
        this.lenght=this.lenght+1
        console.log(this.lenght)
      }
        console.log("data:",data) 
    })
  }
  
  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
    this.notifierSubscriptionForDelete.unsubscribe();
  }

  logOut(){
    this.userNotLogin=true
    this.userLogin=false
    this.isShowing=false
    // this.afAuth.signOut();
    // this.router.navigate(['/login'])
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogForDeleteComponent, {
     width:"400px",
      data: { firstname:this.firstname, userNotLogin:this.userNotLogin,userLogin:this.userLogin , isShowing:this.isShowing},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  } 
}






