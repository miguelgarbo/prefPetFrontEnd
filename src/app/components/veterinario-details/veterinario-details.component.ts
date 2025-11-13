import { Component } from '@angular/core';
import { CadastroUsuarioComponent } from "../tutor/cadastro-usuario/cadastro-usuario.component";

@Component({
  selector: 'app-veterinario-details',
  imports: [CadastroUsuarioComponent],
  templateUrl: './veterinario-details.component.html',
  styleUrl: './veterinario-details.component.scss'
})
export class VeterinarioDetailsComponent {

  veterinario: string = "veterinario"

}
