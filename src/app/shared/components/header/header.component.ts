import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: AuthenticationService
  ) { }

  logout() {
    this.auth.logout();
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  ngOnInit() {
  }

}
