import { Component } from '@angular/core';

import { AppService } from '../services/app.service';

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar color="primary">
      <button mat-button routerLink="/">Home</button>
      <button mat-button routerLink="/messages">Messages</button>
      <a href="https://github.com/evanlindsey/Message-Board" mat-button>GitHub</a>
      <span style="flex: 1 1 auto;"></span>
      <button *ngIf="!app.isAuthenticated" mat-button routerLink="/login">Login</button>
      <button *ngIf="!app.isAuthenticated" mat-button routerLink="/register">Register</button>
      <button *ngIf="app.isAuthenticated" mat-button routerLink="/user">Welcome {{app.name}}</button>
      <button *ngIf="app.isAuthenticated" mat-button (click)="app.logout()">Logout</button>
    </mat-toolbar>
  `
})
export class NavComponent {

  constructor(public app: AppService) { }

}
