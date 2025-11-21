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
  tipoForm: string = 'Cadastro de '

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
      this.tipoForm = "Editar Perfil "
      this.findById(id);
    }
  }

  ngOnInit() {
    this.changeTittle()
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

  findTutorById(id: number){
      this.tutorServie.findById(id).subscribe({
      next:(tutorEncontrado)=> {
          console.log("tutor encontrado: ", tutorEncontrado)
           this.tutor = tutorEncontrado;
      },
      error:(err)=> {
        console.error(err)
      },
    })

  }

  findVetById(id: number){
      this.veterinarioService.findById(id).subscribe({
      next:(vetEncontrado)=> {
          console.log("vet encontrado: ", vetEncontrado)
           this.veterinario = vetEncontrado;
      },
      error:(err)=> {
        console.error(err)
      },
    })
  }

  findEntidadeById(id: number){
      this.entidadeService.findById(id).subscribe({
      next:(entidadeEncontrada)=> {
          console.log("entidade encontrada: ", entidadeEncontrada)
           this.entidade = entidadeEncontrada;
      },
      error:(err)=> {
        console.error(err)
      },
    })
  }


  findById(id: number){
    this.usuarioService.findById(id).subscribe({
      next:(usuarioEncontrado)=> {
          console.log("Editar Perfil de :", usuarioEncontrado)

          if(usuarioEncontrado.role == 'TUTOR'){
           this.findTutorById(usuarioEncontrado.id)
          }

          if(usuarioEncontrado.role == 'VETERINARIO'){
           this.findVetById(usuarioEncontrado.id)
          }
           if(usuarioEncontrado.role == 'ENTIDADE'){
           this.findEntidadeById(usuarioEncontrado.id)
          }
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

  saveVet() {
    if (this.veterinario.id > 0) {
      // editar vet
      this.veterinarioService.update(this.veterinario).subscribe({
        next: (vet) => {
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
      this.usuarioService.saveVet(this.veterinario).subscribe({
        next: (vet) => {
          console.log("Cadastrou:", vet);

          Swal.fire({
            title: "Veterinário Salvo com Sucesso!",
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

  saveEnt() {
    if (this.entidade.id > 0) {

      

      // editar vet
      this.entidadeService.update(this.entidade).subscribe({
        next: (ent) => {
          Swal.fire({
            title: "Entidade Editada com Sucesso!",
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
      this.usuarioService.saveEntidade(this.entidade).subscribe({
        next: (ent) => {
          console.log("Cadastrou:", ent);

          Swal.fire({
            title: "Entidade Salva com Sucesso!",
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


  deletarTutor() {
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
            this.router.navigate(['/']); 
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

  deletarVet() {
    Swal.fire({
      text: "Certeza Que Deseja Deletar Sua Conta?",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: "Não",
      showDenyButton: true
    }).then((response) => {
      if (response.isConfirmed) {
        this.veterinarioService.delete(this.veterinario.id).subscribe({
          next: (value) => {
            console.log(value);
            Swal.fire({
              title: "Veterinário Excluído com Sucesso!",
              icon: "success",
              confirmButtonText: 'Ok',
              timer: 1000
            });
            this.router.navigate(['/']); 
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

  deletarEnt() {
    Swal.fire({
      text: "Certeza Que Deseja Deletar Sua Conta?",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: "Não",
      showDenyButton: true
    }).then((response) => {
      if (response.isConfirmed) {
        this.entidadeService.deleteById(this.entidade.id).subscribe({
          next: (value) => {
            console.log(value);
            Swal.fire({
              title: "Entidade Excluída com Sucesso!",
              icon: "success",
              confirmButtonText: 'Ok',
              timer: 1000
            });
            this.router.navigate(['/']); // volta para login ou página inicial
          },
          error: (err) => {
            console.error("Erro Ao Deletar", err);
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
