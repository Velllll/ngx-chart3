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
    const range = this.sort.getChartRange()
    this.chartSettings.x = d3.scaleBand()
      .range([this.chartSettings.settings.margins.left, this.chartSettings.settings.width - this.chartSettings.settings.margins.right])
      .domain(this.chartSettings.settings.chartData.map(i => i.lable))
      .padding(this.chartSettings.settings.barPadding)

      this.chartSettings.y = d3.scaleLinear()
      .domain([0, Math.ceil(range * 1.1)])
      .range([ this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom, this.chartSettings.settings.margins.top]);

    this.chartSettings.svg.append("g")
      .attr('class', 'y-axis')
      .attr('transform', `translate(${this.chartSettings.settings.margins.left}, 0)`)
      .style('font-size', this.chartSettings.settings.fontSize)
      .call(d3.axisLeft(this.chartSettings.y))

    this.chartSettings.svg.append('g')
      .attr('class', 'x-axis')
      .attr("transform", "translate(0," + (this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom) + ")")
      .call(d3.axisBottom(this.chartSettings.x))
    
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

  renderAxisName() {
    const fontSize = 20
    this.chartSettings.svg
    .append('g')
    .attr('class', 'x-axis-name')

    this.chartSettings.svg
    .append('g')
    .attr('class', 'y-axis-name')

    this.chartSettings.svg.selectAll('g.x-axis-name')
    .append('text')
    .text(this.chartSettings.settings.axisName.x)
    .attr('x', (this.chartSettings.settings.width - this.chartSettings.settings.margins.left - this.chartSettings.settings.margins.right) / 2 + this.chartSettings.settings.margins.left - 10 * this.chartSettings.settings.axisName.x.length / 2)
    .attr('y', this.chartSettings.settings.height - 5)
    .attr('font-size', fontSize)
    .attr('fill', 'black')
    .style('font-family', "Helvetica Neue")

    this.chartSettings.svg.selectAll('g.y-axis-name')
    .style('transform', 'rotate(-90deg)')
    .append('text')
    .text(this.chartSettings.settings.axisName.y)
    .attr('x', (this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom) / -2 - this.chartSettings.settings.axisName.y.length / 2 * 10)
    .attr('y', fontSize)
    .attr('font-size', fontSize)
    .attr('fill', 'black')
    .style('font-family', "Helvetica Neue")
}
}