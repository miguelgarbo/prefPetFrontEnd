import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Notificacao } from '../models/notificacao';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  api = environment.SERVIDOR+'/notificacoes'

  private http = inject(HttpClient)

  // Buscar notificações de um tutor
  findByTutorId(id: number): Observable<Notificacao[]> {
    return this.http.get<Notificacao[]>(`${this.api}/findByTutorId`, {
      params: { id: id }
    });
  }

  // Gerar convite de transferência
  gerarConvite(destinatarioId: number, remetenteId: number, animalId: number): Observable<Notificacao> {
    return this.http.post<Notificacao>(`${this.api}/gerarConvite`, null, {
      params: {
        tutorDestinatario_id: destinatarioId,
        tutorRemetente_id: remetenteId,
        animal_id: animalId
      }
    });
  }

  // Aceitar convite
conviteAceito(notificacaoId: number): Observable<string> {
  return this.http.post(`${this.api}/conviteAceito/${notificacaoId}`, null, {
    responseType: 'text'
  });
}


  // Gerar notificações de vacinas data validade
  gerar(): Observable<string> {
    return this.http.get<string>(`${this.api}/gerar`);
  }

  constructor() { }

}
