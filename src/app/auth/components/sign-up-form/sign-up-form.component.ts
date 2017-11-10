import { LoginFormComponent } from './../login-form/login-form.component';
import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { fadeInAnimation } from '../../../shared/animations/fade-in.animation';

@Component({
  selector: 'app-sign-up-form',
  animations: [fadeInAnimation],
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent extends LoginFormComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  @HostBinding('@fadeInAnimation')
  public animateMe = true;

  ngOnInit() {
  }

}
