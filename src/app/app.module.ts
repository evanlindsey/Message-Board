import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// UI
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { LoadingModule } from 'ngx-loading';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { NavComponent } from './nav/nav.component';

// Services
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { HubService } from './services/hub.service';
import { MsgService } from './services/msg.service';

// Router
const routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'messages',
  component: MessagesComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessagesComponent,
    NavComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    LoadingModule
  ],
  providers: [AuthGuard, HubService, MsgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
