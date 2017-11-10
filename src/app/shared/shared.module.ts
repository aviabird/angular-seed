import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastyModule} from 'ng2-toasty';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  declarations: [],
  providers: [
  ],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    ToastyModule,
    ModalModule,
    BsDropdownModule,
  ]
})
export class SharedModule { }
