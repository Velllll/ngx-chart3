import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GuardsService } from '../services/type-guards.service';
import { ChartSettingsService } from '../services/chart-settings.service';
import { ChartUtilsService } from '../services/chart-utils.service';
import { ChartSetupService } from '../services/chart-setup.service';
import { ChartRenderService } from '../services/chart-render.service';
import { ILine, IDot } from '../interfaces/chart-data.interface';
import { IMargins, IAxisName } from '../interfaces/chart-settings.interface';

@Component({
  selector: 'ngx-chart3',
  templateUrl: './ng-chart.component.html',
  styleUrls: ['./ng-chart.component.scss'],
  providers: [GuardsService, ChartSettingsService, ChartUtilsService, ChartSetupService, ChartRenderService],
})
export class NgChartComponent implements OnChanges, AfterViewInit {
  @Input('chartData') chartData: (ILine | IDot)[] = []
  @Input('svgId') svgId: string = this.getRandomId(10)
  @Input('fontSize') fontSize: number = 15
  @Input('width') width: number = 600
  @Input('height') height: number = 400
  @Input('margins') margins: IMargins = {left: 40, right: 30, bottom: 30, top: 30}
  @Input('range') range: {x: number[], y: number[]} = {x: [], y: []}
  @Input('selectRange') selectRange: boolean = false
  @Input('zoom') zoom: boolean = false
  @Input('cursor') cursor: boolean = false
  @Input('axisName') axisName: IAxisName = {x: '', y: ''}
  @Input('gridSize') gridSize: number = 5

  constructor(
    private chartSetup: ChartSetupService,
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

  getRandomId(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}