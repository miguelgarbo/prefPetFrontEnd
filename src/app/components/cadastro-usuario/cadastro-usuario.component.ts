import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Tutor } from '../../models/tutor';
import { HttpClient } from '@angular/common/http';
import { TutorService } from '../../services/tutor.service';
import Swal from 'sweetalert2'
import e from 'express';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent {

  tutor: Tutor = new Tutor()
  tutorService = inject(TutorService)
  usuario!: string;
  senha!: string;
  senha2!: string;

  actived = inject(ActivatedRoute)
  router = inject(Router);
  http = inject(HttpClient)

   constructor() {
    let id = this.actived.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  logout() {
  this.tutorService.logout().subscribe({
    next: (msg) => {
      console.log(msg);
      Swal.fire({
        icon: 'success',
        title: 'Logout realizado com sucesso!',
        timer: 1500,
        showConfirmButton: false
      });
      // Redirecionar para login
      this.router.navigate(['/inicial']);
    },
    error: (err) => {
      console.error('Erro ao fazer logout', err);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao fazer logout',
        text: 'Tente novamente'
      });
    }
  });
}


  findById(id: number){

    this.tutorService.findById(id).subscribe({

      next:(usuario)=> {
          console.log("Editar Perfil de :", usuario)
          this.tutor = usuario;

      },
      error:(err)=> {
        console.error(err)
    
      },

    })

  }

  cadastrar() {
    if (this.senha2 === this.tutor.senha) {
      this.save();
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro ao Cadastrar",
        text: "As Senhas Devem Ser Iguais",
      });
    }
  }

  save() {
    if (this.tutor.id > 0) {
      // editar tutor
      this.tutorService.update(this.tutor).subscribe({
        next: () => {
          Swal.fire({
            title: "Usuário Editado com Sucesso!",
            icon: "success",
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['/principal/animal']);
        },
        error: erro => {
          Swal.fire({
            icon: "error",
            title: "Erro ao Atualizar",
            text: `${erro}`,
          });
          console.error(erro);
        }
      });
    } else {
      // salvar novo tutor
      this.tutorService.save(this.tutor).subscribe({
        next: (value) => {
          console.log("Cadastrou", value);

          Swal.fire({
            title: "Usuário Salvo com Sucesso!",
            icon: "success",
            confirmButtonText: 'Ok'
          });

          this.router.navigate(['/principal/animal']);
        },
        error: (err) => {
          console.error("Erro Ao Cadastrar", err);
          Swal.fire({
            icon: "error",
            title: "Erro ao Cadastrar",
            text: `${err}`,
          });
        },
      });
    }
  }

  deletar() {
    Swal.fire({
      text: "Certeza Que Deseja Deletar Sua Conta?",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: "Não",
      showDenyButton: true
    }).then((response) => {
      if (response.isConfirmed) {
        this.tutorService.deleteById(this.tutor.id).subscribe({
          next: (value) => {
            console.log(value);
            Swal.fire({
              title: "Usuário Excluído com Sucesso!",
              icon: "success",
              confirmButtonText: 'Ok',
              timer: 1000
            });
            this.router.navigate(['/']); // volta para login ou página inicial
          },
          error: (err) => {
            console.error("Erro AO Deletar", err);
            Swal.fire({
              icon: "error",
              title: "Erro ao Deletar",
              text: `${err}`,
            });
          },
        });
      }
    });
  }

  buscarCep() {
    const cep = this.tutor.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe(res => {
        if (!res.erro) {
          this.tutor.cidade = res.localidade;
          this.tutor.estado = res.uf;
        } else {
          Swal.fire({
            icon: "error",
            title: "CEP não encontrado!",
          });
          this.tutor.cidade = '';
          this.tutor.estado = '';
        }
      }, err => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Erro ao consultar CEP",
        });
      });
    }
  }

}
