import { Component, OnInit } from '@angular/core';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from '../../models/emergencia';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { error } from 'console';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../models/contato';

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
  todosContatos: Contato[] =[];
  contatosSelecionadosIds: number[] = [];
  mostrarContatos = false;
  

  constructor(
    private emergenciaService: EmergenciaService, 
    private contatoService: ContatoService) { }

  ngOnInit(): void {
    this.listarEmergencias();
    this.listarContato();
  }

  listarEmergencias() {
    this.emergenciaService.findAll().subscribe({
      next: (data) => this.emergencias = data,
      error: (err) => console.error('Erro ao carregar emergências', err)
    });
  }
  listarContato(){
    this.contatoService.findAll().subscribe({
      next: (data) => this.todosContatos = data,
      error: (err) => console.error('Erro ao carregar os contatos', err)
    });
  }



  adicionarEmergencia(): void {
    const emergenciaParaSalvar = {
      nome: this.novaEmergencia.nome,
      contatos: this.contatosSelecionadosIds.map(id => ({ id } as Contato)) // ele referencia pelo id, pois ja existem contatos no banco
    } as Emergencia;

    this.emergenciaService.save(emergenciaParaSalvar).subscribe({
      next: () => {
        this.listarEmergencias();
        this.novaEmergencia.nome = '';
        this.contatosSelecionadosIds = [];
      },
      error: err => console.error('Erro ao salvar emergência', err)
    });
  }

  adicionarContato(): void {

    const c = this.novoContato;
    if (!c.nomeOrgao?.trim() || !c.telefone?.trim() || !c.email?.trim()) { //faz a verificação se ta tudo preenchido
    console.warn("Preencha todos os campos corretamente");
    return;
  }
  
    console.log("Enviando contato:", JSON.stringify(c));   // só pra ver o que ta sendo salvo
    this.contatoService.save(c).subscribe({
      next: (res) => {
        console.log('Contato salvo com sucesso:', res);
        this.listarContato(); // já aproveita sua função existente
        this.novoContato = { nomeOrgao: '', telefone: '', email: '', ativo: true}; // limpa form
      },
      error: (err) => console.error('Erro ao salvar contato', err)
    });
  }
}

  





