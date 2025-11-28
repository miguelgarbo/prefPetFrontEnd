import { Component, inject, OnInit } from '@angular/core';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { RouterOutlet, Router } from '@angular/router';

import { AnimalService } from '../../../services/animal.service';
import { AplicacaoVacinaService } from '../../../services/aplicacao-vacina.service';
import { TutorService } from '../../../services/tutor.service';
import { LoginService } from '../../../services/login.service';

import { Animal } from '../../../models/animal';
import { Usuario } from '../../../models/usuario';
import { AplicacaoVacina } from '../../models/aplicacao-vacina';

import Swal from 'sweetalert2';
import { VacinaslistComponent } from '../vacinaslist/vacinaslist.component';

@Component({
  selector: 'app-vacinas',
  imports: [MdbTabsModule, RouterOutlet, VacinaslistComponent],
  templateUrl: './vacinas.component.html',
  styleUrl: './vacinas.component.scss'
})
export class VacinasComponent implements OnInit {

  // Serviços
  animalService = inject(AnimalService);
  aplicacaoService = inject(AplicacaoVacinaService);
  tutorService = inject(TutorService);
  loginService = inject(LoginService);
  router = inject(Router);

  // Dados
  pets: Animal[] = [];
  aplicacoes: AplicacaoVacina[] = [];

  // ID do animal selecionado → usado no VacinaslistComponent
  animalIdCapturado: number = 0;

  // Usuário logado
  currentUser: Usuario = this.loginService.getCurrentUser();

  ngOnInit() {
    this.findAnimaisByTutorId(this.currentUser.id);
  }

  // ---- Buscar animais do tutor ----
  findAnimaisByTutorId(id: number) {
    this.animalService.findByTutorId(id).subscribe({
      next: (animais) => {
        this.pets = animais;

        console.log("Animais do tutor:", animais);

        if (this.pets.length > 0) {
          this.findById(this.pets[0].id); // seleciona o primeiro automaticamente
        }
      },
      error: (err) => console.error(err)
    });
  }

  // ---- Selecionar animal clicado ----
  findById(id: number) {
    this.animalService.findById(id).subscribe({
      next: (animal) => {
        console.log("Animal selecionado:", animal);
        this.animalIdCapturado = animal.id;
        this.findByAnimal();
      },
      error: (err) => console.error("Erro ao pegar animal", err)
    });
  }

  // ---- Carregar aplicações do animal ----
  findByAnimal() {
    this.aplicacaoService.findByAnimalId(this.animalIdCapturado).subscribe({
      next: (aplicacoes) => {
        console.log("Aplicações:", aplicacoes);
        this.aplicacoes = aplicacoes;
      },
      error: (err) => console.error(err)
    });
  }

  // ---- Gerar PDF ----
  gerarPdf() {
    if (this.animalIdCapturado) {
      this.router.navigate(['principal/carteira-vacinacao', this.animalIdCapturado]);
    } else {
      Swal.fire({
        title: "Selecione um Animal Para Gerar o Pdf",
        icon: "warning",
        confirmButtonText: 'Ok'
      });
    }
  }
}
