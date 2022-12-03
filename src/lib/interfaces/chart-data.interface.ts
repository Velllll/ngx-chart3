export interface ILineData {
    x: number[]; 
    y: number[];
}

export interface IDotData {
    x: number[];
    y: number[];
}

export interface IExtraSettingsLine {
    color?: string;
    opacity?: number;
    strokeWidth?: number;
}

export interface ILine extends IExtraSettingsLine {
    lineName: string;
    lineData: ILineData;
}

export interface IExtraSettingsDot {
    color?: string;
    opacity?: number;
    radious?: number;
}

export interface IDot extends IExtraSettingsDot{
    dotName: string;
    dotData: IDotData;
}