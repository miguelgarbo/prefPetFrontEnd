import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MessageErrorComponent } from "../layout/message-error/message-error.component";
import { Tutor } from '../../models/tutor';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorService } from '../../services/tutor.service';
import { CommonModule } from '@angular/common';
import { NotificacaoService } from '../../services/notificacao.service';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';
import Swal from 'sweetalert2';

import { getUser } from '../../services/keycloak.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-buscar-tutor',
  imports: [MdbFormsModule, FormsModule, MessageErrorComponent, CommonModule],
  templateUrl: './buscar-tutor.component.html',
  styleUrl: './buscar-tutor.component.scss'
})
export class BuscarTutorComponent {

  tutor: Tutor = new Tutor();
  animal: Animal = new Animal();

  router = inject(Router);
  tutorService = inject(TutorService);
  animalService = inject(AnimalService);
  usuarioService = inject(UsuarioService)
  notificacaoService = inject(NotificacaoService);
  activedRoute = inject(ActivatedRoute);

  animal_id: number = 0;

  tutorEncontrado: boolean | null = null;

  currentUser: any;

  constructor() {
    this.animal_id = +this.activedRoute.snapshot.params['id'] || 0;
    console.log(this.animal_id);
  }

  ngOnInit() {
    this.currentUser = getUser();

    this.findAnimalById();
  }

  findAnimalById() {
    this.animalService.findById(this.animal_id).subscribe({
      next: (value) => {
        console.log("Animal Encontrado", value);
        this.animal = value;
      },
      error: (err) => console.error(err),
    });
  }

  findByNome() {
    this.tutorService.findByNome(this.tutor.nome).subscribe({
      next: (value) => {
        console.log("Deu Certo", value);
        this.tutor = value;
        this.tutorEncontrado = true;
      },
      error: (err) => {
        console.log(err);
        this.tutorEncontrado = false;
      },
    });
  }

  // 🔥 CORRIGIDO: agora usa sub do Keycloak
  gerarConvite() {

    const sub = this.currentUser.sub;

    this.usuarioService.findTutorByKeycloakId(sub).subscribe({
      next: (usuarioLogado) => {

        this.notificacaoService
          .gerarConvite(this.tutor.id, usuarioLogado.id, this.animal_id)
          .subscribe({

            next: () => {

              Swal.fire({
                position: "center",
                icon: "success",
                title: "Convite enviado com sucesso!",
                showConfirmButton: false,
                timer: 1000
              });

            },

            error: (err) => {
              console.log(err);
              alert("Erro ao enviar convite!");
            }

          });

      },

      error: (err) => {
        console.log("Erro ao buscar tutor logado:", err);
      }

    });

  }
}