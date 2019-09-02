import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductfilterRoutingModule } from './productfilter-routing.module';
import { ProductfilterComponent } from './productfilter/productfilter.component';

@NgModule({
  declarations: [ProductfilterComponent],
  imports: [
    CommonModule,
    ProductfilterRoutingModule
  ]
})
export class ProductfilterModule { }
