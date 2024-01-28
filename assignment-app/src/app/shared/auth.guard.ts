import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {MatSnackBar} from "@angular/material/snack-bar";

export const AuthGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  let snackBar = inject(MatSnackBar);

  return authService.isLogged()
  .then(authentifie => {
    if (authentifie) {
      console.log("Vous êtes admin et êtes autorisé à naviguer");
      return true;
    } else {
      snackBar.open("Vous n'êtes pas admin et n'êtes pas autorisé à naviguer", 'Close', {
        duration: 5000,
      });
      router.navigate(["/home"])
      return false;
    }
  })
};
