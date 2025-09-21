import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent {

  usuario!: string;
  senha!: string;
  senha2!: string;

  router = inject(Router);

  cadastrar(){
    if (this.senha2 == this.senha) {
      //aqui cadastraR o usuário no banco ----------------------------------------------------
      this.router.navigate(['principal']);
    } else {
      alert('AS SENHAS NÃO COINCIDEM!!!');
    }
  }
}
