import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {LoginComponent} from './components/login/login/login.component';
import {UserComponent} from './components/user/user/user.component';
import {RegisterComponent} from './components/register/register/register.component';
import {HomeComponent} from './components/home/home/home.component';
import {AdminComponent} from './components/admin/admin/admin.component';
import {httpInterceptorProviders} from './service/auth-interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {NavbarComponent} from './components/navbar/navbar/navbar.component';
import { ChartModule } from 'angular2-chartjs';
import {ChartsModule} from 'ng2-charts';
import {ProductComponent} from './components/product/product/product.component';
import {ProductService} from './service/product.service';
import {CustomFormsModule} from 'ng2-validation';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MycartComponent} from './components/shoppingcart/mycart/mycart.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ShippingFormComponent} from './components/shipping-form/shipping-form/shipping-form.component';

// MDB Angular Pro

import { ButtonsModule, WavesModule } from 'angular-bootstrap-md';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    NavbarComponent,
    ProductComponent,
    MycartComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule,
    ReactiveFormsModule,
    ChartModule,
    CustomFormsModule,
    NgbModule,
    ButtonsModule, WavesModule,
    MDBBootstrapModule.forRoot()

  ],
  entryComponents: [ProductComponent],
  providers: [httpInterceptorProviders, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
