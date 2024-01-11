import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';
import { deactivateGuard } from './booking-guards/deactivate.guard';

const routes: Routes = [{ path: '', title: 'Booking', component: BookingComponent, canDeactivate: [deactivateGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
