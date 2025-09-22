import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav1Component } from "../nav1/nav1.component";
import { Nav2Component } from "../nav2/nav2.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-principal',
  imports: [ RouterOutlet, Nav1Component, Nav2Component, FooterComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
