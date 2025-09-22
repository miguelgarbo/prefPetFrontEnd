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

  cadastrar(){
    if (this.senha2 ==this.tutor.senha) {
      this.save()
      this.router.navigate(['principal']);
    } else {
        Swal.fire({
    icon: "error",
    title: "Erro ao Cadastrar",
    text: "As Senhas Devem Ser Iguais",
  });
    }
  }

  save(){

    if(this.tutor.id > 0 ){

      console.log("Editar Perfil")

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
      })

    }else{

    this.tutorService.save(this.tutor).subscribe({
      next:(value)=> {
        console.log("Cadastrou", value)
        this.cadastrar()

         Swal.fire({
            title: "Usuário Salvo com Sucesso!",
            icon: "success",
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['/principal/animal']);
          
      },
      error:(err)=> {
          
        console.error("Erro Ao Cadastrar", err)
        Swal.fire({
                          icon: "error",
                          title: "Erro ao Atualizar",
                          text: `${err}`,
          });
                      

      },
    })
  }
  }

  buscarCep() {
    const cep = this.tutor.cep.replace(/\D/g, ''); 
    if (cep.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe(res => {
          if (!res.erro) {
            this.tutor.cidade = res.localidade;
            this.tutor.estado = res.uf;
          } else {
            alert('CEP não encontrado!');
            this.tutor.cidade = '';
            this.tutor.estado = '';
          }
        }, err => {
          console.error(err);
          alert('Erro ao consultar CEP');
        });
    }
  }

}
