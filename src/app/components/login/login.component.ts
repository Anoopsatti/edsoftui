import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroupTemplate : FormGroup;
  
  constructor(
    private router : Router,    
    private formBuilder : FormBuilder,
    private ngFlashMessageService : NgFlashMessageService,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.loginFormGroupTemplate = this.formBuilder.group({
      email : ['' , Validators.required],
      password : ['' , Validators.required]
    });
  }

  onLoginSubmit(){
    // If there are no errors in validators,then trying to sign in using credentials
    this.authService.authenticateUser(this.loginFormGroupTemplate.value).subscribe((data:User) => {
      console.log("user token : "+(data.token));
      console.log("user token : " + data.user);
      if(data.success){
        this.authService.storeUserData(data.token , data.user);
        this.ngFlashMessageService.showFlashMessage({
          messages:['yahhh you are logged in...'],
          dismissible : true,
          timeout:5000,
          type : 'success'
        });
        this.router.navigate(['meeting']);
      }else{
        this.ngFlashMessageService.showFlashMessage({
          messages:['user not found pls check your credentials while signing in..'],
          dismissible : true,
          timeout:5000,
          type:'danger'
        });
        this.router.navigate(['login']);
      }
    });
  }

}
