import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgProgressModule, NgProgressBrowserXhr, NgProgressInterceptor } from 'ngx-progressbar';

// Import HttpClientModule from @angular/common/http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth/interceptors/token.interceptor';

import { AppComponent } from './containers/app/app.component';

export const COMPONENTS = [
  AppComponent,
  HeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NgProgressModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
      ],
    };
  }
}
