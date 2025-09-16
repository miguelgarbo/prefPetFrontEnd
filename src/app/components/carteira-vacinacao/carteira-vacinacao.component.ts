import { Component, inject } from '@angular/core';
import { Animal } from '../../models/animal';
import { AnimalService } from '../../services/animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carteira-vacinacao',
  imports: [],
  templateUrl: './carteira-vacinacao.component.html',
  styleUrl: './carteira-vacinacao.component.scss'
})
export class CarteiraVacinacaoComponent {

  animal: Animal = new Animal();
  animalService = inject(AnimalService) 
  router= inject(Router)

  


}
