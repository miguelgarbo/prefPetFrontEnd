import { Component, Input } from '@angular/core';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-animal-details',
  imports: [],
  templateUrl: './animal-details.component.html',
  styleUrl: './animal-details.component.scss'
})
export class AnimalDetailsComponent {
  @Input() animal!: Animal;
}
