import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentReply } from 'src/app/models/comment/CommentReply';
import { ComplaintDetailsResponse } from 'src/app/models/complaint/ComplaintDetailsResponse';
import { ComplaintRequest } from 'src/app/models/complaint/ComplaintRequest';
import { ComplaintWrapper } from 'src/app/models/complaint/ComplaintWrapper';
@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  constructor(private http: HttpClient) {}

  public getComplaints(params: any, page: number, size: number): Observable<ComplaintWrapper> {
    return this.http.post<ComplaintWrapper>(
      'http://localhost:8080/api/' + 'complaints/' + 'page=' + page + '/size=' + size,
      params,
    );
  }

  public createComplaint(params: ComplaintRequest): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/' + 'complaint/save', params);
  }

  public getComplaint(uuid: String): Observable<ComplaintDetailsResponse> {
    return this.http.get<ComplaintDetailsResponse>(
      'http://localhost:8080/api/complaint/uuid=' + uuid,
    );
  }

  public addComment(content: any, uuid: String): Observable<CommentReply> {
    return this.http.post<CommentReply>(
      'http://localhost:8080/api/complaint/uuid=' + uuid,
      content,
    );
  }
}
