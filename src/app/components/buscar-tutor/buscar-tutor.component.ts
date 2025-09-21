
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


@Component({
  selector: 'app-buscar-tutor',
  imports: [MdbFormsModule, FormsModule, MessageErrorComponent, CommonModule],
  templateUrl: './buscar-tutor.component.html',
  styleUrl: './buscar-tutor.component.scss'
})
export class BuscarTutorComponent {

  tutor: Tutor = new Tutor();
  router = inject(Router)
  tutorService = inject(TutorService)
  activedRoute = inject(ActivatedRoute)
  animal_id: number = 0

  notificacaoService = inject(NotificacaoService)

  tutorEncontrado: boolean | null = null;


  constructor() {
  this.animal_id = +this.activedRoute.snapshot.params['id'] || 0;
  console.log(this.animal_id)
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
  //ID 2 Maria, ID 1 João
  gerarConvite(){
    this.notificacaoService.gerarConvite(2,1, this.animal_id).subscribe({
        next:(value)=> {
         console.log("Gerou O Convite", value)   
         alert("Convite Enviado Com Sucesso! ")
        },
        error: (err)=> {
            console.log(err)
            alert("Erro Ao Enviar Convite ! ")
        },


    })

  }

}
