import { Component, inject, OnInit } from '@angular/core';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';
import { AplicacaoVacina } from '../../models/aplicacao-vacina';
import { AplicacaoVacinaService } from '../../services/aplicacao-vacina.service';
import { Router } from '@angular/router';
import { TutorService } from '../../services/tutor.service';
import { Tutor } from '../../models/tutor';

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
  router = inject(Router)

  tutorService= inject(TutorService)
  currentUser: Tutor = new Tutor();
  
    ngOnInit(){
    this.getCurrentUser();
  }
  
  getCurrentUser() {
    this.tutorService.getCurrentUser().subscribe({
      next: (user) => {
        console.log("Usuário logado:", user);
        this.currentUser = user;
  
     this.findAnimaisByTutorId(this.currentUser.id);
      },
      error: (err) => {
        console.error("Nenhum usuário logado", err);
      }
    });
  }

  findAnimaisByTutorId(id: number){

    this.animalService.findByTutorId(id).subscribe({

      next: (animais) =>{
          console.log("Animais Do tutor: ",animais)
          this.pets = animais
          
          if (this.pets.length > 0) {
        this.findById(this.pets[0].id);
      }
          
      },
      error:(err)=> {
          console.error(err)
      }
    })
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

  gerarPdf() {
  if (this.animalIdCapturado) {
    this.router.navigate(['principal/carteira-vacinacao', this.animalIdCapturado]);
  } else {
    alert('Selecione um animal primeiro!');
  }
}


}
