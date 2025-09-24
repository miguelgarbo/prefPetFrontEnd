import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Publicacao } from '../../../models/publicacao';
import { PublicacaoService } from '../../../services/publicacao.service';
import { Router } from '@angular/router';
import { Entidade } from '../../../models/entidade';
import { Imagem } from '../../../models/imagem';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-cadastro-publicacao',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './cadastro-publicacao.component.html',
  styleUrl: './cadastro-publicacao.component.scss'
})
export class CadastroPublicacaoComponent {

publicacao: Publicacao = {
    tipoPublicacao: '',
    descricao: '',
    entidade: new Entidade(),
    imagens: [new Imagem()] 
  } as Publicacao;  publicacaoService = inject(PublicacaoService)
  router = inject(Router)


    tiposDePostagem = [
        { label: 'CAMPANHA DE VACINAÇÃO', valor: 'CAMPANHA DE VACINAÇÃO' },
        { label: 'CAMPANHA DE CASTRAÇÃO', valor: 'CAMPANHA DE CASTRAÇÃO' },
        { label: 'CAMPANHA EDUCACIONAL', valor: 'CAMPANHA EDUCACIONAL' },
        { label: 'ESTUDO COM ANIMAIS', valor: 'ESTUDO COM ANIMAIS' },
        { label: 'INFORMATIVO', valor: 'INFORMATIVO' },
        { label: 'OUTROS', valor: 'OUTROS' }
    ];
  

    

salvar(){

  this.publicacao.entidade.id = 1;

  this.publicacaoService.save(this.publicacao).subscribe({
    next: (response) => {
      
          Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Publicacão Cadastrada Com Sucesso !",
                  showConfirmButton: false,
                  timer: 1500
                });

      this.router.navigate(['principal/publicacoes'])
    },
    error: (err) => {
      alert("Erro Ao Fazer Publicação")
      console.error(err);
    }
  })
}


  }



