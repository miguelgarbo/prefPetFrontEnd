import { Component } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { DropdownFilterComponent } from "../dropdown-filter/dropdown-filter.component";

@Component({
  selector: 'app-nav-bar-publicacao',
  imports: [MdbCollapseModule, DropdownFilterComponent],
  templateUrl: './nav-bar-publicacao.component.html',
  styleUrl: './nav-bar-publicacao.component.scss'
})
export class NavBarPublicacaoComponent {

}
