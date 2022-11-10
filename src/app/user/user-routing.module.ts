import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GadgetDetailsComponent } from './gadget-details/gadget-details.component';

const routes: Routes = [
  {path: 'dashboard',component: DashboardComponent},
  {path: 'gadget-details/:id',component: GadgetDetailsComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
