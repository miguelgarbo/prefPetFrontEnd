import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AplicacaoVacina } from '../../../models/aplicacao-vacina';
import { AplicacaoVacinaService } from '../../../services/aplicacao-vacina.service';
import { MdbTabsModule } from "mdb-angular-ui-kit/tabs";

@Component({
  selector: 'app-vacinaslist',
  standalone: true,
  templateUrl: './vacinaslist.component.html',
  styleUrls: ['./vacinaslist.component.scss'],
  imports: [MdbTabsModule],
})
export class VacinaslistComponent implements OnInit, OnDestroy {

  private sub: Subscription | null = null;

  lista: AplicacaoVacina[] = [];

  private _animalId = 0;
  @Input()
  set animalId(value: number) {
    this._animalId = value ?? 0;
    if (this._animalId) this.load(this._animalId);
    else this.lista = [];
  }
  get animalId() {
    return this._animalId;
  }

  constructor(private aplicacaoService: AplicacaoVacinaService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private load(animalId: number) {
    this.sub?.unsubscribe();
    this.sub = this.aplicacaoService.findByAnimalId(animalId).subscribe({
      next: (value) => {
        this.lista = value.map(v => ({
          ...v,
          status: this.classificar(v)
        }));
      },
      error: (err) => console.error(err)
    });
  }

  private classificar(v: AplicacaoVacina): 'APLICADA' | 'PENDENTE' | 'PROXIMA' {
    const hoje = new Date();
    const dataAplicacao = v.dataAplicacao ? new Date(v.dataAplicacao) : null;
    const dataPrevista = v.dataPrevista ? new Date(v.dataPrevista) : null;

    if (dataAplicacao) return 'APLICADA';
    if (!dataPrevista) return 'PENDENTE';

    const dPrev = new Date(dataPrevista.getFullYear(), dataPrevista.getMonth(), dataPrevista.getDate());
    const dHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

    return dPrev < dHoje ? 'PENDENTE' : 'PROXIMA';
  }

  get aplicadas() {
    return this.lista.filter(v => v.status === 'APLICADA');
  }

  get pendentes() {
    return this.lista.filter(v => v.status === 'PENDENTE');
  }

  get proximas() {
    return this.lista.filter(v => v.status === 'PROXIMA');
  }

  trackById(index: number, item: any) {
    return item.id ?? index;
  }
}
