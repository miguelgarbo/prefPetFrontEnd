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
import { LoginService } from '../../../services/login.service';
import { log } from 'node:util';
import { Usuario } from '../../../models/usuario';
import { MessageErrorComponent } from '../../layout/message-error/message-error.component';
import { UsuarioService } from '../../../services/usuario.service';

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
  loginService = inject(LoginService)
  modalService = inject(MdbModalService);
  router = inject(Router);
  donoDoAnimal = new Tutor();
  mensagem: string = ""

  animais: Animal[] = [];
  currentUser: Usuario = this.loginService.getCurrentUser()
  animalSelecionado?: Animal;

  //tutorService = inject(TutorService);
  usuarioService = inject(UsuarioService);
  

  deuCerto!: boolean

  tutoresList: Tutor[] = [];

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
    
    console.log("to aqui dentro do animais list");
    console.log("usuario atual:" + this.currentUser.nome+ ", role: "+ this.currentUser.role)
    this.findByAnimaisTutorId()
    this.getTutorByCurrentUserId(this.currentUser.id)

    if(this.loginService.hasRole("ADMIN")){
      this.tutotesFindAll(); //caso seja admin, mostra os tutores cadastrados
    }

  }
   tutotesFindAll() { //para mostrar a lista de tutores
  this.tutorService.findAll().subscribe({
    next: (lista) => {
      console.log("Tutores carregados:", lista);
      this.tutoresList = lista;
    },
    error: (err) => {
      console.error("Erro ao carregar tutores", err);
    }
  });
}
  deletarTutor(id:number){
    Swal.fire({
    title: 'Tem certeza?',
    text: 'Você realmente deseja excluir este tutor?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {

    if (result.isConfirmed) {

      this.tutorService.deleteById(id).subscribe({
        next: () => {
          Swal.fire({
            title: 'Excluído!',
            text: 'Tutor removido com sucesso.',
            icon: 'success',
            timer: 1800,
            showConfirmButton: false
          });

          // Atualiza a lista automaticamente sem recarregar a página
          this.tutoresList = this.tutoresList.filter(t => t.id !== id);
        },

        error: () => {
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível excluir o tutor.',
            icon: 'error'
          });
        }
      });
    }
  })
}

  findByAnimaisTutorId() {
    this.animalService.findByTutorId(this.currentUser.id).subscribe({
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

  getTutorByCurrentUserId(id: number){
       this.tutorService.findById(id).subscribe({
      next: (tutor) => {
        this.donoDoAnimal = tutor;
      },
      error: (err) => {
        console.error(err);
      }
    });
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
      tutor: this.donoDoAnimal, 
      idade: undefined!
    }).subscribe({
      next: (animalSalvo) => {
        this.deuCerto=true

        console.log("Animal salvo com sucesso:", animalSalvo);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Animal salvo com sucesso !",
          showConfirmButton: false,
          timer: 1000
        });

        this.findByAnimaisTutorId();

        if (this.modalRef) {
          this.modalRef.close();
        }
        this.resetForm();
      },
      error: (err) => {
        this.mensagem = "Erro Ao Salvar Animal: "+err.message

        this.deuCerto = false
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
