import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { NavComponent } from './nav/nav.component';

import { MsgService } from './services/msg.service';

@Component({
  selector: 'app-root',
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
    <ngx-loading [show]="loading"></ngx-loading>
  `,
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  loading = false;

  private APP_KEY = 'app';
  private APP_VAL = 'Message-Board';

  constructor(private msg: MsgService) { }

  ngOnInit() {

    localStorage.setItem(this.APP_KEY, this.APP_VAL);

    this.msg.isLoading.subscribe((state) => this.loading = state);

  }

}
