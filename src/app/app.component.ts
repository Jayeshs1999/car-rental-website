import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { DialogForDeleteComponent } from './nav-bar/dialog-for-delete/dialog-for-delete.component';
import { ProductService } from './products/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userNotLogin = true
  userLogin = false
  cartItemLenght: any
  lenght = 0
  email: any
  firstname: any
  lastname: any
  hidden = false;
  isShowing: boolean
  url = localStorage.getItem("url");

  notifierSubscription: Subscription = this.authService.eventEmitterNotifier.subscribe(notified => {
    // originator has notified me. refresh my data here.
    this.isShowing=!this.isShowing
  });
  


  constructor(private afAuth: AngularFireAuth, private router: Router, private authService: AuthService,
    public dialog: MatDialog,
    private productService: ProductService
  ) {
  }

  onSelectFile(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      console.log("even.target.files :", event.target.files)
      console.log("even.target.files[0] :", event.target.files[0])
      var reader = new FileReader();
      console.log("reader :", reader)

      console.log(reader.readAsDataURL(event.target.files[0])); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        console.log("event :", event)
        this.url = event.target.result;
        console.log("url :", this.url)
        localStorage.setItem("url", `${this.url}`)
      }
    }
  }

  linkClicked() {
    this.isShowing = false
  }
  ngOnInit(): void {
  }

  ngOnDestroy() {

  }

  refresh(){
    this.ngOnInit()
    window.scrollTo(0,0)
  }
}
