import { Component, EventEmitter, Output } from '@angular/core';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';

@Component({
  selector: 'app-dropdown-filter',
  imports: [MdbDropdownModule],
  templateUrl: './dropdown-filter.component.html',
  styleUrl: './dropdown-filter.component.scss'
})
export class DropdownFilterComponent {

  @Output() filtroEscolhido = new EventEmitter<string>();

  opcoes = ['CAMPANHA DE CASTRAÇÃO', 'CAMPANHA DE VACINAÇÃO', 
    'CAMPANHA EDUCACIONAL', 'ESTUDO COM ANIMAIS', "INFORMATIVO"]

  selecionarFiltro(op: string) {
  console.log("Filtro escolhido:", op);
  this.filtroEscolhido.emit(op);
}
}
