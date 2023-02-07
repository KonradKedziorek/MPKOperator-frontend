import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BusDetailsResponse } from "src/app/models/bus/BusDetailsResponse";
import { BusRequest } from "src/app/models/bus/BusRequest";
import { BusWrapper } from "src/app/models/bus/BusWrapper";

@Injectable({
    providedIn: 'root',
})
export class BusService {
    constructor(private http: HttpClient) {}

    public getBuses(params: any, page: number,  size: number): Observable<BusWrapper> {
        return this.http.post<BusWrapper>(
            'http://localhost:8080/api/' + 'buses/' + 'page=' + page + '/size=' + size,
            params,
        );
    }

    public createBus(params: BusRequest): Observable<any> {
        return this.http.post<any>('http://localhost:8080/api/' + 'bus/save', params);
    }

    public getBus(uuid: String): Observable<BusDetailsResponse> {
        return this.http.get<BusDetailsResponse>(
          'http://localhost:8080/api/bus/uuid=' + uuid,
        );
    }

    public changeStatus(uuid: String, status: String): Observable<BusDetailsResponse> {
        return this.http.get<BusDetailsResponse>(
          'http://localhost:8080/api/bus/uuid=' + uuid + '/status=' + status,
        );
    }
}