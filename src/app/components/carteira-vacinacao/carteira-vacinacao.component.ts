import { Component, inject, Input } from '@angular/core';
import { Animal } from '../../models/animal';
import { AnimalService } from '../../services/animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AplicacaoVacina } from '../../models/aplicacao-vacina';
import { AplicacaoVacinaService } from '../../services/aplicacao-vacina.service';

@Component({
  selector: 'app-carteira-vacinacao',
  imports: [],
  templateUrl: './carteira-vacinacao.component.html',
  styleUrl: './carteira-vacinacao.component.scss'
})
export class CarteiraVacinacaoComponent {

  animal: Animal = new Animal();
  aplicacoes: AplicacaoVacina[] =[]
  animalService = inject(AnimalService) 
  aplicacaoService = inject(AplicacaoVacinaService);
  router= inject(Router)
  activedRoute = inject(ActivatedRoute)

   constructor() {
    let id = this.activedRoute.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

   findById(id: number) {
    this.animalService.findById(id).subscribe({
      next: (animal) => {
        this.animal = animal;
        this.findByAnimal()
      },
      error: (erro) => {
        console.error(erro);
      }
    });
   }

   findByAnimal(){

    this.aplicacaoService.findByAnimalId(this.animal.id).subscribe({
      next: (aplicacoes) =>{
        console.log(aplicacoes);
        this.aplicacoes=aplicacoes;
      },
      error(err) {
          console.error(err)
      },
    })
  }
}
