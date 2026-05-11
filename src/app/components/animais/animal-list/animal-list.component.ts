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

import { getUser, hasRole } from '../../../services/keycloak.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MessageErrorComponent } from '../../layout/message-error/message-error.component';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MdbModalModule,
    MdbFormsModule,
    AnimalDetailsComponent,
    MessageErrorComponent
  ],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {

  animalService = inject(AnimalService);
  tutorService = inject(TutorService);
  usuarioService = inject(UsuarioService);
  modalService = inject(MdbModalService);
  router = inject(Router);

  animais: Animal[] = [];
  tutoresList: Tutor[] = [];

  currentUser: any;
  donoDoAnimal!: Tutor;
  animalSelecionado?: Animal;

  mensagem: string = "";
  deuCerto!: boolean;

  isTutor = false;
  isAdmin = false;

  hoje: string = new Date().toISOString().split('T')[0];

  modalRef?: MdbModalRef<any>;
  @ViewChild('addAnimalModal', { static: true }) modalTemplate: any;

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

  ngOnInit() {

    // 🔥 1 - pega usuário do Keycloak
    this.currentUser = getUser();
    const sub = this.currentUser.sub;

    this.isTutor = hasRole("TUTOR");
    this.isAdmin = hasRole("ADMIN");

    // 🔥 2 - busca tutor no backend usando sub
    this.getTutorByKeycloak(sub);

    if (this.isAdmin) {
      this.tutotesFindAll();
    }
  }

  // 🔥 BUSCA TUTOR PELO KEYCLOAK ID
  getTutorByKeycloak(sub: string) {
    this.usuarioService.findTutorByKeycloakId(sub).subscribe({
      next: (tutor) => {
        this.donoDoAnimal = tutor;

        // 🔥 3 - agora SIM busca animais com ID do banco
        this.findByAnimaisTutorId(tutor.id);
      },
      error: (err) => {
        console.error("Erro ao buscar tutor:", err);
      }
    });
  }

  // 🔥 ANIMAIS DO TUTOR
  findByAnimaisTutorId(tutorId: number) {
    this.animalService.findByTutorId(tutorId).subscribe({
      next: (dados) => {
        this.animais = dados;
      },
      error: (err) => {
        console.error("Erro ao buscar animais:", err);
      }
    });
  }

  // 🔥 ADMIN - listar tutores
  tutotesFindAll() {
    this.tutorService.findAll().subscribe({
      next: (lista) => {
        this.tutoresList = lista;
      },
      error: (err) => {
        console.error("Erro ao carregar tutores", err);
      }
    });
  }

  deletarTutor(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você realmente deseja excluir este tutor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {

      if (result.isConfirmed) {
        this.tutorService.deleteById(id).subscribe({
          next: () => {
            this.tutoresList = this.tutoresList.filter(t => t.id !== id);
          },
          error: () => {
            Swal.fire('Erro!', 'Não foi possível excluir.', 'error');
          }
        });
      }
    });
  }

  findById(id: number) {
    this.animalSelecionado = this.animais.find(a => a.id === id);
  }

  transferirTutela(animalId: number) {
    this.router.navigate(['principal/buscar-tutor', animalId]);
  }

  excluirAnimal(animalId: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você realmente deseja excluir este animal?',
      icon: 'warning',
      showCancelButton: true
    }).then((result) => {

      if (result.isConfirmed) {
        this.animalService.deleteById(animalId).subscribe({
          next: () => {
            this.animais = this.animais.filter(a => a.id !== animalId);
          },
          error: () => {
            Swal.fire('Erro!', 'Não foi possível excluir.', 'error');
          }
        });
      }
    });
  }

  save() {

    const imgGenericaCanino = "https://media.istockphoto.com/id/1333497883/vector/vector-simple-isolated-dog-icon.jpg";
    const imgGenericaFelino = "https://media.istockphoto.com/id/1300144006/vector/black-cat-silhouette-on-white-background.jpg";

    let imagemFinal = this.novoAnimal.imagemUrl?.trim() || '';

    if (!imagemFinal) {
      imagemFinal = this.novoAnimal.especie?.toLowerCase() === 'canino'
        ? imgGenericaCanino
        : imgGenericaFelino;
    }

    this.animalService.save({
      ...this.novoAnimal,
      imagemUrl: imagemFinal,
      tutor: this.donoDoAnimal
    } as Animal).subscribe({
      next: () => {

        Swal.fire({
          icon: "success",
          title: "Animal salvo!",
          timer: 1000,
          showConfirmButton: false
        });

        this.findByAnimaisTutorId(this.donoDoAnimal.id);

        this.closeModal();
        this.resetForm();
      },
      error: (err) => {
        this.mensagem = "Erro ao salvar: " + err.message;
        this.deuCerto = false;
      }
    });
  }

  openModal(modal: any) {
    this.modalRef = this.modalService.open(modal);
  }

  closeModal() {
    this.modalRef?.close();
    this.resetForm();
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
    this.animalSelecionado = undefined;
  }
}