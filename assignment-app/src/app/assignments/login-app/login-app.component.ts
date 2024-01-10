import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent {
  constructor (private authService:AuthService, private router: Router) {}

  username: string = '';
  password: string = '';

  login(username: string, password: string): void {
    const user = this.authService.users.find((u) => u.username === username && u.password === password);

    if (user) {
      if (user.role == 'admin'){
        this.authService.logIn();
        this.authService.isAdmin()
        alert("Vous êtes connectés en tant qu'admin")
      } else {
        this.authService.logIn();
        alert("Vous êtes connectés en tant qu'user")
      }
    } else {
      this.authService.logOut();
      alert("Vous n'êtes pas connectés")
    }
    this.router.navigate(["/home"])
  }
}
