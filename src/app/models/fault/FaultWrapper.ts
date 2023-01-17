import { Fault } from "./Fault";

export interface FaultWrapper {
    data: Array<Fault>;
    page: number;
    size: number;
  }