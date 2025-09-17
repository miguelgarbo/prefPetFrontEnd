import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav1Component } from "./components/nav1/nav1.component";
import { Nav2Component } from "./components/nav2/nav2.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav1Component, Nav2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'prefPetAngular';
}
