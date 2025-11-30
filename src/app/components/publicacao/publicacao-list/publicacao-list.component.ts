import { Component, Inject, inject } from '@angular/core';
import { Publicacao } from '../../../models/publicacao';
import { Observable } from 'rxjs';
import { PublicacaoService } from '../../../services/publicacao.service';
import { Router } from '@angular/router';
import { NavBarPublicacaoComponent } from "../../layout/nav-bar-publicacao/nav-bar-publicacao.component";
import { log } from 'node:console';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-publicacao-list',
  imports: [NavBarPublicacaoComponent],
  templateUrl: './publicacao-list.component.html',
  styleUrl: './publicacao-list.component.scss'
})
export class PublicacaoListComponent {

  publicacoes: Publicacao[] = []
  router = inject(Router)

  filtroEscolhido!: string;
  valorDaBarra!: string

  publicacaoService = inject(PublicacaoService)
  id: number = 0;
  listaFiltrada: Publicacao[] = []
  loginService = inject(LoginService)

  ngOnInit() {
    this.findAll();
  }

  deletePost(idPost: number) {

   Swal.fire({
    title: "Tem certeza?",
    text: "Essa publicação será deletada permanentemente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, deletar!",
    cancelButtonText: "Cancelar"
  }).then((result) => {

    if (result.isConfirmed) {

      this.publicacaoService.deleteById(idPost).subscribe({
        next: () => {
          Swal.fire({
            icon: "success",
            title: "Deletado!",
            text: "A publicação foi removida com sucesso.",
            timer: 1500,
            showConfirmButton: false
          });

          // Atualiza a lista
          this.findAll();
        },

        error: (err) => {
          console.log(err);

          Swal.fire({
            icon: "error",
            title: "Erro!",
            text: "Não foi possível deletar a publicação.",
          });
        }
      });
    }

  });
  }

  findAll() {
    this.publicacaoService.findAll().subscribe({
      next: (publicacoes) => {
        this.publicacoes = publicacoes;
        console.log("Debug fds", publicacoes)
        // this.router.navigate(['/principal']);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }



  findById(id: number) {
    this.publicacaoService.findById(id).subscribe({

      next(value) {
        console.log("Deu Certo Fds", value)
      }, error(err) {
        console.log(err)
      },
    })
  }


  getFiltro(filtro: string) {
    this.filtroEscolhido = filtro
    this.setFilterPublicacoes()
  }

  getTextBar(textBar: string) {

    this.valorDaBarra = textBar
    this.setTextValueBar()
  }

  setTextValueBar() {

    console.log("to dentro do filtro de text");

    this.listaFiltrada = this.publicacoes.filter(pub =>
      pub.descricao.toLowerCase().includes(this.valorDaBarra.toLowerCase()));

    console.log(this.listaFiltrada);

    if (this.listaFiltrada.length === 0) {
      this.listaFiltrada = this.publicacoes
    }
  }

  setFilterPublicacoes() {
    this.publicacaoService.findByTipoPublicacao(this.filtroEscolhido).subscribe({
      next: (listaFiltradaRetornada) => {

        if (listaFiltradaRetornada.length == 0) {

          this.listaFiltrada = this.publicacoes

          Swal.fire({
            position: "top-end",
            icon: "info",
            title: "Nenhuma Publicação com " + this.filtroEscolhido,
            showConfirmButton: false,
            timer: 1000
          });

        } else {
          this.listaFiltrada = listaFiltradaRetornada;

        }

      }, error: (err) => {
        console.log(err);

      },
    })
  }
}



