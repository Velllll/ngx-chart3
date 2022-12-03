import { Injectable } from "@angular/core";
import * as d3 from "d3";
import { ChartSettingsService } from "./chart-settings.service";
import { GuardsService } from "./type-guards.service";

@Injectable()
export class ChartUtilsService {
    constructor(
        private chartSettings: ChartSettingsService,
        private typeGuards: GuardsService
    ) {}

    sortedData() {
        const xAndYOption = this.getdomainXandY()
    
        const dataLine: {
          lineName: string;
          color: string;
          strokeWidth: number;
          opacity: number;
          data: [number, number][]
        }[] = []
    
        const dataDot: {
          dotName: string;
          x: number;
          y: number
          color: string;
          opacity: number;
          radious: number;
        }[] = []
    
        this.chartSettings.settings.chartData.forEach(d => {
          if(this.typeGuards.isLine(d)) {
            dataLine.push({
              lineName: d.lineName,
              color: d.color !== undefined ? d.color : this.chartSettings.defaultSettingsForLine.color,
              strokeWidth: d.strokeWidth !== undefined ? d.strokeWidth : this.chartSettings.defaultSettingsForLine.strokeWidth,
              opacity: d.opacity !== undefined ? d.opacity : this.chartSettings.defaultSettingsForLine.opacity,
              data: d.lineData.x.map((x, i) => [xAndYOption.x(x), xAndYOption.y(d.lineData.y[i])])
            })
          }
    
          if(this.typeGuards.isDot(d)) {
            d.dotData.x.forEach((x, i) => {
              dataDot.push({
                dotName: d.dotName,
                x: xAndYOption.x(d.dotData.x[i]),
                y: xAndYOption.y(d.dotData.y[i]),
                color: d.color !== undefined ? d.color : this.chartSettings.defaultSettingsForDot.color,
                opacity: d.opacity !== undefined ? d.opacity : this.chartSettings.defaultSettingsForDot.opacity,
                radious: d.radious !== undefined ? d.radious : this.chartSettings.defaultSettingsForDot.radious
              })
            })
          }
        })
    
        return {dataLine, dataDot}
      }
      getdomainXandY(): {x: d3.ScaleLinear<number, number, never>, y: d3.ScaleLinear<number, number, never>} {
        const xValue = (d: any) => d
        const yValue = (d: any) => d
        let xRange = this.getAllX()
        let yRange = this.getAllY()
        if(this.chartSettings.selectedRangeX.length) {
          xRange = this.chartSettings.selectedRangeX
        }
        if(this.chartSettings.selectedRangeY.length) {
          yRange = this.chartSettings.selectedRangeY
        }
    
        const x = d3.scaleLinear()
        .domain([
          d3.min(xRange, xValue),
          d3.max(xRange, xValue)
        ])
        .range([this.chartSettings.settings.margins.left, this.chartSettings.settings.width - this.chartSettings.settings.margins.right])
    
        const y = d3.scaleLinear()
        .domain([
          d3.min(yRange, yValue),
          d3.max(yRange, yValue)
        ])
        .range([this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom, this.chartSettings.settings.margins.top])
    
        return {x, y}
      }

      getAllX() {
        let xData: number[] = []
        this.chartSettings.settings.chartData.forEach(d => {
          if(this.typeGuards.isLine(d)) {
            xData = xData.concat(d.lineData.x)
          } 
          if(this.typeGuards.isDot(d)) {
            xData = xData.concat(d.dotData.x)
          }
        })
        return xData
      }

      getAllY() {
        let yData: number[] = []
        this.chartSettings.settings.chartData.forEach(d => {
          if(this.typeGuards.isLine(d)) {
            yData = yData.concat(d.lineData.y) 
          } 
          if(this.typeGuards.isDot(d)) {
            yData = yData.concat(d.dotData.y) 
          }
        })
        return yData
      }
}