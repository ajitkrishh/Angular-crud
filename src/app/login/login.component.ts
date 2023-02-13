import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Subject, filter, takeUntil, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginValid = false;

  public myLoginForm: FormGroup = new FormGroup({});
  private user = {
    "username": '',
    "password": ""
  };
  private userlist = AppComponent.userlist;
  private isloggedin = AppComponent.isloggedin;
  constructor(
    private _router: Router
  ) { }

  public ngOnInit(): void {
    if(this.isloggedin){
      this._router.navigate(['./dashboard'])
    }
    this.loginValid = true;
    this.myLoginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  public myError = (controlName: string, errorName: string) => {
    return this.myLoginForm.controls[controlName].hasError(errorName);
  }

  public onSubmit(): void {
    console.log("logging in");
    this.user = { ... this.myLoginForm.value }
    let flag = false;
    // this.loginValid != this.loginValid;
    for (let Activeuser of this.userlist) {
      if ((Activeuser.username === this.user.username) && (Activeuser.password === this.user.password)) {
        this.loginValid = true;
        flag = true;
        AppComponent.isloggedin= true;

        this._router.navigate(['./dashboard'])
      } else {
        console.log(this.loginValid);
      }
    }
    if (!flag) {
      this.loginValid = false;
    }
  }
}