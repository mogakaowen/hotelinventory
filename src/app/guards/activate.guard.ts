import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../components/login/login.service';
import { inject } from '@angular/core';

export const activateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // return inject(LoginService).Login('', '') ? true: inject(Router).parseUrl('/login');
  return inject(LoginService).isLoggedIn ? true: inject(Router).parseUrl('/login');
};
