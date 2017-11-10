import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { _throw } from 'rxjs/observable/throw';
import { User, Authenticate } from '../models/user';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private toastyService: ToastyService) { }

  /**
   *
   *
   * @param {Authenticate} { username, password }
   * @returns {Observable<User>}
   * @memberof AuthService
   */
  login({ username, password }: Authenticate): Observable<User> {
    return this.http
      .post<{ data: User }>('auth/sign_in', { email: username, password }, { observe: 'response' })
      .map(res => {
        const user = res.body.data;
        this.setTokenInLocalStorage(res);
        return user;
      })
      .do(
        _ => _,
        (err) => this.toastyService.error({
          title: 'ERROR!!',
          msg: err.error.errors[0],
        })
      );
  }

  /**
   *
   *
   * @param {Authenticate} { name, username, password }
   * @returns {Observable<User>}
   * @memberof AuthService
   */
  register({ name, username, password }: Authenticate): Observable<User> {
    return this.http
      .post<{ data: User }>('auth', { name, email: username, password }, { observe: 'response' })
      .map(res => {
        const user = res.body.data;
        this.setTokenInLocalStorage(res);
        return user;
      })
      .do(
        _ => _,
        (err) => this.toastyService.error({
          title: 'ERROR!!',
          msg: err.error.errors.full_messages.join('<br>'),
        })
      );
  }

  /**
   *
   *
   * @returns {Observable<boolean>}
   * @memberof AuthService
   */
  authorized(): Observable<boolean> {
    return this.http
      .get<{ status: boolean }>('users/check_authenticated')
      .retry(2)
      .map(body => body.status);
  }

  /**
   *
   *
   * @returns {Observable<User>}
   * @memberof AuthService
   */
  current_user(): Observable<User> {
    return this.http
      .get<User>('users/whoami')
      .map(body => body);
  }

  /**
   *
   *
   * @returns
   *
   * @memberof AuthService
   */
  logout() {
    return this.http
      .delete<{ success: boolean }>('auth/sign_out')
      .map(body => {
        localStorage.removeItem('user');
        return body.success;
      });
  }

  /**
   *
   *
   * @returns {{}}
   * @memberof AuthService
   */
  getTokenHeader(): HttpHeaders {
    const user = ['undefined', null]
      .indexOf(localStorage.getItem('user')) === -1 ?
      JSON.parse(localStorage.getItem('user')) : {};

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'token-type': 'Bearer',
      'access_token': user.access_token || [],
      'client': user.client || [],
      'uid': user.uid || []
    });
  }

  private setTokenInLocalStorage(res): void {
    const user_data = {
      ...res.body.data,
      access_token: res.headers.get('access-token'),
      client: res.headers.get('client')
    };
    const jsonData = JSON.stringify(user_data);
    localStorage.setItem('user', jsonData);
  }
}
