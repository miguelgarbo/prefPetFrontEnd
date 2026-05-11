import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router } from '@angular/router';

import { Publicacao } from '../../../models/publicacao';
import { PublicacaoService } from '../../../services/publicacao.service';
import { Entidade } from '../../../models/entidade';
import { Imagem } from '../../../models/imagem';

import { EntidadeService } from '../../../services/entidade.service';
import { getUser } from '../../../services/keycloak.service';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';

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
  } as Publicacao;

  entidadeService = inject(EntidadeService);
  publicacaoService = inject(PublicacaoService);
  usuarioService = inject(UsuarioService)
  router = inject(Router);

  entidade!: Entidade;
  currentUser: any;

  tiposDePostagem = [
    { label: 'CAMPANHA DE VACINAÇÃO', valor: 'CAMPANHA DE VACINAÇÃO' },
    { label: 'CAMPANHA DE CASTRAÇÃO', valor: 'CAMPANHA DE CASTRAÇÃO' },
    { label: 'CAMPANHA EDUCACIONAL', valor: 'CAMPANHA EDUCACIONAL' },
    { label: 'ESTUDO COM ANIMAIS', valor: 'ESTUDO COM ANIMAIS' },
    { label: 'INFORMATIVO', valor: 'INFORMATIVO' },
    { label: 'OUTROS', valor: 'OUTROS' }
  ];

  ngOnInit() {

    this.currentUser = getUser();

    const sub = this.currentUser.sub;

    this.findEntidadeByUserId(sub);
  }

  // 🔥 agora usando service correta (Keycloak → Entidade)
  findEntidadeByUserId(sub: string) {

    this.usuarioService.findEntidadeByKeycloakId(sub).subscribe({

      next: (value) => {
        this.entidade = value;
        console.log("Entidade carregada:", this.entidade);
      },

      error: (err) => {
        console.log("Erro ao buscar entidade:", err);
      }

    });

  }

  salvar() {

    console.log("Entidade ID:", this.entidade.id);

    this.publicacao.entidade.id = this.entidade.id;

    this.publicacaoService.save(this.publicacao).subscribe({

      next: (response) => {

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Publicação cadastrada com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });

        this.router.navigate(['principal/publicacoes']);
      },

      error: (err) => {
        console.error("Erro ao salvar publicação:", err);
        Swal.fire("Erro", "Erro ao fazer publicação", "error");
      }

    });

  }
}