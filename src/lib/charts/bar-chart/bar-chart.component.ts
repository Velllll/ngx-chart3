import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { AxisName, Margins } from '../../interfaces/chart-settings.interface';
import { BarData } from '../../interfaces/bar-data.interface';
import { ChartSettingsService } from './services/chart-settings.service';
import { ChartSetupService } from './services/chart-setup.service';
import { RenderChartBaseService } from './services/render/render-chart-base.service';
import { SortService } from './services/sort.service';
import { RenderDataService } from './services/render/render-data.service';

@Component({
  selector: 'bar-chart3',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  providers: [ChartSettingsService, ChartSetupService, RenderChartBaseService, SortService, RenderDataService]
})
export class BarChartComponent implements AfterViewInit, OnChanges {
  @Input('chartData') chartData: BarData[] = []
  @Input('svgId') svgId: string = this.utils.getRandomId(10)
  @Input('width') width: number = 600
  @Input('height') height: number = 400
  @Input('margins') margins: Margins = {left: 40, right: 30, bottom: 30, top: 30}
  @Input('selectRange') selectRange: boolean = false
  @Input('fontSize') fontSize: number = 12
  @Input('rotate') rotate: number = 0
  @Input('barPadding') barPadding: number = 0.1
  @Input('axisName') axisName: AxisName = {x: '', y: ''}

  constructor(
    private utils: UtilsService,
    private setup: ChartSetupService
  ) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngAfterViewInit(): void {
    this.setup.setChart({
      chartData: this.chartData, 
      svgId: this.svgId, 
      fontSize: this.fontSize, 
      width: this.width, 
      height: this.height, 
      margins: this.margins,
      rotate: this.rotate,
      barPadding: this.barPadding,
      axisName: this.axisName
    })
  }

}
