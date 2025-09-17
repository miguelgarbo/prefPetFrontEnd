import { Component } from '@angular/core';
import { Tutor } from '../../models/tutor';

@Component({
  selector: 'app-nav2',
  imports: [],
  templateUrl: './nav2.component.html',
  styleUrl: './nav2.component.scss'
})
export class Nav2Component {

  tutor: Tutor = new Tutor;

  

}
