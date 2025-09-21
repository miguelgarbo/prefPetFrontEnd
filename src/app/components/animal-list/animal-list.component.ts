import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';
import { Tutor } from '../../models/tutor';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { TutorService } from '../../services/tutor.service';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,          // para ngModel, ngForm, ngValue
    MdbModalModule,       // para mdbModal
    MdbFormsModule        // para estilos e componentes MDB Forms
  ],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {



  animalService = inject(AnimalService);
  tutorService = inject(TutorService);
  modalService = inject(MdbModalService)

  tutor?: Tutor
  animais: Animal[] = [];
  animald?: Animal;
  animalParaSalvar!: Animal

  novoAnimal: Partial<Animal> = {
    nome: '',
    especie: '',
    registroGeral: '',
    cor: '',
    sexo: '',
    castrado: false,
    microchip: false,
    numeroMicrochip: '',
    dataNascimento: '',
    naturalidade: '',
    imagemUrl: ''
  };

  @ViewChild('addAnimalModal', { static: true }) modalTemplate: any;

  ngOnInit() {
    this.findByTutor();
    this.tutorService.findById(1).subscribe({
      next: (tutordados) => {
        this.tutor = tutordados;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  findByTutor() {
    this.animalService.findByTutorId(1).subscribe({
      next: (dados) => {
        this.animais = dados;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  findById(id: number) {
    this.animalService.findById(id).subscribe({
      next: (dados) => {
        this.animald = dados;
        console.log(this.animald);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  save() {
    this.animalParaSalvar = {
      id: undefined!,
      nome: this.novoAnimal.nome!.trim(),
      especie: this.novoAnimal.especie!,
      registroGeral: this.novoAnimal.registroGeral!.trim(),
      cor: this.novoAnimal.cor!.trim(),
      sexo: this.novoAnimal.sexo!,
      castrado: this.novoAnimal.castrado!,
      microchip: this.novoAnimal.microchip ?? false,
      numeroMicrochip: this.novoAnimal.numeroMicrochip?.trim() || '',
      dataNascimento: this.novoAnimal.dataNascimento!, 
      naturalidade: this.novoAnimal.naturalidade!.trim(),
      imagemUrl: this.novoAnimal.imagemUrl?.trim() || '',
      aplicacoes: [],
      tutor: this.tutor!,
      idade: undefined!
    };

    this.animalService.save(this.animalParaSalvar).subscribe({
      next: (animalSalvo) => {
        console.log("Animal salvo com sucesso:", animalSalvo);

        // Atualiza lista de animais do tutor
        this.findByTutor();

        // Fecha o modal
        if (this.modalRef) {
          this.modalRef.close();
        }
        this.resetForm();
      },
      error: (err) => {
        console.error('Erro ao salvar animal:', err);
      }
    });
  }


  modalRef?: MdbModalRef<any>;

  openModal(modal: any) {
    this.modalRef = this.modalService.open(modal);
  }

  closeModal() {
    if (this.modalRef) {
      this.resetForm();
      this.modalRef.close();
      this.modalRef = undefined;
    }
  }

  resetForm() {
    this.novoAnimal = {
      nome: '',
      especie: '',
      registroGeral: '',
      cor: '',
      sexo: '',
      castrado: false,
      microchip: false,
      numeroMicrochip: '',
      dataNascimento: '',
      naturalidade: '',
      imagemUrl: ''
    };
  }
}