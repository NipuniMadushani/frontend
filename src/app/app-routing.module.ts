import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home/home.component';
import {AdminComponent} from './components/admin/admin/admin.component';
import {LoginComponent} from './components/login/login/login.component';
import {RegisterComponent} from './components/register/register/register.component';
import {UserComponent} from './components/user/user/user.component';
import {MycartComponent} from './components/shoppingcart/mycart/mycart.component';
import {ShippingFormComponent} from './components/shipping-form/shipping-form/shipping-form.component';


const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  // {
  //   path: 'pm',
  //   component: PmComponent
  // },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },

  {
    path: 'mycart',
    component: MycartComponent
  },

  {
    path: 'checkout',
    component: ShippingFormComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
