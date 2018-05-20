import { Component } from '@angular/core';

import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar>
      <button mat-button routerLink="/">Home</button>
      <button mat-button routerLink="/messages">Messages</button>
      <a mat-button href="https://github.com/evanlindsey/Message-Board" target="_blank">GitHub</a>
      <span style="flex: 1 1 auto;"></span>
      <a mat-button *ngIf="!auth.isAuthenticated" href="{{auth.AUTH_URL}}/login">Login</a>
      <a mat-button *ngIf="!auth.isAuthenticated" href="{{auth.AUTH_URL}}/register">Register</a>
      <a mat-button *ngIf="auth.isAuthenticated" href="{{auth.AUTH_URL}}/user">Welcome {{auth.name}}</a>
      <button *ngIf="auth.isAuthenticated" mat-button (click)="auth.logout()">Logout</button>
    </mat-toolbar>
  `,
  styles: []
})
export class NavComponent {

  constructor(public auth: AuthGuardService) { }

}
