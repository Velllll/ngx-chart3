import { Injectable } from '@angular/core';
import { BarData } from '../../../interfaces/bar-data.interface';
import { BarChartSettings } from '../../../interfaces/chart-settings.interface';
import { ChartSettingsService } from './chart-settings.service';
import { RenderChartBaseService } from './render/render-chart-base.service';
import { RenderDataService } from './render/render-data.service';

@Injectable()
export class ChartSetupService {

  constructor(
    private chartSettings: ChartSettingsService,
    private renderChartBase: RenderChartBaseService,
    private renderData: RenderDataService
  ) { }

  setChart(
    {
      chartData, 
      svgId, 
      fontSize = 15,
      width = 600, 
      height = 400, 
      margins = {left: 40, right: 30, bottom: 30, top: 30}, 
      rotate = 45
    }: BarChartSettings
  ) {
    this.chartSettings.settings = {
      chartData,
      svgId,
      fontSize,
      width,
      height,
      margins, 
      rotate,
    }
    console.log(chartData)
    this.renderChart()
  }

  renderChart() {
    this.renderChartBase.renderSvg()
    this.renderChartBase.renderAxis()
    this.renderData.renderData()
  }

  updateChart(chartData: BarData[], width: number, height: number) {

  }
}
