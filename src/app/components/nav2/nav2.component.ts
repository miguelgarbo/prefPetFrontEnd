import { Component } from '@angular/core';
import { Tutor } from '../../models/tutor';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-nav2',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './nav2.component.html',
  styleUrl: './nav2.component.scss'
})
export class Nav2Component {

  tutor: Tutor = new Tutor;

  

}
