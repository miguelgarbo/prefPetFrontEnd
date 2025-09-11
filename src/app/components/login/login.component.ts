import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router, Routes } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuario!: string;
  senha!: string;

  router = inject(Router);

  logar(){
    if(this.usuario == 'admin' && this.senha == '12345'){
      this.router.navigate(['principal']);
    }else{
      alert("USUÁRIO E/OU SENHA INCORRETOS!!!");
    }
  }
}
