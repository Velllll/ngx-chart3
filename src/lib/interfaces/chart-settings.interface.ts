import { BarData } from "./bar-data.interface";
import { Line, Dot } from "./mix-data.interface";

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
    svgId: string;
    fontSize?: number;
    width?: number;
    height?: number;
    margins?: Margins;
}

export interface BarChartSettings extends BasicChartSettings {
    chartData: BarData[],
    rotate?: number,
    barPadding: number,
    axisName?: AxisName;
}

export interface MixChartSettings extends BasicChartSettings {
    chartData: (Line | Dot)[];
    selectRange?: boolean;
    zoom?: boolean;
    cursor?: boolean;
    lineHandlers?: boolean;
    gridSize?: number;
    range?: {x: number[], y: number[]};
    axisName?: AxisName;
}