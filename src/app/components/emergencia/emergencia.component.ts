import { Component, OnInit } from '@angular/core';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from '../../models/emergencia';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { error } from 'console';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-emergencia',
  templateUrl: './emergencia.component.html',
  imports: [FormsModule, MdbFormsModule, CommonModule],
  styleUrls: ['./emergencia.component.scss']
})
export class EmergenciaComponent implements OnInit {

  emergencias: Emergencia[] = [];
  novaEmergencia = { nome: '' };
  novoContato = { nomeOrgao: '', telefone: '', email: '', ativo: true };
  contatoSelecionado = { emergenciaId: null };

  constructor(
    private emergenciaService: EmergenciaService, 
    private contatoService: ContatoService) { }

  ngOnInit(): void {
    this.listarEmergencias();
  }

  listarEmergencias() {
    this.emergenciaService.findAll().subscribe({
      next: (data) => this.emergencias = data,
      error: (err) => console.error('Erro ao carregar emergências', err)
    });
  }

  adicionarEmergencia(){
    this.emergenciaService.save(this.novaEmergencia).subscribe({
      next: (data) => {
        this.emergencias.push(data);
        this.novaEmergencia = { nome: '' };
       console.log('Emergência adicionada com sucesso!', data);}
      }
    )
  }

  adicionarContato() {
  const contato = { ...this.novoContato }; // apenas o contato em si
  this.contatoService.save(contato).subscribe({
    next: (data) => {
      console.log('Contato adicionado com sucesso!', data);

      // limpa os campos do formulário
      this.novoContato = { nomeOrgao: '', telefone: '', email: '', ativo: true };
    },
    error: (err) => console.error('Erro ao adicionar contato', err)
  });
}

}
