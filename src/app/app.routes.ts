import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { PublicacaoListComponent } from './components/publicacao-list/publicacao-list.component';
import { InicialComponent } from './components/inicial/inicial.component';
import { CadastroPublicacaoComponent } from './components/cadastro-publicacao/cadastro-publicacao.component';
import { CarteiraVacinacaoComponent } from './components/carteira-vacinacao/carteira-vacinacao.component';
import { EmergenciaComponent } from './components/emergencia/emergencia.component';
import { BuscarChipComponent } from './components/buscar-chip/buscar-chip.component';


export const routes: Routes = [
{path: '', redirectTo:'inicial', pathMatch:'full'},
{path: "cadastro-publicacao", component: CadastroPublicacaoComponent},
{path: 'publicacoes', component: PublicacaoListComponent},
{path:'login', component: LoginComponent},
{path:'cadastro', component: CadastroUsuarioComponent},
{path: "carteira-vacinacao", component: CarteiraVacinacaoComponent},
{path: 'inicial', component: InicialComponent},
{ path: 'emergencia', component: EmergenciaComponent },
{ path: 'buscar-chip', component: BuscarChipComponent },
{path:'principal', component: PrincipalComponent}
];
