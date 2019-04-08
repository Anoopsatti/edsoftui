import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashAuthGuard } from './guards/dash-auth.guard';
import { AboutComponent } from './components/about/about.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { MeetingComponent } from './components/meeting/meeting.component';

const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'register' , component : RegisterComponent},
  {path : 'login' , component : LoginComponent},
  {path : 'dashboard' , component : DashboardComponent , canActivate : [DashAuthGuard]},
  {path : 'about' , component : AboutComponent},
  {path : 'schedule' , component : ScheduleComponent},
  {path : 'meeting' , component : MeetingComponent, canActivate : [DashAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
