import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LoginComponent } from "../layout/login/login.component";
import { Router } from '@angular/router';
import { Tutor } from '../../models/tutor';

@Component({
  selector: 'app-inicial',
  imports: [MdbModalModule, /*LoginComponent*/],
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent {

  //elementos da modal
  modalService = inject(MdbModalService); //para conseguir abrir a modal
  @ViewChild("modalLogin") modalLogin!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;




  loginNovo(){
    this.modalRef = this.modalService.open(this.modalLogin);
  }

    close(){
    this.modalRef.close();

    }

  cadastro(){
    this.router.navigate(['/cadastro-usuario'])

  }

  acessarEmergencia() {
    this.router.navigate(['/emergencia']);
  }

  buscarChip() {
    this.router.navigate(['/buscar-chip']);
  }

  private router = inject(Router);
}
