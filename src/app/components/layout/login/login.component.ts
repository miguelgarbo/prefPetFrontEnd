import { Component, EventEmitter, Output, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { login, getUser, hasRole , isLoggedIn} from '../../../services/keycloak.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Input() tipoLogin!: string;
  @Output() loginSucesso = new EventEmitter<void>();

  router = inject(Router);

  ngOnInit() {
    setTimeout(() => {
      if (isLoggedIn()) {
        this.verificarUsuario();
      }
    }, 300);
  }


  login() {
    login();
  }


  verificarUsuario() {
    const user = getUser();
    console.log("USUARIO VERIFICANDO", user);

    if (!user) return;

    if (hasRole('VETERINARIO')) {
      this.router.navigate(['/principal/cadastro-aplicacao-vacina']);

    } else if (hasRole('TUTOR') || hasRole('ADMIN')) {
      this.router.navigate(['/principal/animal']);

    } else if (hasRole('ENTIDADE')) {
      this.router.navigate(['/principal/cadastro-publicacao']);
    }
  }

  cadastrarRota() {
    this.router.navigate(['cadastro-usuario']);
  }
}