import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';
import {hasRole} from '../services/keycloak.service'

export const loginGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  if (
    hasRole("TUTOR") &&
    (
      state.url === '/principal/cadastro-aplicacao-vacina' ||
      state.url === '/cadastro-publicacao' ||
      state.url === '/historico-aplicacoes'
    )
  ) {
    Swal.fire({
      icon: "warning",
      title: "Rota não permitida pro seu tipo de Usuário",
    });

    router.navigate(['principal/animal']);
    return false;
  }

  if (
    hasRole("ENTIDADE") &&
    state.url === '/cadastro-aplicacao-vacina'
  ) {
    Swal.fire({
      icon: "warning",
      title: "Rota não permitida pro seu tipo de Usuário",
    });

    return false;
  }

  return true;
};