import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MixChart3Component } from './charts/mix-chart/mix-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { UtilsService } from './services/utils.service';

@NgModule({
  declarations: [
    MixChart3Component,
    BarChartComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MixChart3Component,
    BarChartComponent
  ],
  providers: [
    UtilsService
  ]
})
export class NgxChart3Module { }
