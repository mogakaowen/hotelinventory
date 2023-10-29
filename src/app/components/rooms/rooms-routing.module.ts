import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { activateChildGuard } from 'src/app/guards/activate-child.guard';


const routes: Routes = [
  {path: '', component: RoomsComponent, 
  canActivateChild: [activateChildGuard],
  children: [
       {path: 'add', component: RoomsAddComponent}, 
      //  {path: ':id', component: RoomsBookingComponent}, 
      ]}, // this is a nested route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
