import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DialogData } from '../nav-bar.component';

@Component({
  selector: 'app-dialog-for-delete',
  templateUrl: './dialog-for-delete.component.html',
  styleUrls: ['./dialog-for-delete.component.css']
})
export class DialogForDeleteComponent implements OnInit {

  constructor(private afAuth:AngularFireAuth,private router:Router,private authService:AuthService,

    public dialogRef: MatDialogRef<DialogForDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

  ngOnInit(): void {
    
  }

 
  logOut(){
    this.authService.notifyAboutChange();
    this.data.userNotLogin=true
    this.data.userLogin=false
    this.data.isShowing=false
    this.afAuth.signOut();
    this.router.navigate(['/login'])
  }
}
