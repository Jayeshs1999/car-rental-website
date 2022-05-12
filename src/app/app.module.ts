import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import{MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire/compat";

import { OrdersModule } from './orders/orders.module';
import { SiteLayoutModule } from './site-layout/site-layout.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductsRoutingModule } from './products/products-routing.module';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { FirebaseApp, provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ViewCartComponent } from './view-cart/view-cart.component';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import { DialogForDeleteComponent } from './nav-bar/dialog-for-delete/dialog-for-delete.component';
// import { DialogForDeleteComponent } from './nav-bar/dialog-for-delete/dialog-for-delete.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UserInrPipe } from './pipes/user-inr.pipe';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    RegisterComponent,
  
    ErrorComponent,
       ViewCartComponent,
       DialogForDeleteComponent,
       UserInrPipe,
      //  DialogForDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatChipsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatBadgeModule,
    
    
    ProductsRoutingModule,
    OrdersModule,
    SiteLayoutModule,
    RouterModule,
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    AngularFireModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
