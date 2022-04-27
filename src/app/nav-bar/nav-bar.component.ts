import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userNotLogin=true
  userLogin=false
  
  constructor(private afAuth:AngularFireAuth,private router:Router,private authService:AuthService) {
}

  ngOnInit(): void {
    
    this.afAuth.onAuthStateChanged((user)=>{
      
        if(user){
          this.userNotLogin=false
          this.userLogin=true
        }
     
    })
  }
  logOut(){
    this.userNotLogin=true
    this.userLogin=false
    this.afAuth.signOut();
    
    this.router.navigate(['/login'])
  }

}


