import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion de devoirs';
  opened = false

  constructor (
    public authService: AuthService,
    private router: Router) { }

  logout() {
    this.authService.logOut();
  }

    addAssignment() {
    if (this.authService.loggedIn) {
      this.router.navigate(["/add"])
    } else {
      this.router.navigate(["/home"])
    }
  }
}
