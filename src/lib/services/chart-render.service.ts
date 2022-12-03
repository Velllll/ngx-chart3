import { Injectable } from "@angular/core";
import { ChartSettingsService } from "./chart-settings.service";
import { ChartUtilsService } from "./chart-utils.service";
import * as d3 from "d3";

@Injectable()
export class ChartRenderService {

    constructor(
        private chartSettings: ChartSettingsService,
        private chartUtils: ChartUtilsService
    ) {}

    renderAxisName() {
        const fontSize = 20
        this.chartSettings.svg.selectAll('g.axis')
        .append('g')
        .attr('class', 'x-axis-name')
    
        this.chartSettings.svg.selectAll('g.axis')
        .append('g')
        .attr('class', 'y-axis-name')
    
        this.chartSettings.svg.selectAll('g.x-axis-name')
        .append('text')
        .text(this.chartSettings.settings.axisName.x)
        .attr('x', (this.chartSettings.settings.width - this.chartSettings.settings.margins.left - this.chartSettings.settings.margins.right) / 2 + this.chartSettings.settings.margins.left - 10 * this.chartSettings.settings.axisName.x.length / 2)
        .attr('y', this.chartSettings.settings.height - 5)
        .attr('font-size', fontSize)
        .style('font-family', "Helvetica Neue")
    
        this.chartSettings.svg.selectAll('g.y-axis-name')
        .style('transform', 'rotate(-90deg)')
        .append('text')
        .text(this.chartSettings.settings.axisName.y)
        .attr('x', (this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom) / -2 - this.chartSettings.settings.axisName.y.length / 2 * 10)
        .attr('y', fontSize)
        .attr('font-size', fontSize)
        .style('font-family', "Helvetica Neue")
    }
    
    renderSvg( ) {
        this.chartSettings.svg = d3.selectAll(`#${this.chartSettings.settings.svgId}`)
        .attr('width', this.chartSettings.settings.width)
        .attr('height', this.chartSettings.settings.height)
    
        //mask for data
        this.chartSettings.svg.append("defs").append("svg:clipPath")
          .attr("id", `clip-${this.chartSettings.settings.svgId}`)
          .append("svg:rect")
          .attr('class', 'borders')
          .attr("width", this.chartSettings.settings.width - this.chartSettings.settings.margins.left - this.chartSettings.settings.margins.right)
          .attr("height", this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom - this.chartSettings.settings.margins.top)
          .attr("x", this.chartSettings.settings.margins.left)
          .attr("y", this.chartSettings.settings.margins.top);
    }
    
    renderCursor(x: number, y: number) {
        //render horisontal line
        this.chartSettings.svg.selectAll('g.cursor')
        .selectAll('line.horisontal')
        .data([{x, y}])
        .join('line')
        .attr('class', 'horisontal')
        .attr('x1', d => d.x - this.chartSettings.settings.width)
        .attr('x2', d => d.x + this.chartSettings.settings.width)
        .attr('y1', d => d.y)
        .attr('y2', d => d.y)
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
    
        //render vertical line
        this.chartSettings.svg.selectAll('g.cursor')
        .selectAll('line.vertical')
        .data([{x, y}])
        .join('line')
        .attr('class', 'vertical')
        .attr('x1', d => d.x)
        .attr('x2', d => d.x)
        .attr('y1', d => d.y - this.chartSettings.settings.height)
        .attr('y2', d => d.y + this.chartSettings.settings.height)
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
    }
    
    renderCursorPosition(x: number, y: number) {
        const domain = this.chartUtils.getdomainXandY()

        const xPos = Math.round(domain.x.invert(x) * 100) / 100
        const yPos = Math.round(domain.y.invert(y) * 100) / 100
    
        //show x pos
        this.chartSettings.svg.selectAll('g.cursor')
        .selectAll('text.xpos')
        .data([{xPos}])
        .join('text')
        .attr('class', 'xpos')
        .text(d => d.xPos)
        .attr('x', x + 5)
        .attr('y', this.chartSettings.settings.height - this.chartSettings.settings.margins.top - this.chartSettings.settings.margins.bottom)
    
        //show y pos
        this.chartSettings.svg.selectAll('g.cursor')
        .selectAll('text.ypos')
        .data([{yPos}])
        .join('text')
        .attr('class', 'ypos')
        .text(d => d.yPos)
        .attr('x', this.chartSettings.settings.margins.left + 5)
        .attr('y', y - 5)
    }
    
    renderGContainers() {
        this.chartSettings.svg.append('g')
          .attr('class', 'axis')
    
        this.chartSettings.svg.append('g')
          .attr('class', 'lines')
          .attr("clip-path", `url(#clip-${this.chartSettings.settings.svgId})`)
    
        this.chartSettings.svg.append('g')
          .attr('class', 'dots')
          .attr("clip-path", `url(#clip-${this.chartSettings.settings.svgId})`)
      
        this.chartSettings.svg.append('g')
          .attr('class', 'cursor')
          .attr("clip-path", `url(#clip-${this.chartSettings.settings.svgId})`)
    
        this.chartSettings.svg.append('g')
          .attr('class', 'zoom')
          .attr("clip-path", `url(#clip-${this.chartSettings.settings.svgId})`)
    }
      
    renderAxis() {
        const xAndYOption = this.chartUtils.getdomainXandY()
    
        const inner_width = this.chartSettings.settings.width - this.chartSettings.settings.margins.left - this.chartSettings.settings.margins.right
        const inner_height = this.chartSettings.settings.height - this.chartSettings.settings.margins.top - this.chartSettings.settings.margins.bottom
    
        //axis
        const xAxis = d3.axisBottom(xAndYOption.x).ticks(this.chartSettings.settings.gridSize);
        const yAxis = d3.axisLeft(xAndYOption.y).ticks(this.chartSettings.settings.gridSize);
    
        //grid
        const xGrid = d3.axisBottom(xAndYOption.x).tickSize(-inner_height).tickFormat(() => '').ticks(this.chartSettings.settings.gridSize)
        const yGrid = d3.axisLeft(xAndYOption.y).tickSize(-inner_width).tickFormat(() => '').ticks(this.chartSettings.settings.gridSize)
    
        //render axis
        this.chartSettings.axisX = this.chartSettings.svg.selectAll('g.axis').append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom})`)
        .call(xAxis)
        .style('font-size', this.chartSettings.settings.fontSize)
    
        this.chartSettings.axisY = this.chartSettings.svg.selectAll('g.axis').append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${this.chartSettings.settings.margins.left}, 0)`)
        .call(yAxis)
        .style('font-size', this.chartSettings.settings.fontSize)
    
        //render grid
        this.chartSettings.gridX = this.chartSettings.svg.selectAll('g.axis').append('g')
        .attr('class', 'x grid')
        .attr('transform', `translate(0, ${this.chartSettings.settings.height - this.chartSettings.settings.margins.bottom})`)
        .style('opacity', '0.3')
        .call(xGrid)
    
        this.chartSettings.gridY = this.chartSettings.svg.selectAll('g.axis').append('g')
        .attr('class', 'y grid')
        .attr('transform', `translate(${this.chartSettings.settings.margins.left}, 0)`)
        .style('opacity', '0.3')
        .call(yGrid)
    }
    
    renderData() {
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