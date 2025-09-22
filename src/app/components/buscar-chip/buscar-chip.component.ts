import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Animal } from '../../models/animal';
import { Router } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { Tutor } from '../../models/tutor';
import { MessageErrorComponent } from "../message-error/message-error.component";
import { CommonModule, NgIf } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-buscar-chip',
  imports: [FormsModule, MdbFormsModule, MessageErrorComponent, CommonModule],
  templateUrl: './buscar-chip.component.html',
  styleUrl: './buscar-chip.component.scss'
})
export class BuscarChipComponent {

  animal: Animal = new Animal();
  tutor: Tutor = new Tutor();
  animalService = inject(AnimalService)
  router = inject(Router)

animalEncontrado: boolean | null = null;

  findByMicrochip(){

    this.animalService.findByMicrochip(this.animal.numeroMicrochip).subscribe({

      next: (animal)=>{

        console.log("Animal encontrado:", animal);
          Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Tutor Encontrado Com Sucesso!",
                  showConfirmButton: false,
                  timer: 1000
                });
         this.animalEncontrado = true
         this.animal = animal;
         this.tutor = animal.tutor;
      },
      error: (err) => {

          console.error("Erro ao buscar animal", err);
          this.animalEncontrado = false

      },
    })


  }




}
