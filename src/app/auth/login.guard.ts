import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService) 
  let router = inject(Router)

  if(loginService.hasRole("TUTOR") && (state.url=='/cadastro-aplicacao-vacina' || state.url=='/cadastro-publicacao')){

    console.log("cheguei aq")

      Swal.fire({
              icon: "warning",
              title: "Rota não permitida pro seu tipo de Usuário",
            });

      router.navigate(['principal/animal']);


    return false
  }

  

  return true;
};
