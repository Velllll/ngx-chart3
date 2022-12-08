import { Injectable } from "@angular/core";
import { ChartSettingsService } from "../chart-settings.service";
import * as d3 from 'd3'
import { SortService } from "../sort.service";

@Injectable() 
export class RenderChartBaseService {

  constructor(
    private chartSettings: ChartSettingsService,
    private sort: SortService
  ) {}

  renderSvg() {
    this.chartSettings.svg = d3.selectAll(`#${this.chartSettings.settings.svgId}`) 
    this.chartSettings.svg
      .attr('width', this.chartSettings.settings.width)
      .attr('height', this.chartSettings.settings.height)
  }

  renderAxis() {
    const x = d3.scaleBand()
      .range([this.chartSettings.settings.margins.left, this.chartSettings.settings.width - this.chartSettings.settings.margins.right])
      .domain(this.chartSettings.settings.chartData.map(i => i.lable))
      .padding(0.2)

    const y = d3.scaleLinear()
      .domain([0, this.sort.getChartRange()])
      .range([ this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom, this.chartSettings.settings.margins.top]);

    this.chartSettings.svg.append("g")
      .attr('class', 'y-axis')
      .attr('transform', `translate(${this.chartSettings.settings.margins.left}, 0)`)
      .style('font-size', this.chartSettings.settings.fontSize)
      .call(d3.axisLeft(y))

    this.chartSettings.svg.append('g')
      .attr('class', 'x-axis')
      .attr("transform", "translate(0," + (this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom) + ")")
      .call(d3.axisBottom(x))

    
    
    if(this.chartSettings.settings.rotate) {
      this.chartSettings.svg.selectAll('g.x-axis')
        .selectAll("text")
        .attr("transform", `translate(-10)rotate(-${this.chartSettings.settings.rotate})`)
        .style("text-anchor", "end");
    }

    this.chartSettings.svg.selectAll('g.x-axis')
      .selectAll('text')
      .attr('font-size', this.chartSettings.settings.fontSize)
  }
}