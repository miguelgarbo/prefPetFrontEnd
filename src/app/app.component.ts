import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav1Component } from "./components/layout/nav1/nav1.component";
import { Nav2Component } from "./components/layout/nav2/nav2.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { Router } from '@angular/router';        // <--- IMPORTANTE
import { LoginService } from './services/login.service';  // <--- IMPORTANTE

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav1Component, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'prefPetAngular';
  constructor(
    private loginService: LoginService,
    private router: Router) {}

  ngOnInit() {
    if (this.loginService.isTokenValid()) { //ao iniciar o app, faz a verificação se o token esta valido
      this.router.navigate(['/principal']);  // Página principal
    }
  }
}
