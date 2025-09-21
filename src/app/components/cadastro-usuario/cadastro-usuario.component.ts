import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Tutor } from '../../models/tutor';
import { HttpClient } from '@angular/common/http';
import { TutorService } from '../../services/tutor.service';

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

  router = inject(Router);
  http = inject(HttpClient)

  cadastrar(){
    if (this.senha2 ==this.tutor.senha) {
      this.save()
      this.router.navigate(['principal']);
    } else {
      alert('AS SENHAS NÃO COINCIDEM!!!');
    }
  }

  save(){

    this.tutorService.save(this.tutor).subscribe({
      next:(value)=> {
        console.log("Cadastrou", value)
        alert("Usuário Cadastrado Com Sucesso !")
          
      },
      error:(err)=> {
          
        console.error("Erro Ao Cadastrar", err)
        alert("Erro Ao Cadastrar Usuário!")

      },


    })

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
