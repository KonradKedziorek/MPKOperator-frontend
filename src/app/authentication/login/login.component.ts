import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Credentials } from 'src/app/models/Credentials';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private _router: Router,
  ) {}

  ngOnInit(): void {

  }

  form = new FormGroup({
    login: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  public async onSubmit() {

  let credentials: Credentials = {
    username: this.form.get("login")?.value!,
    password: this.form.get("password")?.value!,
  };
  await this.authService
    .singIn(credentials) 
    .toPromise()
    .then((result) => {
      this._router.navigate(["dashboard"]);
      console.log("POZYTYWNIE")
      console.log(result)
    })
    .catch((err) => {
      // this.showError(err.error.details, 3000);
      console.log("NEGATWNIE")

      console.log(err)
    });
  // dialogRef.close();
  }
}
