import { Routes } from '@angular/router';
import path from 'path';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { PublicacaoListComponent } from './components/publicacao-list/publicacao-list.component';
import { NavBarPublicacaoComponent } from './components/nav-bar-publicacao/nav-bar-publicacao.component';

export const routes: Routes = [
{path: '', redirectTo:'publicacoes', pathMatch:'full'},
{path: 'publicacoes', component: PublicacaoListComponent},
{path:'login', component: LoginComponent},
{path:'cadastro', component: CadastroUsuarioComponent},
{path:'principal', component: PrincipalComponent, 
    children:[
        {path:"menu", component:MenuComponent},
    ]
}

];
