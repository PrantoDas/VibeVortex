import { Component, ViewChild } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  title: string = 'VibeVortex';
  userLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.initAuthState();
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.userLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.drawer.close().then(() => {
      this.userLoggedIn = false;
      this.authService.logout();
    });
  }
}
