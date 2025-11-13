import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService) 

  if(loginService.hasRole("USER") && state.url=='/buscar-chip'){

    alert("Rota Nao PErmitida pro seu tipo de usuario")
    return false
  }

  return true;
};
