import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { ProductService } from 'src/app/products/product.service';
import { Category } from '../category';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categoryList:Category;
  data:any;
  showSideBar=false

  notifierSubscription: Subscription = this.authService.subjectNotifier.subscribe(notified => {
    // originator has notified me. refresh my data here.
    // this.showSideBar=true;
   

  });
  
  constructor(private productService:ProductService,private router:Router,private afauth:AngularFireAuth,private authService:AuthService) {
   
   }

  ngOnInit(): void {

   

    this.afauth.onAuthStateChanged((user)=>{
      if(user){
        this.showSideBar=true;
      }else{
        this.showSideBar=false
      }
    })

    this.productService.getCategory().subscribe(data=>{
      this.categoryList=data
      console.log(this.categoryList)  
      
      this.data=data
      console.log("this :",this.data)
     
    })
  }
}
