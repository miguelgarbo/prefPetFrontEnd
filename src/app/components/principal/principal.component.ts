import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav1Component } from "../layout/nav1/nav1.component";
import { Nav2Component } from "../layout/nav2/nav2.component";
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-principal',
  imports: [ RouterOutlet, Nav1Component, Nav2Component],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

  loginService = inject(LoginService)

}
