import { Component, Inject, inject } from '@angular/core';
import { Publicacao } from '../../../models/publicacao';
import { Observable } from 'rxjs';
import { PublicacaoService } from '../../../services/publicacao.service';
import { Router } from '@angular/router';
import { NavBarPublicacaoComponent } from "../../layout/nav-bar-publicacao/nav-bar-publicacao.component";
import { log } from 'node:console';
import Swal from 'sweetalert2';

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

  publicacaoService = inject(PublicacaoService)
  id: number = 0;
  listaFiltrada: Publicacao[] = []


  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.publicacaoService.findAll().subscribe({
      next: (publicacoes) => {
        this.publicacoes = publicacoes;
        console.log("Debug fds" + publicacoes)
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


  setFilterPublicacoes() {
    this.publicacaoService.findByTipoPublicacao(this.filtroEscolhido).subscribe({
      next: (listaFiltradaRetornada) => {

        if(listaFiltradaRetornada.length ==0){

          this.listaFiltrada = this.publicacoes

            Swal.fire({
                            position: "top-end",
                            icon: "info",
                            title: "Nenhuma Publicação com "+this.filtroEscolhido,
                            showConfirmButton: false,
                            timer: 1000
                          });

        }else{
        this.listaFiltrada = listaFiltradaRetornada;

        }

      }, error: (err) => {
        console.log(err);

      },
    })
  }
}


