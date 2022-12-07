import { Line, Dot } from "./lines-and-dots-data.interface";

export interface Margins {
    left: number;
    right: number;
    bottom: number;
    top: number;
}

export interface AxisName {
    x: string;
    y: string;
}

export interface BasicChartSettings {
    chartData: (Line | Dot)[];
    svgId: string;
    fontSize?: number;
    width?: number;
    height?: number;
    margins?: Margins;
    axisName?: AxisName;
    gridSize?: number;
    range?: {x: number[], y: number[]}
}

export interface ChartSettings extends BasicChartSettings {
    selectRange?: boolean;
    zoom?: boolean;
    cursor?: boolean;
    lineHandlers?: boolean;
}