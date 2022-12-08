import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GuardsService } from './services/type-guards.service';
import { ChartSettingsService } from './services/chart-settings.service';
import { ChartUtilsService } from './services/chart-utils.service';
import { ChartSetupService } from './services/chart-setup.service';
import { Margins, AxisName } from '../../interfaces/chart-settings.interface';
import { RenderEmptyChart } from './services/render/render-empty-chart.service';
import { RenderDataService } from './services/render/render-data.service';
import { Dot, Line } from '../../interfaces/mix-data.interface';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'mixed-chart3',
  templateUrl: './mix-chart.component.html',
  styleUrls: ['./mix-chart.component.scss'],
  providers: [GuardsService, ChartSettingsService, ChartUtilsService, ChartSetupService, RenderDataService, RenderEmptyChart],
})
export class MixChart3Component implements OnChanges, AfterViewInit {
  @Input('chartData') chartData: (Line | Dot)[] = []
  @Input('svgId') svgId: string = this.utils.getRandomId(10)
  @Input('fontSize') fontSize: number = 15
  @Input('width') width: number = 600
  @Input('height') height: number = 400
  @Input('margins') margins: Margins = {left: 40, right: 30, bottom: 30, top: 30}
  @Input('range') range: {x: number[], y: number[]} = {x: [], y: []}
  @Input('selectRange') selectRange: boolean = false
  @Input('zoom') zoom: boolean = false
  @Input('cursor') cursor: boolean = false
  @Input('axisName') axisName: AxisName = {x: '', y: ''}
  @Input('gridSize') gridSize: number = 5

  constructor(
    private chartSetup: ChartSetupService,
    private utils: UtilsService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['chartData']?.firstChange && changes['chartData']?.currentValue) {
      this.chartSetup.updateChart(this.chartData)
    }
    if(!changes['width']?.firstChange && changes['width']?.currentValue) {
      this.chartSetup.updateChart(this.chartData, {width: this.width, height: this.height})
    }
    if(!changes['height']?.firstChange && changes['height']?.currentValue) {
      this.chartSetup.updateChart(this.chartData, {width: this.width, height: this.height})
    }
  }

  ngAfterViewInit(): void {
    this.chartSetup.setChart({
      chartData: this.chartData,
      svgId: this.svgId,
      width: this.width,
      height: this.height,
      fontSize: this.fontSize,
      margins: this.margins,
      range: this.range,
      selectRange: this.selectRange,
      zoom: this.zoom,
      cursor: this.cursor,
      axisName: this.axisName,
      gridSize: this.gridSize,
    })
  }

  

}