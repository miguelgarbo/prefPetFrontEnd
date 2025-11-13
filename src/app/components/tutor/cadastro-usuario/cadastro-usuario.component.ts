import { Component, inject, Input, TemplateRef, VERSION, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Tutor } from '../../../models/tutor';
import { HttpClient } from '@angular/common/http';
import { TutorService } from '../../../services/tutor.service';
import Swal from 'sweetalert2'
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Entidade } from '../../../models/entidade';
import { Veterinario } from '../../../models/veterinario';
import { VeterinarioService } from '../../../services/veterinario.service';
import { EntidadeService } from '../../../services/entidade.service';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent {

  @Input() tipoCadastro: string = ""

  title: string = 'Tutor';

  usuario: Usuario = new Usuario()

  veterinario: Veterinario = new Veterinario()

  tutor: Tutor = new Tutor()

  entidade: Entidade = new Entidade()

  usuarioService = inject(UsuarioService)

  tutorServie = inject(TutorService)
  veterinarioService = inject(VeterinarioService)
  entidadeService = inject(EntidadeService)

  usuarioEncontrado!: string;
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

  ngOnInit() {
    this.changeTittle(); 
  }
  

  changeTittle(){
    if(this.tipoCadastro == "veterinario"){
      this.title = "Veterinário"

    }else if(this.tipoCadastro =="entidade"){
      this.title = "Entidade"
    }
  }

  logout() {

  }
//   this.usuarioService.logout().subscribe({
//     next: (msg) => {
//       console.log(msg);
//       Swal.fire({
//         icon: 'success',
//         title: 'Logout realizado com sucesso!',
//         timer: 1500,
//         showConfirmButton: false
//       });
//       // Redirecionar para login
//       this.router.navigate(['/inicial']);
//     },
//     error: (err) => {
//       console.error('Erro ao fazer logout', err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Erro ao fazer logout',
//         text: 'Tente novamente'
//       });
//     }
//   });
// }


  findById(id: number){

    this.tutorServie.findById(id).subscribe({

      next:(usuarioEncontrado)=> {
          console.log("Editar Perfil de :", usuarioEncontrado)
          this.tutor = usuarioEncontrado;

      },
      error:(err)=> {
        console.error(err)
      },
    })
  }

  cadastrarTutor() {
    if (this.senha2 === this.tutor.senha) {
      this.saveTutor();
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro ao Cadastrar",
        text: "As Senhas Devem Ser Iguais",
      });
    }
  }

  saveTutor() {
    if (this.tutor.id > 0) {
      // editar tutor
      this.tutorServie.update(this.tutor).subscribe({
        next: (tutor) => {
          Swal.fire({
            title: "Usuário Editado com Sucesso!",
            icon: "success",
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['/principal/animal']);
        },
        error: (erro) => {
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
      this.usuarioService.saveTutor(this.tutor).subscribe({
        next: (tutor) => {
          console.log("Cadastrou", tutor);

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
        this.tutorServie.deleteById(this.tutor.id).subscribe({
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
