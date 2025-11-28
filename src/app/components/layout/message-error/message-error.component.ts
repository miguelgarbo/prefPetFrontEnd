import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-message-error',
  imports: [CommonModule, NgIf],
  templateUrl: './message-error.component.html',
  styleUrl: './message-error.component.scss'
})
export class MessageErrorComponent {

  @Input() texto: string = ''; 
  @Input() mostrar: boolean = false; 

  fechar() {
    this.mostrar = false;
  }

}
