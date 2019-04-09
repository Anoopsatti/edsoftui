import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string;
  constructor(
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.title = 'Edsoft Technologies';
  }

  onHandleLogout() {
    this.authService.logOutUser();
    this.ngFlashMessageService.showFlashMessage({
      messages: ['You are Logged out!'],
      dismissible: true,
      timeout: 5000,
      type: 'info'
    });
    this.router.navigate(['']);
  }
}
