import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

// UI
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatFormFieldModule
} from '@angular/material';
import { LoadingModule } from 'ngx-loading';

// Components
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { MessagesComponent } from './messages/messages.component';

// Services
import { AppService } from './services/app.service';
import { MsgService } from './services/msg.service';
import { HubService } from './services/hub.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

// Router
const routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'user',
  component: UserComponent,
  canActivate: [AuthGuard]
}, {
  path: 'messages',
  component: MessagesComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatFormFieldModule,
    LoadingModule
  ],
  providers: [AppService, MsgService, HubService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
