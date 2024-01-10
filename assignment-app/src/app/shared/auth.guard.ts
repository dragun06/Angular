import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  return authService.isLogged()
  .then(authentifie => {
    if (authentifie) {
      console.log("Vous êtes admin et êtes autorisé à naviguer");
      return true;
    } else {
      console.log("Vous n'êtes pas admin et n'êtes pas autorisé à naviguer");
      router.navigate(["/home"])
      return false;
    }
  })
};
