import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any;
  constructor(private authService: AuthService) { }

  fetchLocalUser() {
    this.authService.getDashBoard().subscribe((data) => {
      this.userData = data;
    });
  }
  ngOnInit() {
    this.fetchLocalUser();
  }

}
