import { Injectable } from "@angular/core";
import { BarData } from "projects/ngx-chart3/src/lib/interfaces/bar-data.interface";
import { ChartSettingsService } from "../chart-settings.service";
import { SortService } from "../sort.service";
import * as d3 from 'd3'
@Injectable()
export class RenderDataService {

  constructor(
    private chartSettings: ChartSettingsService,
    private sort: SortService,
  ) {}

  renderData() { 
    this.addContainerForDataIfNotExist()
    this.chartSettings.settings.chartData.forEach(i => {
      if(i.color) {
        this.renderRectWithOneColor(i)
      } else {
        this.renderRectWithMultCulor(i)
      }
    })
  }

  private renderRectWithOneColor(bar: BarData) {
    this.chartSettings.svg.selectAll('g.bar-data')
      .selectAll('rect.' + 'd' +bar.lable.replace(/\./g, ''))
      .data([bar])
      .join('rect')
      .attr('class', 'd' + bar.lable.replace(/\./g, ''))
      .attr("x", d => this.chartSettings.x(d.lable))
      .attr("y", d => this.chartSettings.y(d.y))
      .attr("width", this.chartSettings.x.bandwidth())
      .attr("height", d => this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom - this.chartSettings.y(d.y))
      .attr("fill", d => d.color as string)
  }

  private renderRectWithMultCulor(bar: BarData) {
    const rectData = this.getColorsParams(bar)
    rectData.forEach((i, idx) => {
      this.chartSettings.svg.selectAll('g.bar-data')
      .selectAll('rect.' + 'd' + bar.lable.replace(/\./g, '') + idx)
      .data([i])
      .join('rect')
      .attr('class', 'd' + bar.lable.replace(/\./g, '') + idx)
      .attr("x", d => this.chartSettings.x(d.lable))
      .attr("y", d => this.chartSettings.y(d.y))
      .attr("width", this.chartSettings.x.bandwidth())
      .attr("height", d => this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom - this.chartSettings.y(d.height))
      .attr("fill", d => d.color)
    })
  }

  private getColorsParams(bar: BarData) {
    let colors: [string, number][] = []
    if(bar.colors) {
      colors = bar.colors
    }
    const colorsData = [...colors].reverse()
    const sortedColors: {lable: string, y: number, height: number, color: string}[] = []
    for (let i = 0; i < colorsData.length; i++) {
      sortedColors.push({
        lable: bar.lable,
        y: !i ? colorsData[i][1] / 100 * bar.y : colorsData[i][1] / 100 * bar.y + sortedColors[i - 1]?.y,
        height: bar.y * colorsData[i][1] / 100 ,
        color: colorsData[i][0]
      })
    }
    return sortedColors
  }

  private addContainerForDataIfNotExist() {
    if(!this.chartSettings.svg.selectAll('.bar-data').size()) {
      this.chartSettings.svg.append('g').attr('class', 'bar-data')
    }
  }
}