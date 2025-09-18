import { Component, Input } from '@angular/core';
import { Notificacao } from '../../models/notificacao';

@Component({
  selector: 'app-card-notificacao',
  imports: [],
  templateUrl: './card-notificacao.component.html',
  styleUrl: './card-notificacao.component.scss'
})
export class CardNotificacaoComponent {

  @Input() notificacao!: Notificacao;
  @Input() mostrar: boolean = false;

  fechar() {
    this.mostrar = false;
  }

}
