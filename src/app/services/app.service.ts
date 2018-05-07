import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

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
    this.sb.open(error, 'close');
  }

  get tokenHeader() {
    let header = new Headers;
    header = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY) });
    return new RequestOptions({ headers: header });
  }

  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private authenticate(res) {
    const authResponse = res.json();
    if (!authResponse.token) {
      return;
    }
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.NAME_KEY, authResponse.firstName);
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
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.NAME_KEY);
    this.router.navigate(['/']);
  }

  getUser() {
    this.isLoading.emit(true);
    this.http.get(this.AUTH_URL + '/me', this.tokenHeader).pipe(map(res => res.json())).subscribe(res => {
      this.isLoading.emit(false);
      this.user.firstName = res.firstName;
      this.user.lastName = res.lastName;
    }, error => {
      this.handleError(error.statusText);
    });
  }

  updateUser() {
    this.isLoading.emit(true);
    this.http.put(this.AUTH_URL + '/update', this.user, this.tokenHeader).pipe(map(res => res.json())).subscribe(res => {
      this.isLoading.emit(false);
      localStorage.setItem(this.NAME_KEY, res.firstName);
    }, error => {
      this.handleError(error.statusText);
    });
  }

  emailValid() {
    return control => {
      const regex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return regex.test(control.value) ? null : { invalidEmail: true };
    };
  }

}
