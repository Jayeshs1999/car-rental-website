import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ListOrderComponent } from './orders/list-order/list-order.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  {path:'',redirectTo:'login', pathMatch:'full' },
  {path:"login",component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
  
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  {path :"order", component:ListOrderComponent},
  {path:"**", component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
