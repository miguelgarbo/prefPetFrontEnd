import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { CadastroUsuarioComponent } from './components/tutor/cadastro-usuario/cadastro-usuario.component';
import { PublicacaoListComponent } from './components/publicacao/publicacao-list/publicacao-list.component';
import { InicialComponent } from './components/inicial/inicial.component';
import { CadastroPublicacaoComponent } from './components/publicacao/cadastro-publicacao/cadastro-publicacao.component';
import { VacinasComponent } from './components/vacina/vacinas/vacinas.component';
import { Nav1Component } from './components/layout/nav1/nav1.component';
import { Nav2Component } from './components/layout/nav2/nav2.component';
import { CarteiraVacinacaoComponent } from './components/animais/carteira-vacinacao/carteira-vacinacao.component';
import { EmergenciaComponent } from './components/emergencia/emergencia.component';
import { BuscarChipComponent } from './components/buscar-chip/buscar-chip.component';
import { AnimalListComponent } from './components/animais/animal-list/animal-list.component';
// import { CadastroAnimalComponent } from './components/cadastro-animal/cadastro-animal.component';
import { AnimalDetailsComponent } from './components/animais/animal-details/animal-details.component';

import { NotificacoesComponent } from './components/notificacao/notificacoes/notificacoes.component';
import { BuscarTutorComponent } from './components/buscar-tutor/buscar-tutor.component';
import { VeterinarioDetailsComponent } from './components/veterinario-details/veterinario-details.component';
import { loginGuard } from './auth/login.guard';
import { EntidadeCadastroComponent } from './components/entidade-cadastro/entidade-cadastro.component';



export const routes: Routes = [
{path: '', redirectTo:'inicial', pathMatch:'full'},
{path: "cadastro-publicacao", component: CadastroPublicacaoComponent},
{path:'login', component: LoginComponent},
{path:'cadastro', component: CadastroUsuarioComponent},
{path: 'inicial', component: InicialComponent},
{path:'principal', component: PrincipalComponent},
{path: 'emergencia', component: EmergenciaComponent},
{path: 'cadastro-usuario', component: CadastroUsuarioComponent},
{path: 'buscar-chip', component: BuscarChipComponent} ,
{path: 'veterinario-cadastro', component: VeterinarioDetailsComponent},
{path: 'entidade-cadastro', component: EntidadeCadastroComponent},


{path:'principal', component: PrincipalComponent, 
    
    children:[
    { path: '', redirectTo: 'animal', pathMatch: 'full' }, 
    {path:'animal', component: AnimalListComponent,
    children:[
        {path:":id", component: AnimalDetailsComponent},
    ]},

    {path: 'buscar-chip', component: BuscarChipComponent, canActivate: [loginGuard]},
    {path: 'emergencia', component: EmergenciaComponent},
    {path: 'vacinas', component: VacinasComponent},
    {path: 'publicacoes', component: PublicacaoListComponent},
    {path: "carteira-vacinacao/:id", component: CarteiraVacinacaoComponent},
    {path: 'notificacoes', component: NotificacoesComponent},
    {path: "buscar-tutor/:id", component: BuscarTutorComponent},
    {path:"cadastro-usuario/:id", component: CadastroUsuarioComponent}

    ], 

 
},

];
