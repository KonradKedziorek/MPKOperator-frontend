import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthResponse } from "src/app/models/AuthResponse";
import { Cookie } from "src/app/models/Cookie";
// import { Cookie } from "src/app/models/auth/Cookie";
import { Credentials } from "src/app/models/Credentials";
import { LoggedInResponse } from "src/app/models/LoggedInResponse";
// import { LoggedInResponse } from "src/app/models/auth/LoggedInResponse";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public singIn(credentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      "http://localhost:8080/api/login",
      credentials,
      { withCredentials: true }
    );
  }

  public loggedIn(): Observable<LoggedInResponse> {
    return this.http.get<LoggedInResponse>(
        "http://localhost:8080/api/logged-in",
      {
        withCredentials: true,
      }
    );
  }

  public logout(): Observable<Cookie> {
    return this.http.get<Cookie>(
        "http://localhost:8080/api/logout",
      {
        withCredentials: true,
      }
    );
  }
}
