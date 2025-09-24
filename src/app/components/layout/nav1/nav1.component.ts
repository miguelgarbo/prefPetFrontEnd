import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

@Component({
  selector: 'app-nav1',
  imports: [MdbCollapseModule],
  templateUrl: './nav1.component.html',
  styleUrl: './nav1.component.scss'
})
export class Nav1Component {

  router = inject(Router)

  notificacoesTela(){
        this.router.navigate(['/notificacoes']);
        console.log("TESTE")
  }

}
