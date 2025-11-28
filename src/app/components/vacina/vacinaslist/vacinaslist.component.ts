import { Component, inject } from '@angular/core';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { VacinaService } from '../../../services/vacina.service';
import { AplicacaoVacina } from '../../../models/aplicacao-vacina';
import { AplicacaoVacinaService } from '../../../services/aplicacao-vacina.service';
@Component({
  selector: 'app-vacinaslist',
  standalone: true,
  templateUrl: './vacinaslist.component.html',
  styleUrl: './vacinaslist.component.scss'
})

export class VacinaslistComponent {

  lista: AplicacaoVacina[] = [];

  // modalService = inject(MdbModalService); //abre o model (sera usado futuramente)
  // @ViewChild("modalVacinaDetalhe") modalVacinaDetalhe!: TemplateRef<any>;
  // modalRef!: MdbModalRef<any>;

  aplicacaoService = inject(AplicacaoVacinaService);

  constructor(){

    this.findAll();

  }

   findAll() {

    this.aplicacaoService.findAll().subscribe({
      next: (value) => (this.lista = value),
      error: () => alert('Erro ao carregar aplicações de  :c')
      
    })
  }
}
