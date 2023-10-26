import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { LoginService } from '../components/login/login.service';
import { inject } from '@angular/core';

export const matchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return inject(LoginService).isLoggedIn ? true: inject(Router).parseUrl('/login');
};
