
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MessageErrorComponent } from "../message-error/message-error.component";
import { Tutor } from '../../models/tutor';
import { Router } from '@angular/router';
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
  notificacaoService = inject(NotificacaoService)

  tutorEncontrado: boolean | null = null;


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

  gerarConvite(destinatario_id:number,tutor_id: number, animal_id: number){
    this.notificacaoService.gerarConvite(destinatario_id,tutor_id, animal_id).subscribe({
        next:(value)=> {
         console.log("Gerou O Convite", value)   
        },
        error: (err)=> {
            console.log(err)
        },


    })

  }

}
