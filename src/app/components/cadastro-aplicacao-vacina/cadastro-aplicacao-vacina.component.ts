import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';

import { AplicacaoVacina } from '../../models/aplicacao-vacina';
import { AplicacaoVacinaService } from '../../services/aplicacao-vacina.service';
import { Animal } from '../../models/animal';
import { TutorService } from '../../services/tutor.service';
import { AnimalService } from '../../services/animal.service';
import { Vacina } from '../../models/vacina';
import { VacinaService } from '../../services/vacina.service';
import { Veterinario } from '../../models/veterinario';
import { VeterinarioService } from '../../services/veterinario.service';

import { getUser } from '../../services/keycloak.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cadastro-aplicacao-vacina',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './cadastro-aplicacao-vacina.component.html',
  styleUrls: ['./cadastro-aplicacao-vacina.component.scss']
})
export class CadastroAplicacaoVacinaComponent {

  aplicacaoVacina = new AplicacaoVacina();

  animaisDoTutor: Animal[] = [];
  vacinas: Vacina[] = [];

  aplicacaoVacinaService = inject(AplicacaoVacinaService);
  tutorService = inject(TutorService);
  animalService = inject(AnimalService);
  vacinaService = inject(VacinaService);
  usuarioService = inject(UsuarioService)
  veterinarioService = inject(VeterinarioService);

  currentUser: any;

  veterinario!: Veterinario;
  tutor!: any;

  numeroDose!: number;
  mesesParaValidade!: number;
  cpfTutorBusca!: string;

  ngOnInit() {
    this.currentUser = getUser();

    this.aplicacaoVacina.animal = new Animal();

    this.getVetByUserId();
  }

  // 🔥 CORRIGIDO: agora usa Keycloak sub → backend
  getVetByUserId() {

    const sub = this.currentUser.sub;

    this.usuarioService.findVeterinarioByKeycloakId(sub).subscribe({
      next: (veterinario) => {
        console.log("Veterinário logado:", veterinario);
        this.veterinario = veterinario;
      },
      error: (err) => {
        console.log("Erro ao buscar veterinário:", err);
      }
    });

  }

  getAnimaisByTutorId(id: number) {
    this.animalService.findByTutorId(id).subscribe({
      next: (animais) => {
        this.animaisDoTutor = animais;
      },
      error: (err) => console.log(err)
    });
  }

  getTutorByCpf() {

    if (this.cpfTutorBusca) {

      this.tutorService.findByCpf(this.cpfTutorBusca).subscribe({
        next: (response) => {

          this.tutor = response;

          this.getVacinasCadastradas();
          this.getAnimaisByTutorId(response.id);

        },
        error: (err) => {
          console.log("Erro ao buscar tutor:", err);
        }
      });

    }

  }

  salvarAplicacao() {

    this.aplicacaoVacina.veterinario = this.veterinario;

    this.aplicacaoVacinaService.save(this.aplicacaoVacina, this.mesesParaValidade).subscribe({
      next: (aplicacaoCadastrada) => {

        Swal.fire({
          icon: "success",
          title: "Aplicação registrada com sucesso!"
        });

        console.log("Aplicação cadastrada:", aplicacaoCadastrada);

      },
      error: (err) => {

        console.log(err);

        Swal.fire({
          icon: "error",
          title: "Erro ao registrar aplicação"
        });

      }
    });

  }

  getVacinasCadastradas() {
    this.vacinaService.findAll().subscribe({
      next: (vacinas) => {
        this.vacinas = vacinas;
      },
      error: (err) => console.error(err)
    });
  }
}