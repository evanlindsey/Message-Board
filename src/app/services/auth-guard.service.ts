import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AppService } from './app.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private app: AppService, private router: Router) { }

  canActivate() {
    if (!this.app.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
