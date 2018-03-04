import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';

@Injectable()
export class AppService {

  isLoading: EventEmitter<boolean> = new EventEmitter(true);

  private AUTH_URL = environment.api_url + 'api/auth';
  private TOKEN_KEY = 'token';
  private NAME_KEY = 'name';

  user = {
    firstName: '',
    lastName: ''
  };

  constructor(private http: Http, private sb: MatSnackBar, private router: Router) { }

  private handleError(error) {
    this.isLoading.emit(false);
    if (typeof window !== 'undefined') {
      this.sb.open(error, 'close');
    }
  }

  get tokenHeader() {
    let header = new Headers;
    if (typeof window !== 'undefined') {
      header = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY) });
    }
    return new RequestOptions({ headers: header });
  }

  get name() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.NAME_KEY);
    } else {
      return null;
    }
  }

  get isAuthenticated() {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(this.TOKEN_KEY);
    } else {
      return null;
    }
  }

  private authenticate(res) {
    const authResponse = res.json();
    if (!authResponse.token) {
      return;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, authResponse.token);
      localStorage.setItem(this.NAME_KEY, authResponse.firstName);
    }
    this.router.navigate(['/']);
  }

  private authRequest(endpoint, payload) {
    this.isLoading.emit(true);
    this.http.post(this.AUTH_URL + endpoint, payload).subscribe(res => {
      this.isLoading.emit(false);
      this.authenticate(res);
    }, error => {
      this.handleError(error.statusText);
    });
  }

  register(userData) {
    delete userData.confirmPassword;
    this.authRequest('/register', userData);
  }

  login(loginData) {
    this.authRequest('/login', loginData);
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.NAME_KEY);
    }
    this.router.navigate(['/']);
  }

  getUser() {
    this.isLoading.emit(true);
    this.http.get(this.AUTH_URL + '/me', this.tokenHeader).map(res => res.json()).subscribe(res => {
      this.isLoading.emit(false);
      this.user.firstName = res.firstName;
      this.user.lastName = res.lastName;
    }, error => {
      this.handleError(error.statusText);
    });
  }

  updateUser() {
    this.isLoading.emit(true);
    this.http.put(this.AUTH_URL + '/update', this.user, this.tokenHeader).map(res => res.json()).subscribe(res => {
      this.isLoading.emit(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.NAME_KEY, res.firstName);
      }
    }, error => {
      this.handleError(error.statusText);
    });
  }

}
