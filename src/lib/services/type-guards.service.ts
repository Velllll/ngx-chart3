import { Injectable } from "@angular/core";
import { ILine, IDot } from "../interfaces/chart-data.interface";

@Injectable()
export class GuardsService {

    constructor() {}

    isLine(data: ILine | IDot): data is ILine {
      return (data as ILine).lineData !== undefined
    }
    
    isDot(data: ILine | IDot): data is IDot {
      return (data as IDot).dotData !== undefined
    }
}