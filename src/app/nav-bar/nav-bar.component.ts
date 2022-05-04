import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ProductService } from '../products/product.service';

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


 notifierSubscription: Subscription = this.productService.eventEmitterNotifier.subscribe(notified => {
  // originator has notified me. refresh my data here.
  console.log(notified)
  this.lenght=this.lenght+1
  console.log("lenght :",this.lenght)
});

notifierSubscriptionForDelete: Subscription = this.productService.subjectNotifier.subscribe(notified => {
  // originator has notified me. refresh my data here.
  this.lenght=this.lenght-1
  console.log("lenght :",this.lenght)
});

notifierSubscriptionForLoginAndCartVisibility: Subscription = this.authService.subjectNotifier.subscribe(notified => {
  // originator has notified me. refresh my data here.
  // this.userNotLogin=false
  //  this.userLogin=true 
 
});

  constructor(private afAuth:AngularFireAuth,private router:Router,private authService:AuthService,
    private productService:ProductService )  {
}

  ngOnInit(): void {
  
      this.afAuth.onAuthStateChanged((user)=>{
        this.email=user?.email
          console.log("user data",user)
          this.firstname=localStorage.getItem("firstname")
          this.lastname=localStorage.getItem("lastname")
          console.log("Firstname :",this.firstname)
          if(user){
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
    this.afAuth.signOut();
  
    this.router.navigate(['/login'])
  }
}