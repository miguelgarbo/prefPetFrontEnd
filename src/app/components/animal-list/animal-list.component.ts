import { Component, inject } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { Tutor } from '../../models/tutor';
import { error } from 'console';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-animal-list',
  imports: [],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})
export class AnimalListComponent {

  animalService = inject(AnimalService)
  animais: Animal[] = [];


  ngOnInit() {
    this.findByTutor();
  }

  findByTutor() {
    this.animalService.findByTutorId(2).subscribe({
      next: (dados) => {
        this.animais = dados;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
 }

