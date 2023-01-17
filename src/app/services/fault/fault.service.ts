import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommentReply } from "src/app/models/comment/CommentReply";
import { FaultDetailsResponse } from "src/app/models/fault/FaultDetailsResponse";
import { FaultRequest } from "src/app/models/fault/FaultRequest";
import { FaultWrapper } from "src/app/models/fault/FaultWrapper";
import { FaultHistoryResponse } from 'src/app/models/FaultHistoryResponse';

@Injectable({
    providedIn: 'root',
})
export class FaultService {
    constructor(private http: HttpClient) {}

    public getFaults(params: any, page: number,  size: number): Observable<FaultWrapper> {
        return this.http.post<FaultWrapper>(
            'http://localhost:8080/api/' + 'faults/' + 'page=' + page + '/size=' + size, 
            params,
        );
    }

    public createFault(params: FaultRequest): Observable<any> {
        return this.http.post<any>(
            'http://localhost:8080/api/' + 'fault/save', 
            params,
        );
    }

    public getFault(uuid: String): Observable<FaultDetailsResponse> {
        return this.http.get<FaultDetailsResponse>(
          'http://localhost:8080/api/fault/uuid=' + uuid,
        );
    }
    
    public addComment(content: any, uuid: String): Observable<CommentReply> {
        return this.http.post<CommentReply>(
          'http://localhost:8080/api/fault/uuid=' + uuid,
          content,
        );
    }

    public changeStatus(uuid: String, status: String): Observable<FaultDetailsResponse> {
        return this.http.get<FaultDetailsResponse>(
          'http://localhost:8080/api/fault/uuid=' + uuid + '/status=' + status,
        );
      }
    
      public getComplaintHistoryList(uuid: String): Observable<FaultHistoryResponse[]> {
        return this.http.get<FaultHistoryResponse[]>(
          'http://localhost:8080/api/faultHistories/uuid=' + uuid,
        );
      }
}