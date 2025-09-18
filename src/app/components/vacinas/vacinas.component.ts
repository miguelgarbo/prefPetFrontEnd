import { Component, inject, OnInit } from '@angular/core';
import { VacinaslistComponent } from '../vacinaslist/vacinaslist.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-vacinas',
  imports: [ VacinaslistComponent, MdbTabsModule],
  templateUrl: './vacinas.component.html',
  styleUrl: './vacinas.component.scss'
})
export class VacinasComponent implements OnInit {
  animalService = inject(AnimalService);
  pets: Animal[] = [];

  ngOnInit(): void {
    this.animalService.findAll().subscribe({
      next: animais => this.pets = animais,
      error: (e) => console.log(e)
    });
  }
}
