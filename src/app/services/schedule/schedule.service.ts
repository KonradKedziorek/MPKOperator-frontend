import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MockTest } from "src/app/models/mock/MockTest";
import { ScheduleResponse } from "src/app/models/schedule/ScheduleResponse";
import { UserWrapper } from "src/app/models/user/UserWrapper";

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {
    constructor(private http: HttpClient){}

    // public getFileByPath(uuid: string) {
    //     return this.http.get('http://localhost:8080/api/schedule/uuid=' + uuid, {
    //       responseType: 'blob',
    //       reportProgress: true,
    //     });
    // }

    public getSchedules(name: string): Observable<Array<ScheduleResponse>> {
      return this.http.get<Array<ScheduleResponse>>(
        'http://localhost:8080/api/schedules/name=' + name,
      );
    }

    public getFileByPath() {
      return this.http.get("http://localhost:8080/api/schedule/uuid=c6a21bc6-84c4-4c58-b9a5-48d1e2ef209b", {
        responseType: 'blob',
        reportProgress: true,
      });
  }
}