import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userNotLogin=true
  userLogin=false
  constructor(private afauth:AngularFireAuth) { }

  ngOnInit(): void {
    this.afauth.onAuthStateChanged((user)=>{
      if(user){
        this.userNotLogin=false
        this.userLogin=true
      }
    })
  }

  logOut(){
    this.userNotLogin=true
    this.userLogin=false
    this.afauth.signOut();
    
  }

}
