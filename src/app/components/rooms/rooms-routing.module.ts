import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsAddComponent } from '../rooms-add/rooms-add.component';
import { RoomsBookingComponent } from '../rooms-booking/rooms-booking.component';
import { RoomsComponent } from './rooms.component';

const routes: Routes = [
  { 
    // path is blank since we are lazy-loading rooms component and its children, the actual path is defined in app-routing.module.ts
    path: '',
    component: RoomsComponent,
    children: [
      { path: 'add', component: RoomsAddComponent },
      { path: ':id', component: RoomsBookingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
