import { Logout } from './../../../auth/store/actions/auth.actions';
import { AuthService } from './../../../auth/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import * as fromAuth from '../../../auth/store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store<fromAuth.State>
  ) {
    this.isLoggedIn$ = this.store.select(fromAuth.getLoggedIn);
  }

  logout() { this.store.dispatch(new Logout()); }
}
