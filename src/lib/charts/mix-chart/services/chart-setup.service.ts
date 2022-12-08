import { Injectable } from "@angular/core";
import { ChartSettingsService } from "./chart-settings.service";
import { ChartUtilsService } from "./chart-utils.service";
import * as d3 from "d3";
import { Line, Dot } from "../../../interfaces/mix-data.interface";
import { MixChartSettings } from "../../../interfaces/chart-settings.interface";
import { RenderEmptyChart } from "./render/render-empty-chart.service";
import { RenderDataService } from "./render/render-data.service";

@Injectable()
export class ChartSetupService {

    constructor(
      private chartSettings: ChartSettingsService,
      private chartUtils: ChartUtilsService,
      private rEmptyChart: RenderEmptyChart,
      private rDataLinesDots: RenderDataService
    ) {}

    setChart(
      {
        chartData, 
        svgId, 
        fontSize = 15,
        width = 600, 
        height = 400, 
        margins = {left: 40, right: 30, bottom: 30, top: 30}, 
        range = {x: [], y: []},
        selectRange = false, 
        zoom = false,
        cursor = false,
        lineHandlers = true, 
        axisName = {x: '', y: ''},
        gridSize = 6
      }: MixChartSettings
    ) {
      this.chartSettings.settings = {
        chartData,
        svgId,
        fontSize,
        width,
        height,
        margins, 
        range,
        selectRange,
        zoom,
        cursor, 
        lineHandlers,
        axisName,
        gridSize,
      }
      this.renderChart()
    }
          
    renderChart() {
        //if there is an initial range, it will set it; if not, it will set it to an empty array (scales by the given range of min and max values)
        this.chartSettings.selectedRangeX = this.chartSettings.settings.range.x
        this.chartSettings.selectedRangeY = this.chartSettings.settings.range.y
    
        this.rEmptyChart.renderSvg()
        this.rEmptyChart.renderGContainers()
        this.rEmptyChart.renderAxis()
        this.rEmptyChart.renderAxisName()
        this.rDataLinesDots.renderLinesAndDotsData()
        if(this.chartSettings.settings.selectRange) this.addBrush()
        if(this.chartSettings.settings.cursor) this.addCursor()
        if(this.chartSettings.settings.zoom) this.addZoom()
    }

  updateChart(chartData?: (Line | Dot)[], chartSize?: {width: number, height: number}) { 
      if(chartSize) {
        this.chartSettings.settings.width = chartSize.width
        this.chartSettings.settings.height = chartSize.height

        //re-renders the zoom area after resizing the svg
        this.chartSettings.svg.selectAll('g.zoom')
        .selectAll('rect.zoom-overlay')
        .attr("width", this.chartSettings.settings.width - this.chartSettings.settings.margins.left - this.chartSettings.settings.margins.right)
        .attr("height", this.chartSettings.settings.height - this.chartSettings.settings.margins.top - this.chartSettings.settings.margins.bottom)

        //re-renders the brush
        this.chartSettings.svg?.selectAll('g.brush')?.remove()
        if(this.chartSettings.settings.selectRange) this.addBrush()
      }
      //f the date has come sets it
      if(chartData?.length) {
        this.chartSettings.settings.chartData = chartData
      } else {
      //if there is no date, sets a stub for rendering axes
        this.chartSettings.settings.chartData = []
      }
      //removes old axes
      this.chartSettings.svg?.selectAll('g.axis')?.selectAll('g').remove()
      this.chartSettings.svg?.selectAll('defs')?.remove()
  
      this.rEmptyChart.renderSvg()
      this.rEmptyChart.renderAxis()
      this.rEmptyChart.renderAxisName()
      //if in zoom, no new data will be rendered (re-render when zoom stops)
      if(!this.chartSettings.inZoom) this.rDataLinesDots.renderLinesAndDotsData()
  }

  private addBrush() {
      const brush = d3.brushX()    
      .extent([
        [this.chartSettings.settings.margins.left, this.chartSettings.settings.margins.top], 
        [this.chartSettings.settings.width - this.chartSettings.settings.margins.right, this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom] 
      ]) 
      .on("end", (e) => {
        //if selected sets the selected range
        if(e.selection) {
          const xAndY = this.chartUtils.getdomainXandY()
          const x1 = xAndY.x.invert(e.selection[0])
          const x2 = xAndY.x.invert(e.selection[1])
          this.chartSettings.selectedRangeX = [x1, x2]
          this.updateChart(this.chartSettings.settings.chartData)
        } else {
          //if pressed resets the range
          this.chartSettings.selectedRangeX = []
          this.updateChart(this.chartSettings.settings.chartData)
        }
        //remove the brush
        this.chartSettings.svg.selectAll('g.brush').remove()
        //add the ability to select by new
        this.chartSettings.svg
        .append("g")
        .attr("class", "brush")
        .call(brush);
        //if the cursor is on then delete the standard cursor
        if(this.chartSettings.settings.cursor) this.chartSettings.svg.selectAll('rect.overlay').attr('cursor', 'none')
      })
      //removes cursor while zooming
      .on('start', (e) => {
        this.chartSettings.svg.selectAll('g.cursor').selectAll('line').remove()
        this.chartSettings.svg.selectAll('g.cursor').selectAll('text').remove()
      })
      //add brush to svg
      this.chartSettings.svg
      .append("g")
      .attr("class", "brush")
      .call(brush);
      //if the cursor is on then delete the standard
      if(this.chartSettings.settings.cursor) this.chartSettings.svg.selectAll('rect.overlay').attr('cursor', 'none')
  }
  
