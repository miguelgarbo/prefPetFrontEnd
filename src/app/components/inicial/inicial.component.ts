import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LoginComponent } from "../login/login.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicial',
  imports: [MdbModalModule, LoginComponent],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.scss'
})
export class InicialComponent {

  //elementos da modal
  modalService = inject(MdbModalService); //para conseguir abrir a modal
  @ViewChild("modalLogin") modalLogin!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  loginNovo(){//chama o modal
    this.modalRef = this.modalService.open(this.modalLogin);
    // this.modalRef.close();
  }

  acessarEmergencia() {
    this.router.navigate(['/emergencia']);
  }

  buscarChip() {
    this.router.navigate(['/buscar-chip']);
  }

  private router = inject(Router);
}
