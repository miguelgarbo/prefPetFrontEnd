import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-message-error',
  imports: [CommonModule, NgIf],
  templateUrl: './message-error.component.html',
  styleUrl: './message-error.component.scss'
})
export class MessageErrorComponent {

  @Input() texto: string = ''; // recebe o texto de erro do pai
  @Input() mostrar: boolean = false; // controla se exibe ou não

  // opcional: método para fechar o erro
  fechar() {
    this.mostrar = false;
  }

}
