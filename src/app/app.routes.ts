import { Routes } from '@angular/router';
import path from 'path';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { InicialComponent } from './components/inicial/inicial.component';

export const routes: Routes = [
{path: '', redirectTo:'principal', pathMatch:'full'},
{path:'login', component: LoginComponent},
{path:'cadastro', component: CadastroUsuarioComponent},
{path: 'inicial', component: InicialComponent},
{path:'principal', component: PrincipalComponent, 
    children:[
        {path:"menu", component:MenuComponent},
    ]
}

];
