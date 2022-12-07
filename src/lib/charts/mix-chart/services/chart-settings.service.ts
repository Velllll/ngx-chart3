import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Line, Dot } from "../interfaces/lines-and-dots-data.interface";
import { Margins, AxisName } from "../interfaces/chart-settings.interface";
import * as d3 from 'd3'

@Injectable()
export class ChartSettingsService {
     
    svg!: d3.Selection<d3.BaseType, unknown, HTMLElement, any>

    settings!: {
      chartData: (Line | Dot)[];
      svgId: string;
      fontSize: number;
      width: number;
      height: number;
      margins: Margins;
      range: {x: number[]; y: number[]},
      selectRange: boolean;
      zoom: boolean;
      cursor: boolean;
      lineHandlers: boolean;
      axisName: AxisName;
      gridSize: number
    }
  
    defaultSettingsForLine: {
      color: string;
      opacity: number;
      strokeWidth: number;
    } = {
      color: 'red',
      opacity: 1,
      strokeWidth: 1
    }
  
    defaultSettingsForDot: {
      color: string;
      opacity: number;
      radious: number;
    } = {
      color: 'red',
      opacity: 1,
      radious: 5
    }
  
    destroy$ = new Subject()
  
    selectedRangeX: number[] = []
    selectedRangeY: number[] = []
  
    axisX!: d3.Selection<SVGGElement, unknown, d3.BaseType, unknown>
    axisY!: d3.Selection<SVGGElement, unknown, d3.BaseType, unknown>
    gridX!: d3.Selection<SVGGElement, unknown, d3.BaseType, unknown>
    gridY!: d3.Selection<SVGGElement, unknown, d3.BaseType, unknown>
  
    inZoom = false
    
    constructor() {}
}