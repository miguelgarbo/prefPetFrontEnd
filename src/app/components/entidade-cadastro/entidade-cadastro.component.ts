import { Component } from '@angular/core';
import { CadastroUsuarioComponent } from '../tutor/cadastro-usuario/cadastro-usuario.component';

@Component({
  selector: 'app-entidade-cadastro',
  imports: [CadastroUsuarioComponent],
  templateUrl: './entidade-cadastro.component.html',
  styleUrl: './entidade-cadastro.component.scss'
})
export class EntidadeCadastroComponent {
  entidade: string = "entidade"
}
