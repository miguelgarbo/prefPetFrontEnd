import { Component } from '@angular/core';
import { NavBarPublicacaoComponent } from "../nav-bar-publicacao/nav-bar-publicacao.component";
import { RouterOutlet } from '@angular/router';
import { Nav1Component } from "../nav1/nav1.component";

@Component({
  selector: 'app-principal',
  imports: [NavBarPublicacaoComponent, RouterOutlet, Nav1Component],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
