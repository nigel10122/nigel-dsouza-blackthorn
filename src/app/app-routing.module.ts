import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CheckoutComponent} from './checkout/checkout.component'
import {AttendeeComponent} from './attendee/attendee.component'

const routes: Routes = [
  { path:'', component: CheckoutComponent},
  { path:'attendees', component:AttendeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
