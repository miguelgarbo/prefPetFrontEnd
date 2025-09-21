import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav1Component } from "./components/nav1/nav1.component";
import { Nav2Component } from "./components/nav2/nav2.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav1Component, Nav2Component, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'prefPetAngular';
}
