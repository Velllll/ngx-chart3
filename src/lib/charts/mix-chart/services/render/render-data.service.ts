import { Injectable } from "@angular/core";
import * as d3 from "d3";
import { ChartSettingsService } from "../chart-settings.service";
import { ChartUtilsService } from "../chart-utils.service";

@Injectable()
export class RenderDataService {
  constructor(
    private chartSettings: ChartSettingsService,
    private chartUtils: ChartUtilsService
  ) {}

  renderLinesAndDotsData() {
    const {dataLine, dataDot} = this.chartUtils.sortedData()
    //render all lines
    this.chartSettings.svg.selectAll('g.lines')
      .selectAll('path')
      .data(dataLine)
      .join('path')
      .attr('class', d => d.lineName)
      .attr('d', d => d3.line()(d.data))
      .attr('fill', 'none')
      .attr('stroke', d => d.color !== undefined ? d.color : this.chartSettings.defaultSettingsForLine.color)
      .attr('stroke-width', d => {
        return d.strokeWidth !== undefined ? d.strokeWidth : this.chartSettings.defaultSettingsForLine.strokeWidth
      })
      .style('stroke-opacity', d => d.opacity !== undefined ? d.opacity : this.chartSettings.defaultSettingsForLine.opacity)
    
    console.log(this.chartSettings.svg.selectAll('g.lines').selectAll('path').size())
    //render all dots
    this.chartSettings.svg.selectAll('g.dots')
      .selectAll('circle')
      .data(dataDot)
      .join('circle')
      .attr('class', d => d.dotName)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => d.color !== undefined ? d.color : this.chartSettings.defaultSettingsForDot.color)
      .attr('fill-opacity', d => d.opacity !== undefined ? d.opacity : this.chartSettings.defaultSettingsForDot.opacity)
      .attr('r', d => d.radious !== undefined ? d.radious : this.chartSettings.defaultSettingsForDot.radious)
}
}