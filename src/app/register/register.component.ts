import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AppService } from '../services/app.service';

@Component({
  selector: 'app-register',
  template: `
    <mat-card>
      <h1>Register</h1>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="field-container">
          <mat-form-field>
            <input matInput placeholder="First Name" formControlName="firstName">
          </mat-form-field>
          <br />
          <mat-form-field>
            <input matInput placeholder="Last Name" formControlName="lastName">
          </mat-form-field>
          <br />
          <mat-form-field>
            <input matInput placeholder="Email" type="email" formControlName="userName">
          </mat-form-field>
          <br />
          <mat-form-field>
            <input matInput placeholder="Password" type="password" formControlName="password">
          </mat-form-field>
          <br />
          <mat-form-field>
            <input matInput placeholder="Confirm Password" type="password" formControlName="confirmPassword">
          </mat-form-field>
          <br />
          <span *ngIf="form.errors?.mismatchedFields">Passwords do not match</span>
          <br />
          <button mat-raised-button color="primary" [disabled]="!form.valid">Register</button>
        </div>
      </form>
    </mat-card>
  `
})
export class RegisterComponent {

  form;

  constructor(private fb: FormBuilder, private app: AppService) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, app.emailValid()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: matchingFields('password', 'confirmPassword') });
  }

  onSubmit() {
    if (this.form.valid) {
      this.app.register(this.form.value);
    }
  }

}

function matchingFields(field1, field2) {
  return form => {
    if (form.controls[field1].value !== form.controls[field2].value) {
      return { mismatchedFields: true };
    }
  };
}
