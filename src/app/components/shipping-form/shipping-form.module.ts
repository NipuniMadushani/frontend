import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingFormRoutingModule } from './shipping-form-routing.module';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {MaterialModule} from '../../material/material.module';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

@NgModule({
  declarations: [ShippingFormComponent],
  imports: [
    CommonModule,
    ShippingFormRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    CustomFormsModule,
    FormsModule,
    MaterialModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class ShippingFormModule { }
