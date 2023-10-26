import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsComponent } from './rooms.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { HeaderModule } from '../header/header.module';
import { RoomsListComponent } from '../rooms-list/rooms-list.component';
import { RouteConfigToken } from 'src/app/services/routeConfig.service';


@NgModule({
  declarations: [
    RoomsComponent,
    RoomsListComponent,
    RoomsBookingComponent,
    RoomsAddComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    HeaderModule,
  ],
  providers: [
    {
      provide: RouteConfigToken,
      useValue: { title: 'Room' },
    },
  ],
})
export class RoomsModule { }
