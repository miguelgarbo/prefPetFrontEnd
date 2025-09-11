import { Component } from '@angular/core';
import { NavBarPublicacaoComponent } from "../nav-bar-publicacao/nav-bar-publicacao.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-principal',
  imports: [NavBarPublicacaoComponent, RouterOutlet],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
