export interface Colors {
  colors: string[],
  percent: number[],
}

export interface BarData {
  lable: string,
  y: number,
  colors?: Colors[] | string,
}