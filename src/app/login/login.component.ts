import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-login',
  template: `
    <mat-card>
      <h1>Login</h1>
      <form [formGroup]="form" (ngSubmit)="onLogin()">
        <mat-form-field>
          <input matInput placeholder="Email" formControlName="userName" type="email">
        </mat-form-field>
        <mat-form-field>
          <input matInput placeholder="Password" formControlName="password" type="password">
        </mat-form-field>
        <button mat-raised-button [disabled]="!form.valid" color="primary">Login</button>
      </form>
    </mat-card>
  `
})
export class LoginComponent {

  form;

  constructor(private fb: FormBuilder, public app: AppService) {
    this.form = fb.group({
      userName: ['', [Validators.required, emailValid()]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.form.valid) {
      this.app.login(this.form.value);
    }
  }

}

function emailValid() {
  return control => {
    const regex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regex.test(control.value) ? null : { invalidEmail: true };
  };
}
