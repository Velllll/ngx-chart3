import { Injectable, OnInit } from '@angular/core';
import { BarData } from '../../../interfaces/bar-data.interface';
import { Margins } from '../../../interfaces/chart-settings.interface';

@Injectable()
export class ChartSettingsService {

  svg!: d3.Selection<d3.BaseType, unknown, HTMLElement, any>

  x!: any

  y!: d3.ScaleLinear<number, number, never>

  settings!: {
    chartData: BarData[];
    svgId: string;
    fontSize: number;
    width: number;
    height: number;
    margins: Margins;
    rotate: number;
  }

  constructor() { }
}
