import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { PublicacaoListComponent } from './components/publicacao-list/publicacao-list.component';
import { InicialComponent } from './components/inicial/inicial.component';
import { CadastroPublicacaoComponent } from './components/cadastro-publicacao/cadastro-publicacao.component';
import { VacinasComponent } from './components/vacinas/vacinas.component';
import { Nav1Component } from './components/nav1/nav1.component';
import { Nav2Component } from './components/nav2/nav2.component';
import { CarteiraVacinacaoComponent } from './components/carteira-vacinacao/carteira-vacinacao.component';
import { EmergenciaComponent } from './components/emergencia/emergencia.component';
import { BuscarChipComponent } from './components/buscar-chip/buscar-chip.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { CadastroAnimalComponent } from './components/cadastro-animal/cadastro-animal.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';

import { NotificacoesComponent } from './components/notificacoes/notificacoes.component';
import { BuscarTutorComponent } from './components/buscar-tutor/buscar-tutor.component';



export const routes: Routes = [
{path: '', redirectTo:'inicial', pathMatch:'full'},
{path: "buscar-tutor", component: BuscarTutorComponent},
{path: "cadastro-publicacao", component: CadastroPublicacaoComponent},
{path: 'publicacoes', component: PublicacaoListComponent},
{path:'login', component: LoginComponent},
{path:'cadastro', component: CadastroUsuarioComponent},
{path: "carteira-vacinacao/:id", component: CarteiraVacinacaoComponent},
{path: 'inicial', component: InicialComponent},
{path: 'notificacoes', component: NotificacoesComponent},
{path: 'vacinas', component: VacinasComponent},
{path:'principal', component: PrincipalComponent},
{path: 'buscar-chip', component: BuscarChipComponent} ,
{path: 'emergencia', component: EmergenciaComponent},
{path: 'cadastro-usuario', component: CadastroUsuarioComponent},
{path:'animal', component: AnimalListComponent,
    children:[
        {path:"cadastro", component: CadastroAnimalComponent},
        {path:":id", component: AnimalDetailsComponent}
    ]
},
];
