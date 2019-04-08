import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Post } from 'src/app/models/post.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroupTemplate: FormGroup;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.registerFormGroupTemplate = this.formBuilder.group({
      // creating a model for this form
      fullName: ['', Validators.required],
      email: ['', Validators.email],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onRegisterSubmit() {
    this.authService.registerUser(this.registerFormGroupTemplate.value).subscribe(
      (data: Post) => {
      if (data.success) {
        this.ngFlashMessageService.showFlashMessage({
          messages: ['User Successfully Registered!'],
          dismissible: true,
          timeout: 5000,
          type: 'success'
        });
        this.router.navigate(['login']);
        return true;
      }
    },
    (error : HttpErrorResponse) => {
      this.ngFlashMessageService.showFlashMessage({
        messages: [error.error.message],
        dismissible: true,
        timeout: 5000,
        type: 'danger'
      });
      this.router.navigate(['register']);
      return false;
    }
    )
  }

}