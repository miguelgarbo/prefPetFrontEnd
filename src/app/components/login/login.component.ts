import {
  Component,
  inject,
  model,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router, Routes } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  modalService = inject(MdbModalService);
  @ViewChild('modalLogin') modalLogin!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  usuario!: string;
  senha!: string;

  router = inject(Router);
  // modalRef = inject(MdbModalRef<CadastroUsuarioComponent>); fechar modal

  logar() {
    if (this.usuario == 'admin' && this.senha == '12345') {
      this.router.navigate(['principal']);
    } else {
      alert('USUÁRIO E/OU SENHA INCORRETOS!!!');
    }
  }

  cadastrarRota(){
    this.router.navigate(['cadastro-usuario']);
  }
}
