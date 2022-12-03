# Chart3 

Library for build zoomable chart in angular app.

## Demo 

vercel: https://ng-chart3.vercel.app/

## Installation

```bash 
npm install ngx-chart3
```

<br>

```typescript 
import { NgxChart3Module } from 'ngx-chart3';

@NgModule({
    imports: [
        NgxChart3Module
    ]
})
```

<br>

Add chart in template and set chart settings.

```html
<ngx-chart3></ngx-chart3>
```

## Update chart

Use async pipe for update chart data and chart size.

```html
<ngx-chart3
    [chartData]="data$ | async"
    [width]="chartWidth$ | async"
    [height]="chartHeight$ | async"
></ngx-chart3>
```

<br>

## API Documentation

### Inputs

| Parameters    | Value                                                             | Settings example   |
| ------------- | --------------------------------------------------------------    | -------------      |
| chartData     | Array of data                                                     | [{lineName: 'line', <br> lineData: {x: [1, 2, 3], y: [5, 2, 9]}, <br> color: 'green', <br> opacity: 0.4, <br> strokeWidth: 6}, <br> {dotName: 'dots', <br> dotData: {x: [1, 2, 3], y: [4, 7, 9]}, <br> radious: 9}] |
| svgId         | SVG id for chart <br> (If not set, it will generate a random ID)  | 'my-svg-id'       |
| width         | Width of svg container                                            | 600               |
| height        | Height of svg <br> container                                      | 800               |
| margins       | Margins of svg  <br> container                                    | {left: 30, right: 30, bottom: 30, top: 30} |
| range         | Set range for chart                                               | {x: [0, 10], y: [0, 10]}                   | 
| selectRange   | Add tool for select <br> range of chart (Does't work with zoom)   | false                                      | 
| zoom          | Add tool for zoom chart <br> (Does't work with selectRange)       | true                                       |
| cursor        | Add crosshair cursor <br> and show current position of it         | true                                       |
| axisName      | Add names of axis                                                 | {x: '', y: ''}                             |
| gridSize      | Frequency of chart grid                                           | 5                                          |
