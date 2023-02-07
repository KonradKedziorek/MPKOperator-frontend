import { Bus } from "./Bus";

export interface BusWrapper {
    data: Array<Bus>;
    page: number;
    size: number;
}