import { Component, EventEmitter, inject, Input, output, Output } from '@angular/core';
import { Notificacao } from '../../../models/notificacao';
import { NotificacaoService } from '../../../services/notificacao.service';
import e from 'express';

@Component({
  selector: 'app-card-notificacao',
  imports: [],
  templateUrl: './card-notificacao.component.html',
  styleUrl: './card-notificacao.component.scss'
})
export class CardNotificacaoComponent {

  public isButtonDisabled: boolean = false;
  @Input() notificacao!: Notificacao;
  @Input() mostrar: boolean = false;
  @Output() conviteAceitoEvent: EventEmitter<void> = new EventEmitter<void>();

  notificacaoService = inject(NotificacaoService)

  fechar() {
    this.mostrar = false;
  }

  aceitarConvite(){

    this.notificacaoService.conviteAceito(this.notificacao.id).subscribe({

      next: (mensagem)=>{
        console.log("Convite Aceito e Atualizado Com Sucesso Resposta:")
        console.log(mensagem)
        this.conviteAceitoEvent.emit()
        this.isButtonDisabled = true;
      },
      error(err) {
          console.error(err)
      },


    })
  }

    

  




}
