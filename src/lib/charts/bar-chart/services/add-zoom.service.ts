import { Injectable } from "@angular/core";
import { ChartSettingsService } from "./chart-settings.service";
import * as d3 from 'd3'

@Injectable()
export class AddZoomService {

  constructor(
    private chartSettings: ChartSettingsService
  ) {}

  addZoom() {
    this.addContainerForZoomIfNotExist()
    const updateChart = (e: any) => {
      
    }

    const zoom = d3.zoom<any, any>()
    .extent([[0, 0], [this.chartSettings.settings.width, this.chartSettings.settings.height]])
    .on("zoom", updateChart)

    this.chartSettings.svg.selectAll('g.zoom')
    .append("rect")
    .attr('class', 'zoom-overlay')
    .attr("width", this.chartSettings.settings.width - this.chartSettings.settings.margins.left - this.chartSettings.settings.margins.right)
    .attr("height", this.chartSettings.settings.height - this.chartSettings.settings.margins.top - this.chartSettings.settings.margins.bottom)
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('transform', 'translate(' + this.chartSettings.settings.margins.left + ',' + this.chartSettings.settings.margins.top + ')')
    .call(zoom)
  }

  private addContainerForZoomIfNotExist() {
    console.log('asd')
    if(!this.chartSettings.svg.selectAll('g.zoom').size()) {
      this.chartSettings.svg.append('g').attr('class', 'zoom')
    }
  }
}