import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Authenticate } from '../../models/user';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../store/reducers';
import * as Auth from '../../store/actions/auth.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async">
    </app-login-form>
  `,
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  pending$ = this.store.select(fromAuth.getLoginPagePending);
  error$ = this.store.select(fromAuth.getLoginPageError);
  returnUrl: string;
  redirectSubs: Subscription;

  constructor(
    public store: Store<fromAuth.State>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.store.dispatch(new Auth.Authorized());
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.redirectIfUserLoggedIn();
  }

  onSubmit($event: Authenticate) {
    this.store.dispatch(new Auth.Login($event));
  }

  redirectIfUserLoggedIn() {
    this.redirectSubs = this.store
      .select(fromAuth.getLoggedIn)
      .subscribe(authed =>
        authed === true ? this.router.navigate([this.returnUrl]) : null
      );
  }

  ngOnDestroy() {
    this.redirectSubs.unsubscribe();
  }

}
