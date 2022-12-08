import { Injectable } from "@angular/core";
import { Line, Dot } from "../../../interfaces/mix-data.interface";

@Injectable()
export class GuardsService {

    constructor() {}

    isLine(data: Line | Dot): data is Line {
      return (data as Line).lineData !== undefined
    }
    
    isDot(data: Line | Dot): data is Dot {
      return (data as Dot).dotData !== undefined
    }
}