import { Component, inject, OnInit } from '@angular/core';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';
import { AplicacaoVacina } from '../../models/aplicacao-vacina';
import { AplicacaoVacinaService } from '../../services/aplicacao-vacina.service';

@Component({
  selector: 'app-vacinas',
  imports: [ MdbTabsModule],
  templateUrl: './vacinas.component.html',
  styleUrl: './vacinas.component.scss'
})
export class VacinasComponent implements OnInit {
  animalService = inject(AnimalService);
  pets: Animal[] = [];
  animalIdCapturado: number = 0; 
  aplicacoes: AplicacaoVacina[] = [];
  aplicacaoService = inject(AplicacaoVacinaService);
  


  ngOnInit(): void {
    this.animalService.findAll().subscribe({
      next: animais => {
        console.log(animais)
        this.pets = animais
      },
      error: (e) => console.log(e)
    });
  }

 findById(id:number){
    this.animalService.findById(id).subscribe({
        
      next:(value) => {
        console.log("Aqui o Animal Selecionado",value);
        this.animalIdCapturado = value.id;
        this.findByAnimal()
      },error(err) {
        console.log("Erro Ao pegar animal", err)
      },
    })
  }

  findByAnimal(){

    this.aplicacaoService.findByAnimalId(this.animalIdCapturado).subscribe({
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
