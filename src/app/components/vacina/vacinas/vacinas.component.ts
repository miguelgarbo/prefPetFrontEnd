import { Component, inject, OnInit } from '@angular/core';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/animal';
import { AplicacaoVacinaService } from '../../../services/aplicacao-vacina.service';
import { Router } from '@angular/router';
import { TutorService } from '../../../services/tutor.service';
import { LoginService } from '../../../services/login.service';
import { Usuario } from '../../../models/usuario';
import Swal from 'sweetalert2';
import { VacinaslistComponent } from '../vacinaslist/vacinaslist.component';

@Component({
  selector: 'app-vacinas',
  imports: [ MdbTabsModule, VacinaslistComponent ],
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

  // ID do animal selecionado → usado no VacinaslistComponent
  animalIdCapturado: number = 0;

  // Usuário logado
  currentUser: Usuario = this.loginService.getCurrentUser();

  ngOnInit() {
    this.findAnimaisByTutorId(this.currentUser.id);
  }

  findAnimaisByTutorId(id: number) {
    this.animalService.findByTutorId(id).subscribe({
      next: (animais) => {
        this.pets = animais;

        // Seleciona automaticamente o primeiro pet
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
