import {Injectable} from '@angular/core';
import {CanLoad, Router, CanActivate} from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): boolean {
    const user = this.authService.getLoggedUser();
    if (!user) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
}
