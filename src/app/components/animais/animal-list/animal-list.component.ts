import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/animal';
import { Tutor } from '../../../models/tutor';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { TutorService } from '../../../services/tutor.service';
import { AnimalDetailsComponent } from '../animal-details/animal-details.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MdbModalModule,       
    MdbFormsModule,
    AnimalDetailsComponent        
  ],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {

  animalService = inject(AnimalService);
  tutorService = inject(TutorService);
  modalService = inject(MdbModalService);
  router = inject(Router);

  animais: Animal[] = [];
  currentUser: Tutor = new Tutor();
  animalSelecionado?: Animal;

  hoje: string = new Date().toISOString().split('T')[0];

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

  modalRef?: MdbModalRef<any>;
  @ViewChild('addAnimalModal', { static: true }) modalTemplate: any;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.tutorService.getCurrentUser().subscribe({
      next: (user) => {
        console.log("Usuário logado:", user);
        this.currentUser = user;
        this.findByTutorId(user.id); // pega os animais do tutor logado
      },
      error: (err) => {
        console.error("Nenhum usuário logado", err);
      }
    });
  }

  findByTutorId(tutorId: number) {
    this.animalService.findByTutorId(tutorId).subscribe({
      next: (dados) => {
        this.animais = dados;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  findById(id: number){
    this.animalSelecionado = this.animais.find(animal => animal.id === id);
  }

  transferirTutela(animalId: number){
    if (animalId) {
      this.router.navigate(['principal/buscar-tutor', animalId]);
    } else {
      alert('Selecione um animal primeiro!');
    }
  }

  save() {
    this.animalService.save({
      id: undefined!,
      nome: this.novoAnimal.nome!.trim(),
      especie: this.novoAnimal.especie!,
      registroGeral: this.novoAnimal.registroGeral!.trim(),
      cor: this.novoAnimal.cor!.trim(),
      sexo: this.novoAnimal.sexo!,
      castrado: this.novoAnimal.castrado!,
      microchip: this.novoAnimal.microchip ?? false,
      numeroMicrochip: this.novoAnimal.numeroMicrochip?.trim() || undefined,
      dataNascimento: this.novoAnimal.dataNascimento!, 
      naturalidade: this.novoAnimal.naturalidade!.trim(),
      imagemUrl: this.novoAnimal.imagemUrl?.trim() || '',
      aplicacoes: [],
      tutor: this.currentUser, // 🔥 agora associa o animal ao user logado
      idade: undefined!
    }).subscribe({
      next: (animalSalvo) => {
        console.log("Animal salvo com sucesso:", animalSalvo);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Animal salvo com sucesso !",
          showConfirmButton: false,
          timer: 1000
        });

        this.findByTutorId(this.currentUser.id);

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
  
    onAnimalSaved() {
    this.animalSelecionado = undefined;  // Limpar a seleção do animal
  }
}
