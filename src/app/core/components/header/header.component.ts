import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: false;
  @Output() logoutClick = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  logout() { this.logoutClick.emit(); }

}
