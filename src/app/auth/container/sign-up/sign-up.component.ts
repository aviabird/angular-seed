import { LoginComponent } from './../login/login.component';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Authenticate } from '../../models/user';
import * as Auth from '../../store/actions/auth.actions';

@Component({
  selector: 'app-sign-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-sign-up-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async">
    </app-sign-up-form>
  `,
  styles: []
})
export class SignUpComponent extends LoginComponent implements OnInit {

  onSubmit($event: Authenticate) {
    this.store.dispatch(new Auth.Register($event));
  }
}
