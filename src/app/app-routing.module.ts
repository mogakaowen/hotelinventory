import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { activateGuard } from './guards/activate.guard';
import { matchGuard } from './guards/match.guard';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'employee', component: EmployeeComponent, canActivate:[activateGuard]},
  {path: 'rooms', loadChildren: () => import('./components/rooms/rooms.module').then(m => m.RoomsModule), canActivate:[activateGuard],canMatch: [matchGuard]},
  { path: 'booking', loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule), canActivate:[activateGuard], canMatch: [matchGuard] }, // lazy loading
  {path: '**', component: NotFoundComponent}, // wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }