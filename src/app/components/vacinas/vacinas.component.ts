import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VacinaslistComponent } from '../vacinaslist/vacinaslist.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-vacinas',
  imports: [RouterOutlet, VacinaslistComponent, MdbTabsModule],
  templateUrl: './vacinas.component.html',
  styleUrl: './vacinas.component.scss'
})
export class VacinasComponent implements OnInit {
  animalService = inject(AnimalService);
  pets: Animal[] = [];

  ngOnInit(): void {
    this.animalService.findAll().subscribe({
      next: animais => this.pets = animais,
      error: () => alert('Erro ao carregar :c')
    });
  }
}
