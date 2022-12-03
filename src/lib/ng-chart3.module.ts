import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartComponent } from './ng-chart/ng-chart.component';

@NgModule({
  declarations: [
    NgChartComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgChartComponent
  ]
})
export class NgxChart3Module { }
