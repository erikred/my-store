import { CanActivateFn } from '@angular/router';
//import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (route, state) => {
  //const tokenService:TokenService = inject(TokenService);
  const authService:AuthService = inject(AuthService);
  const router:Router = inject(Router);

  //if(tokenService.getToken()){
    //return true;
  //}else{
    //router.navigate(['/home']);
    //return false;
  //}

  return authService.user$
  .pipe(
    map(user => {
      if(!user){
        router.navigate(['/home']);
        return false;
      }
      return true;
    })
  )
};
