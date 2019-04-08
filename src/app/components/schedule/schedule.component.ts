import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Post } from 'src/app/models/post.model';
import { HttpErrorResponse } from '@angular/common/http';
import flatpickr from '../../../../node_modules/flatpickr';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  scheduleFormGroupTemplate : FormGroup;

  // vlaues will be automatically updated on using ngModel 
  selectedRecordingValue : string = 'no';
  selectedTypeValue : string = 'private';

  // custom events for future use
  @Output()
  recordingTypeSelected : EventEmitter<string> =  new EventEmitter<string>();

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private ngFlashMessageService : NgFlashMessageService
  ) { }

  ngOnInit() {
    this.scheduleFormGroupTemplate = this.formBuilder.group({
      // creting a model for schedule form
      classTitle : ['' , Validators.required],
      classInfo : ['' , [Validators.required,Validators.maxLength(300)]],
      classDateTime : [flatpickr('.basicflatpickr' , {
        enableTime : true , minDate : "today",defaultDate : ["today"] , dateFormat : "Y-m-d H:i K"
      }),Validators.required],
      classDuration : [ 30, [Validators.required , Validators.max(150)]],
      classTimeZones : [],
      classRecording : [this.selectedRecordingValue , Validators.required],
      classType : [this.selectedTypeValue , Validators.required],
      aboutTeacher : ['' , Validators.required]
    });
  }

  onRecordingSelection(){
    console.log("selected recording type : " + this.selectedRecordingValue);
    this.recordingTypeSelected.emit(this.selectedRecordingValue);
  }
  onTypeSelection(){
    console.log("selected class Access : " + this.selectedTypeValue);
    this.recordingTypeSelected.emit(this.selectedTypeValue);
  }

  onScheduleSubmit(){
    this.authService.storeScheduleClass(this.scheduleFormGroupTemplate.value).subscribe(
      (data : Post) => {
        if (data.success) {
          this.ngFlashMessageService.showFlashMessage({
            messages: ['Class Successfully scheduled!'],
            dismissible: true,
            timeout: 5000,
            type: 'success'
          });
          this.router.navigate(['dashboard']);
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
        this.router.navigate(['schedule']);
        return false;
      }
    )
  }

}
