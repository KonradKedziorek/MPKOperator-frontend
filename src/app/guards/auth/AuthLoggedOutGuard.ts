import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
@Injectable()
export class AuthLoggedOutGuard implements CanActivate {
  async canActivate() {
    let booleanResult: boolean = false;
    await this.authService
      .loggedIn()
      .toPromise()
      .then((result) => {
        booleanResult = result?.loggedIn!;
      });
    if (booleanResult) {
      this.router.navigate(["dashboard"]);
    }
    return true;
  }
  constructor(private router: Router, private authService: AuthService) {}
}
