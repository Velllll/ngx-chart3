import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart3MixComponent } from './charts/mix-chart/mix-chart.component';

@NgModule({
  declarations: [
    Chart3MixComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    Chart3MixComponent
  ]
})
export class NgxChart3Module { }
