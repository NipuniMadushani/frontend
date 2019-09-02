import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {MaterialModule} from '../../material/material.module';
import {ChartsModule} from 'ng2-charts';
import {ChartModule} from 'angular2-chartjs';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ChartsModule,
    ChartModule
    ]
})
export class HomeModule { }
