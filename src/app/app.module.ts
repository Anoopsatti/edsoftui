import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import which we need to type manually
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { JwtModule } from '@auth0/angular-jwt';
import  { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { MeetingComponent } from './components/meeting/meeting.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    DashboardComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    ScheduleComponent,
    MeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,
    NgFlashMessagesModule,
    JwtModule,    
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
