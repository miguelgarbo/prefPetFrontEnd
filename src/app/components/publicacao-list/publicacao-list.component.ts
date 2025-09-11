import { Component, Inject, inject } from '@angular/core';
import { Publicacao } from '../../models/publicacao';
import { Observable } from 'rxjs';
import { PublicacaoService } from '../../services/publicacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicacao-list',
  imports: [],
  templateUrl: './publicacao-list.component.html',
  styleUrl: './publicacao-list.component.scss'
})
export class PublicacaoListComponent {

  publicacoes: Publicacao[] = []
  router = inject(Router)
  publicacaoService =  inject(PublicacaoService)

  ngOnInit(){
    this.findAll();
  }

  

  findAll(){
    this.publicacaoService.findAll().subscribe({
      next: (publicacoes) =>{
        this.publicacoes = publicacoes;
        console.log("Debug fds"+publicacoes)
        // this.router.navigate(['/principal']);
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }





}
