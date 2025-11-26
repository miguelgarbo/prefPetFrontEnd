import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { AplicacaoVacina } from '../../models/aplicacao-vacina';
import { AplicacaoVacinaService } from '../../services/aplicacao-vacina.service';
import { Animal } from '../../models/animal';
import { TutorService } from '../../services/tutor.service';
import { AnimalService } from '../../services/animal.service';
import { Tutor } from '../../models/tutor';
import { log } from 'node:console';
import { Vacina } from '../../models/vacina';
import { VacinaService } from '../../services/vacina.service';

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
  aplicacaoVacinaService = inject(AplicacaoVacinaService)
  tutorService = inject(TutorService)
  animalService = inject(AnimalService)
  vacinaService = inject(VacinaService)

  numeroDose!: number;


  vacinas: Vacina[] = [];

  tutor!: Tutor;

  mesesParaValidade!: number
  cpfTutorBusca!: string;


  ngOnInit() {
    this.aplicacaoVacina.animal = new Animal();
  }

  constructor() {
  }

  getAnimaisByTutorId(id: number) {
    this.animalService.findByTutorId(id).subscribe({

      next: (animais) => {
        console.log("animais encontrados", animais);
        this.animaisDoTutor = animais
      },
      error(err) {
        console.log(err);
      },
    })
  }


  getTutorByCpf() {

    if (this.cpfTutorBusca != null) {

      this.tutorService.findByCpf(this.cpfTutorBusca).subscribe({
        next: (response) => {

          console.log("opa deu certo ");
          console.log(response);

          this.tutor = response;

          this.getVacinasCadastradas()
          this.getAnimaisByTutorId(response.id);

        },
        error: (err) => {

          console.log("erro ao buscar tutor");
          console.log(err);

        },
      })
    }

  }

  salvarAplicacao() {

    this.aplicacaoVacinaService.save(this.aplicacaoVacina, this.mesesParaValidade).subscribe({

      next: (aplicacaoCadastrada) => {

        Swal.fire({
          icon: "success",
          title: "Aplicação registrada com sucesso!"
        });

        console.log("aplicacao cadastrada: " + aplicacaoCadastrada)

      }, error: (err) => {

        console.log(err)

        Swal.fire({
          icon: "error",
          title: "Erro ao Registrar Aplicação"
        });
      },
    }
    )
  }

  getVacinasCadastradas() {
    this.vacinaService.findAll().subscribe({
      next: (vacinas) => {
        console.log(vacinas)
        this.vacinas = vacinas;
      },
      error: (err) => {
        console.error(err)
      },
    })
  }

  getAplicacaoVacinaAlreadyExists() {

    this.aplicacaoVacinaService.findByAnimalId(this.aplicacaoVacina.animal.id).subscribe({

      next: (aplicacoesDoAnimal) => {

        if (aplicacoesDoAnimal) {

          for (let i = 0; i < aplicacoesDoAnimal.length; i++) {
            const aplicacaoVacinaIndex = aplicacoesDoAnimal[i];

            if (aplicacaoVacinaIndex.vacina.nome == this.aplicacaoVacina.vacina.nome) {

              this.numeroDose = aplicacaoVacinaIndex.numeroDose + 1
              console.log(this.numeroDose)
            }
          }

        } else {

          console.log("erro ao buscar aplicacoes animal")
        }


      },
      error: (err) => {


      },
    })
  }

}