  private addZoom() {
      let domain = this.chartUtils.getdomainXandY()
      let {dataLine, dataDot} = this.chartUtils.sortedData()
  
      const updateChart = (e: any) => {
        // recover the new scale
        const newX = e.transform.rescaleX(domain.x);
        const newY = e.transform.rescaleY(domain.y);
  
        this.chartSettings.selectedRangeX = [newX.invert(domain.x.range()[0]), newX.invert(domain.x.range()[1])]
        this.chartSettings.selectedRangeY = [newY.invert(domain.y.range()[0]), newY.invert(domain.y.range()[1])]
  
        //update grid
        const inner_width = this.chartSettings.settings.width - this.chartSettings.settings.margins.left - this.chartSettings.settings.margins.right
        const inner_height = this.chartSettings.settings.height - this.chartSettings.settings.margins.top - this.chartSettings.settings.margins.bottom
        const xGrid = d3.axisBottom(newX).tickSize(-inner_height).tickFormat(() => '').ticks(this.chartSettings.settings.gridSize)
        const yGrid = d3.axisLeft(newY).tickSize(-inner_width).tickFormat(() => '').ticks(this.chartSettings.settings.gridSize)
        this.chartSettings.gridX.call(xGrid)
        this.chartSettings.gridY.call(yGrid)
  
        // update axes with these new boundaries
        this.chartSettings.axisX.call(d3.axisBottom(newX).ticks(this.chartSettings.settings.gridSize))
        this.chartSettings.axisY.call(d3.axisLeft(newY).ticks(this.chartSettings.settings.gridSize))
    
        // update circle position
        this.chartSettings.svg.selectAll('g.dots')
          .selectAll("circle")
          .data(dataDot)
          .join('circle')
          .attr('cx', d => newX(domain.x.invert(d.x)))
          .attr('cy', d => newY(domain.y.invert(d.y)))
        // update lines position
        this.chartSettings.svg.selectAll('g.lines')
          .selectAll('path')
          .data(dataLine)
          .join('path')
          .attr('class', d => d.lineName)
          .attr('d', d => d3.line()(d.data.map(v => [newX(domain.x.invert(v[0])), newY(domain.y.invert(v[1]))])))
      }
  
      const zoom = d3.zoom<any, any>()
      .extent([[0, 0], [this.chartSettings.settings.width, this.chartSettings.settings.height]])
      .on("zoom", updateChart)
      //removes cursor while zooming
      .on('start', (e) => {
        //stops rendering new data
        this.chartSettings.inZoom = true
        //removes the cursor for the duration of the zoom
        this.chartSettings.svg.selectAll('g.cursor').selectAll('line').remove()
        this.chartSettings.svg.selectAll('g.cursor').selectAll('text').remove()
        
        domain = this.chartUtils.getdomainXandY()
        dataLine = this.chartUtils.sortedData().dataLine
        dataDot = this.chartUtils.sortedData().dataDot
      })
      .on('end', () => {
        //continues to render data on the chart
        this.chartSettings.inZoom = false
        //removes the ability to zoom and adds a new one (it is necessary that rects with old data do not accumulate in g.zoom)
        this.chartSettings.svg.selectAll('g.zoom').selectAll('rect.zoom-overlay').remove()
        this.addZoom()
        //render chart with current data
        this.rDataLinesDots.renderLinesAndDotsData()
      })
  
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
  
  private addCursor() {
    this.chartSettings.svg
      .on('mousemove', (e) => {
        this.rEmptyChart.renderCursor(e.offsetX, e.offsetY)
        this.rEmptyChart.renderCursorPosition(e.offsetX, e.offsetY)
      })
      .on('mouseleave', () => {
        this.chartSettings.svg.selectAll('g.cursor').selectAll('line').remove()
        this.chartSettings.svg.selectAll('g.cursor').selectAll('text').remove()
      })
    this.chartSettings.svg.attr('cursor', 'none')
  }
}