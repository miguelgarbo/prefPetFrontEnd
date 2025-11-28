import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LoginComponent } from "../layout/login/login.component";
import { Router } from '@angular/router';
import { Tutor } from '../../models/tutor';

@Component({
  selector: 'app-inicial',
  imports: [MdbModalModule, LoginComponent],
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent {

  //elementos da modal
  modalService = inject(MdbModalService); //para conseguir abrir a modal
  @ViewChild("modalLogin") modalLogin!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  private router = inject(Router);
  tipoLoginValue!: string;

  loginNovo(){
    this.tipoLoginValue = 'tutor'
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

  vetCad(){
    console.log("teste vet cad")
        this.router.navigate(['/veterinario-cadastro']);
  }

  vetLogin(){
    console.log("teste vet login")
    this.tipoLoginValue = 'veterinario'
    this.modalRef = this.modalService.open(this.modalLogin);
  }

  entCad(){
    console.log("teste ent cad")
        this.router.navigate(['/entidade-cadastro']);
  }

  entLogin(){
    console.log("teste ent login")
    this.tipoLoginValue = 'entidade'
    this.modalRef = this.modalService.open(this.modalLogin);
  }


}
