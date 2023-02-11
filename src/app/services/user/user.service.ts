import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmailToUserRequest } from "src/app/models/user/EmailToUserRequest";
import { ResetPasswordRequest } from "src/app/models/user/ResetPasswordRequest";
import { UpdateUserDataByAdminRequest } from "src/app/models/user/UpdateUserDataByAdminRequest";
import { UpdateUsersPasswordRequest } from "src/app/models/user/UpdateUsersPasswordRequest";
import { UserDetailsResponse } from "src/app/models/user/UserDetailsResponse";
import { UserRequest } from "src/app/models/user/UserRequest";
import { UserWrapper } from "src/app/models/user/UserWrapper";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient){}

    public getUsers(params: any, page: number, size: number): Observable<UserWrapper> {
        return this.http.post<UserWrapper>(
          'http://localhost:8080/api/' + 'users/' + 'page=' + page + '/size=' + size,
          params,
        );
    }

    public createUser(params: UserRequest): Observable<any> {
        return this.http.post<any>('http://localhost:8080/api/' + 'user/save', params);
    }

    public editUser(params: UpdateUserDataByAdminRequest, uuid: string): Observable<any> {
        return this.http.put<any>('http://localhost:8080/api/' + 'user/uuid=' + uuid + '/edit', params);
    }

    public getUser(uuid: String): Observable<UserDetailsResponse> {
        return this.http.get<UserDetailsResponse>(
          'http://localhost:8080/api/user/uuid=' + uuid,
        );
    }

    public sendMailFromUserData(params: EmailToUserRequest, uuid: string): Observable<any> {
        return this.http.post<any>('http://localhost:8080/api/' + 'user/uuid=' + uuid + '/sendMailFromUserData', params);
    }

    public resetPassword(params: ResetPasswordRequest): Observable<any> {
        return this.http.put<any>('http://localhost:8080/api/' + 'user/resetPassword', params);
    }

    public updatePassword(params: UpdateUsersPasswordRequest, uuid: string): Observable<any> {
        return this.http.put<any>('http://localhost:8080/api/' + 'user/uuid=' + uuid + '/updatePassword', params);
    }

}