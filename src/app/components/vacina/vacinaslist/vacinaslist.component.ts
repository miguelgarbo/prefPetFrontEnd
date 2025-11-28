import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AplicacaoVacina } from '../../../models/aplicacao-vacina';
import { AplicacaoVacinaService } from '../../../services/aplicacao-vacina.service';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';

@Component({
  selector: 'app-vacinaslist',
  standalone: true,
  templateUrl: './vacinaslist.component.html',
  styleUrls: ['./vacinaslist.component.scss'],
  imports: [MdbTabsModule]
})
export class VacinaslistComponent implements OnInit, OnDestroy {

  @Input() tab: 'aplicadas' | 'pendentes' | 'proximas' = 'aplicadas';
  @Input() animalId: number = 0;

  lista: AplicacaoVacina[] = [];
  private sub?: Subscription;

  constructor(private aplicacaoService: AplicacaoVacinaService) {}

  ngOnInit(): void {
    if (this.animalId) {
      this.carregar(this.animalId);
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnChanges() {
    if (this.animalId) {
      this.carregar(this.animalId);
    }
  }

  private carregar(id: number) {
    this.sub?.unsubscribe();
    this.sub = this.aplicacaoService.findByAnimalId(id).subscribe({
      next: lista => {
        this.lista = lista.map(v => ({
          ...v,
          status: this.status(v)
        }));
      },
      error: err => console.error(err)
    });
  }

  private status(v: AplicacaoVacina): 'APLICADA' | 'PENDENTE' | 'PROXIMA' {
    const hoje = new Date();

    const dataAplicacao = v.dataAplicacao ? new Date(v.dataAplicacao) : null;
    const dataPrevista = v.dataPrevista ? new Date(v.dataPrevista) : null;

    if (dataAplicacao) return 'APLICADA';
    if (!dataPrevista) return 'PENDENTE';

    const prev = new Date(dataPrevista.getFullYear(), dataPrevista.getMonth(), dataPrevista.getDate());
    const hojeD = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

    if (prev < hojeD) return 'PENDENTE';
    return 'PROXIMA';
  }

  get filtrada() {
    return this.lista.filter(v => {
      if (this.tab === 'aplicadas') return v.status === 'APLICADA';
      if (this.tab === 'pendentes') return v.status === 'PENDENTE';
      return v.status === 'PROXIMA';
    });
  }
}
