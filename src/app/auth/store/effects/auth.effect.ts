import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';

import { AuthService } from '../../services/auth.service';
import * as Auth from '../actions/auth.actions';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$
    .ofType(Auth.LOGIN)
    .map((action: Auth.Login) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .login(auth)
        .map(user => new Auth.LoginSuccess({ user }))
        .catch(error => of(new Auth.LoginFailure(error)))
    );

  @Effect()
  register$ = this.actions$
    .ofType(Auth.REGISTER)
    .map((action: Auth.Register) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .register(auth)
        .map(user => new Auth.LoginSuccess({ user }))
        .catch(error => of(new Auth.LoginFailure(error)))
    );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(Auth.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/']));

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT)
    .map((action: Auth.LoginRedirect) => action.payload)
    .do(params => {
      this.router.navigate(['/auth/login'], {...params});
    });

  @Effect({ dispatch: false })
  logoutRedirect$ = this.actions$
    .ofType(Auth.LOGOUT)
    .exhaustMap(auth =>
      this.authService
        .logout()
        .map(() => this.router.navigate(['/auth/login']))
        .catch(error => of(new Auth.LoginFailure(error)))
    );

  @Effect()
  authorized$ = this.actions$
    .ofType(Auth.AUTHORIZED)
    .switchMap(() => this.authService.authorized())
    .filter<boolean>(status => status)
    .switchMap(() => this.authService.current_user())
    .map(user => new Auth.LoginSuccess({ user }));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }
}
