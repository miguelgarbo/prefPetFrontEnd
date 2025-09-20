import { Component, Inject, inject } from '@angular/core';
import { Publicacao } from '../../models/publicacao';
import { Observable } from 'rxjs';
import { PublicacaoService } from '../../services/publicacao.service';
import { Router } from '@angular/router';
import { NavBarPublicacaoComponent } from "../nav-bar-publicacao/nav-bar-publicacao.component";

@Component({
  selector: 'app-publicacao-list',
  imports: [NavBarPublicacaoComponent],
  templateUrl: './publicacao-list.component.html',
  styleUrl: './publicacao-list.component.scss'
})
export class PublicacaoListComponent {

  publicacoes: Publicacao[] = []
  router = inject(Router)
  publicacaoService =  inject(PublicacaoService)
  id: number = 0;

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

  findById(id:number){
    this.publicacaoService.findById(id).subscribe({
        
      next(value) {
          
    
        console.log("Deu Certo Fds",value)
      },error(err) {
        console.log(err)

      },
    })

  }





}
