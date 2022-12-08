import { Injectable } from "@angular/core";
import { ChartSettingsService } from "./chart-settings.service";

@Injectable() 
export class SortService {

  constructor(
    private settings: ChartSettingsService
  ) {}

  getChartRange(): number {
    return this.settings.settings.chartData
      .map(i => i.y)
      .sort((a, b) => a - b)[this.settings.settings.chartData.length - 1]
  }
}