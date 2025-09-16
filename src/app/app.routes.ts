import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { PublicacaoListComponent } from './components/publicacao-list/publicacao-list.component';
import { NavBarPublicacaoComponent } from './components/nav-bar-publicacao/nav-bar-publicacao.component';
import { InicialComponent } from './components/inicial/inicial.component';
import { CadastroPublicacaoComponent } from './components/cadastro-publicacao/cadastro-publicacao.component';
import { Nav1Component } from './components/nav1/nav1.component';
import { Nav2Component } from './components/nav2/nav2.component';
import { CarteiraVacinacaoComponent } from './components/carteira-vacinacao/carteira-vacinacao.component';
import { EmergenciaComponent } from './components/emergencia/emergencia.component';
import { BuscarChipComponent } from './components/buscar-chip/buscar-chip.component';


export const routes: Routes = [
{path: '', redirectTo:'carteira-vacinacao', pathMatch:'full'},
{path: "cadastro-publicacao", component: CadastroPublicacaoComponent},
{path: 'publicacoes', component: PublicacaoListComponent},
{path:'login', component: LoginComponent},
{path:'cadastro', component: CadastroUsuarioComponent},
{path: "carteira-vacinacao", component: CarteiraVacinacaoComponent},
{path: 'inicial', component: InicialComponent},
{ path: 'emergencia', component: EmergenciaComponent },
{ path: 'buscar-chip', component: BuscarChipComponent },
{path:'principal', component: PrincipalComponent, 
    children:[
        {path:"nav1", component:Nav1Component},
        {path: "nav2", component: Nav2Component}
    ]
}
];
