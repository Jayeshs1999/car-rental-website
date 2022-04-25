import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userNotLogin=true
  userLogin=false
  constructor(private afauth:AngularFireAuth) { }

  ngOnInit(): void {
    // this.afauth.onAuthStateChanged((user)=>{
    //   if(user){
    //     this.userNotLogin=false
    //     this.userLogin=true
    //   }
    // })
  }

  // logOut(){
  //   this.userNotLogin=true
  //   this.userLogin=false
  //   this.afauth.signOut();
    
  // }

}
