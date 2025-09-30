import { Component, OnInit, OnChanges, SimpleChanges, inject, Input } from '@angular/core';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from 'express';

@Component({
  selector: 'app-animal-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss']
})
export class AnimalDetailsComponent implements OnInit, OnChanges {
  @Input() animal!: Animal;
  @Output() animalSaved: EventEmitter<void> = new EventEmitter<void>();

  editMode = false;
  editedAnimal!: Animal;
  animalService = inject(AnimalService);

  ngOnInit(): void {
    this.initializeAnimal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['animal'] && !changes['animal'].firstChange) {
      this.initializeAnimal();
    }
  }

  private initializeAnimal(): void {
    this.editMode = false;
    this.editedAnimal = { ...this.animal };
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    this.editedAnimal = { ...this.animal };
  }

  saveChanges() {
    // Verificação e lógica de atualização
    if (this.editedAnimal.microchip && !this.editedAnimal.numeroMicrochip) {
      Swal.fire({
        icon: 'warning',
        title: 'Erro',
        text: 'Por favor, insira o número do microchip.',
      });
      return;
    }

    this.animalService.update(this.editedAnimal).subscribe({
      next: (updated) => {
        this.animal = updated;
        this.editMode = false;

        this.animalSaved.emit();

        window.location.reload();
      },
      error: (err) => {
        console.error('Erro ao atualizar animal', err);
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Houve um erro ao salvar as informações do animal. Tente novamente.',
        });
      }
    });
  }

}
