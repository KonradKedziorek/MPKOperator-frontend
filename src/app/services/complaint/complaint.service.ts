import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ComplaintWrapper } from "src/app/models/complaint/ComplaintWrapper";
@Injectable({
  providedIn: "root",
})
export class ComplaintService {
  constructor(private http: HttpClient) {}

  public getComplaints(
    params: any,
    page: number,
    size: number
  ): Observable<ComplaintWrapper> {
    return this.http.post<ComplaintWrapper>(
        "http://localhost:8080/api/" + 'complaints/' + 'page=' + page + '/size=' + size,
      params
    );
  }

}
