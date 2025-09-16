import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav1Component } from "./components/nav1/nav1.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav1Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'prefPetAngular';
}
