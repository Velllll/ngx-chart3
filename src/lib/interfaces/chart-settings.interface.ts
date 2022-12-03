import { ILine, IDot } from "./chart-data.interface";

export interface IMargins {
    left: number;
    right: number;
    bottom: number;
    top: number;
}

export interface IAxisName {
    x: string;
    y: string;
}

export interface IChartSettings {
    chartData: (ILine | IDot)[];
    svgId: string;
    fontSize?: number;
    width?: number;
    height?: number;
    margins?: IMargins;
    axisName?: IAxisName;
    gridSize?: number;
    range?: {x: number[], y: number[]}
    selectRange?: boolean;
    zoom?: boolean;
    cursor?: boolean;
    lineHandlers?: boolean;
}