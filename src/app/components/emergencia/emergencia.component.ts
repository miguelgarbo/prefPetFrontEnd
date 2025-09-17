import { Component, OnInit } from '@angular/core';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from '../../models/emergencia';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-emergencia',
  templateUrl: './emergencia.component.html',
  imports: [FormsModule, MdbFormsModule, CommonModule],
  styleUrls: ['./emergencia.component.scss']
})
export class EmergenciaComponent implements OnInit {

  emergencias: Emergencia[] = [];

  constructor(private emergenciaService: EmergenciaService) { }

  ngOnInit(): void {
    this.listarEmergencias();
  }

  listarEmergencias() {
    this.emergenciaService.findAll().subscribe({
      next: (data) => this.emergencias = data,
      error: (err) => console.error('Erro ao carregar emergências', err)
    });
  }
}
