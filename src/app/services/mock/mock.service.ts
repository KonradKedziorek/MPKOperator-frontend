import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MockTest } from "src/app/models/mock/MockTest";
import { UserWrapper } from "src/app/models/user/UserWrapper";

@Injectable({
    providedIn: 'root',
})
export class MockService {
    constructor(private http: HttpClient){}

    public getStats(): Observable<MockTest> {
        return this.http.get<MockTest>(
          '/assets/mock/mainStats.json'
        );
    }

}