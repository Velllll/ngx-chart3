import { Injectable } from "@angular/core";
import { ChartSettingsService } from "../chart-settings.service";

@Injectable()
export class RenderDataService {
  constructor(
    private chartSettings: ChartSettingsService
  ) {}

  renderData() {
    this.chartSettings.svg.append('g')
      .attr('class', 'chart-data')
      .selectAll('rect')
      .data(this.chartSettings.settings.chartData)
      .join('rect')
        .attr('y', d => this.chartSettings.y(d.y))
        .attr('x', d => this.chartSettings.x(d.lable))
        .attr("width", this.chartSettings.x.bandwidth())
        .attr("height", d => this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom - this.chartSettings.y(d.y))
        .attr("fill", "#69b3a2")
  }
}