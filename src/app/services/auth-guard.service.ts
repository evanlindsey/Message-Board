import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  private NAME_KEY = 'name';
  private TOKEN_KEY = 'token';

  AUTH_URL = environment.base_url + environment.auth_app;

  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  canActivate() {
    if (!this.isAuthenticated) {
      window.location.replace(this.AUTH_URL + '/login');
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/']);
  }

}
