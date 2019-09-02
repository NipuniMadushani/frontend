import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingcartRoutingModule } from './shoppingcart-routing.module';
import { MycartComponent } from './mycart/mycart.component';

@NgModule({
  declarations: [MycartComponent],
  imports: [
    CommonModule,
    ShoppingcartRoutingModule,

  ]
})
export class ShoppingcartModule { }
