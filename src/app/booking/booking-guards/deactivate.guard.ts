import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { BookingComponent } from '../booking.component';

export const deactivateGuard: CanDeactivateFn<BookingComponent> = (component: BookingComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) => {
  return component.bookingForm.dirty ? confirm('Are you sure you want to discard your changes?') : true;

};
