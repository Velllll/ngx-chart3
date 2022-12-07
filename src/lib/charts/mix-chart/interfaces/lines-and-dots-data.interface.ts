export interface LineData {
    x: number[]; 
    y: number[];
}

export interface DotData {
    x: number[];
    y: number[];
}

export interface ExtraSettingsLine {
    color?: string;
    opacity?: number;
    strokeWidth?: number;
}

export interface Line extends ExtraSettingsLine {
    lineName: string;
    lineData: LineData;
}

export interface ExtraSettingsDot {
    color?: string;
    opacity?: number;
    radious?: number;
}

export interface Dot extends ExtraSettingsDot{
    dotName: string;
    dotData: DotData;
}