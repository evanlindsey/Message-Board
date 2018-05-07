import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AppService } from '../services/app.service';

@Component({
  selector: 'app-login',
  template: `
    <mat-card>
      <h1>Login</h1>
      <form [formGroup]="form" (ngSubmit)="onLogin()">
        <div class="field-container">
          <mat-form-field>
            <input matInput placeholder="Email" formControlName="userName" type="email">
          </mat-form-field>
          <br />
          <mat-form-field>
            <input matInput placeholder="Password" formControlName="password" type="password">
          </mat-form-field>
          <button mat-raised-button color="primary" [disabled]="!form.valid">Login</button>
        </div>
      </form>
    </mat-card>
  `
})
export class LoginComponent {

  form;

  constructor(private fb: FormBuilder, public app: AppService) {
    this.form = fb.group({
      userName: ['', [Validators.required, app.emailValid()]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.form.valid) {
      this.app.login(this.form.value);
    }
  }

}
