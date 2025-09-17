import { Routes } from '@angular/router';
import path from 'path';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { PublicacaoListComponent } from './components/publicacao-list/publicacao-list.component';
import { NavBarPublicacaoComponent } from './components/nav-bar-publicacao/nav-bar-publicacao.component';
import { InicialComponent } from './components/inicial/inicial.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { CadastroAnimalComponent } from './components/cadastro-animal/cadastro-animal.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';

export const routes: Routes = [
{path: '', redirectTo:'inicial', pathMatch:'full'},
{path: 'publicacoes', component: PublicacaoListComponent},
{path:'login', component: LoginComponent},
{path:'cadastro', component: CadastroUsuarioComponent},
{path: 'inicial', component: InicialComponent},
{path:'principal', component: PrincipalComponent}, 
{path:'animal', component: AnimalListComponent,
    children:[
        {path:"cadastro", component: CadastroAnimalComponent},
        {path:":id", component: AnimalDetailsComponent}
    ]
},
{path:'principal', component: PrincipalComponent, 
    children:[
        {path:"menu", component:MenuComponent},
    ]
}

];
