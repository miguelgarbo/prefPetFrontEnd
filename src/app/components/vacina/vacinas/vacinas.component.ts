import { Component, inject, OnInit } from '@angular/core';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/animal';
import { AplicacaoVacinaService } from '../../../services/aplicacao-vacina.service';
import { Router } from '@angular/router';
import { TutorService } from '../../../services/tutor.service';
import Swal from 'sweetalert2';
import { VacinaslistComponent } from '../vacinaslist/vacinaslist.component';
import { getUser } from '../../../services/keycloak.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-vacinas',
  imports: [MdbTabsModule, VacinaslistComponent],
  templateUrl: './vacinas.component.html',
  styleUrl: './vacinas.component.scss'
})
export class VacinasComponent implements OnInit {

  animalService = inject(AnimalService);
  aplicacaoService = inject(AplicacaoVacinaService);
  tutorService = inject(TutorService);
  router = inject(Router);
  usuarioService = inject(UsuarioService)

  pets: Animal[] = [];

  animalIdCapturado: number = 0;

  currentUser: any;
  tutor: any;

  ngOnInit() {

    this.currentUser = getUser();

    const sub = this.currentUser.sub;

    this.getTutorByKeycloak(sub);
  }

  // 🔥 Keycloak → Tutor → ID do banco
  getTutorByKeycloak(sub: string) {

    this.usuarioService.findTutorByKeycloakId(sub).subscribe({
      next: (tutor) => {

        this.tutor = tutor;

        this.findAnimaisByTutorId(tutor.id);
      },
      error: (err) => {
        console.error("Erro ao buscar tutor:", err);
      }
    });

  }

  findAnimaisByTutorId(id: number) {
    this.animalService.findByTutorId(id).subscribe({
      next: (animais) => {
        this.pets = animais;

        if (this.pets.length > 0) {
          this.findById(this.pets[0].id);
        }
      },
      error: err => console.error(err)
    });
  }

  findById(id: number) {
    this.animalService.findById(id).subscribe({
      next: (animal) => {
        this.animalIdCapturado = animal.id;
      },
      error: err => console.error("Erro ao pegar animal", err)
    });
  }

  gerarPdf() {
    if (this.animalIdCapturado) {
      this.router.navigate(['principal/carteira-vacinacao', this.animalIdCapturado]);
    } else {
      Swal.fire({
        title: "Selecione um animal para gerar o PDF",
        icon: "warning",
        confirmButtonText: 'Ok'
      });
    }
  }
}