
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MessageErrorComponent } from "../message-error/message-error.component";
import { Tutor } from '../../models/tutor';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorService } from '../../services/tutor.service';
import { CommonModule, NgIf } from '@angular/common';
import { NotificacaoService } from '../../services/notificacao.service';
import { LoginComponent } from '../login/login.component';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-buscar-tutor',
  imports: [MdbFormsModule, FormsModule, MessageErrorComponent, CommonModule],
  templateUrl: './buscar-tutor.component.html',
  styleUrl: './buscar-tutor.component.scss'
})
export class BuscarTutorComponent {

  tutor: Tutor = new Tutor();
  animal: Animal = new Animal();
  router = inject(Router)
  tutorService = inject(TutorService)
  animalService = inject(AnimalService)
  activedRoute = inject(ActivatedRoute)
  animal_id: number = 0

  notificacaoService = inject(NotificacaoService)

  tutorEncontrado: boolean | null = null;


  constructor() {
  this.animal_id = +this.activedRoute.snapshot.params['id'] || 0;
  console.log(this.animal_id)
}

  ngOnInit(){
      this.findAnimalById();
  }


  findAnimalById(){
    this.animalService.findById(this.animal_id).subscribe({

      next:(value)=> {
        console.log("Animal Encontrado ", value)
        this.animal = value
      },
      error:(err)=> {
        console.error(err)
      },
    })
  }


  findByNome(){
    this.tutorService.findByNome(this.tutor.nome).subscribe({
      next:(value)=> {
          console.log("Deu Certo", value)
          this.tutor = value;
          this.tutorEncontrado = true

      },
      error: (err)=> {
          console.log(err)
          this.tutorEncontrado = false

      },

    })
  }

  //Transferindo o Animal de João para Maria
  //Primeiro Id é da pessoa que foi encontrada no input, ID 1 João nosso current user
  gerarConvite(){
    this.notificacaoService.gerarConvite(this.tutor.id,1, this.animal_id).subscribe({
        next:(value)=> {
         console.log("Gerou O Convite", value)   

         Swal.fire({
            position: "center",
            icon: "success",
            title: "Convite Enviado Com Sucesso!",
            showConfirmButton: false,
            timer: 1000
          });
        },
        error: (err)=> {
            console.log(err)
            alert("Erro Ao Enviar Convite ! ")
        },


    })

  }

}
