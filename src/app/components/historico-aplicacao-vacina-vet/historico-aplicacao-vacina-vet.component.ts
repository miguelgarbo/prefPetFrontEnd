import { Component, inject } from '@angular/core';
import { AplicacaoVacinaService } from '../../services/aplicacao-vacina.service';
import { AplicacaoVacina } from '../../models/aplicacao-vacina';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { log } from 'node:console';

@Component({
  selector: 'app-historico-aplicacao-vacina-vet',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './historico-aplicacao-vacina-vet.component.html',
  styleUrl: './historico-aplicacao-vacina-vet.component.scss'
})
export class HistoricoAplicacaoVacinaVetComponent {

  aplicacaoService = inject(AplicacaoVacinaService)
  loginService = inject(LoginService)
  currentVet = this.loginService.getCurrentUser()

  lista: AplicacaoVacina[] = []

  ngOnInit(){
    console.log("to aqui caralho");
  

    this.getAplicacoesDoVet()
  }

  constructor(){

    
  }

  getAplicacoesDoVet(){
    console.log("to dentro da func de ap vet");
    
    this.aplicacaoService.findByVetId(this.currentVet.id).subscribe({

      next:(aplicacoes)=> {
        if(aplicacoes.length == 0){
            console.log("tem nada aq");
            
        }else{
            console.log(aplicacoes);
          this.lista=aplicacoes
        }
        
      },
      error(err) {
          console.log(err);
      },
    })
  }
}
