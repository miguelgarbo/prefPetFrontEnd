import { Component, EventEmitter, Output } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { DropdownFilterComponent } from "../dropdown-filter/dropdown-filter.component";
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar-publicacao',
  imports: [MdbCollapseModule, DropdownFilterComponent, ReactiveFormsModule],
  templateUrl: './nav-bar-publicacao.component.html',
  styleUrl: './nav-bar-publicacao.component.scss'
})
export class NavBarPublicacaoComponent {

    @Output() filtroSelecionado = new EventEmitter<string>();
    @Output() textoEmitido = new EventEmitter<string>();
    valorBarra = new FormControl(''); // Creates a new FormControl with an initial empty string value

    receberFiltro(opcao:string){
      this.filtroSelecionado.emit(opcao)
  } 

  constructor() {
    // Escuta mudanças em tempo real
    this.valorBarra.valueChanges.subscribe(valor => {
      
      console.log("Digitado:", valor);

      this.textoEmitido.emit(valor ?? "")
    });
  }
}
