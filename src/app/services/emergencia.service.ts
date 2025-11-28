import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emergencia } from '../models/emergencia';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmergenciaService {

  private http = inject(HttpClient)

  private baseUrl = environment.SERVIDOR+'/emergencia';

  constructor() { }

  findAll(): Observable<Emergencia[]> {
    return this.http.get<Emergencia[]>(`${this.baseUrl}/findAll`);
  }

  findById(id: number): Observable<Emergencia> {
    return this.http.get<Emergencia>(`${this.baseUrl}/${id}`);
  }

  save(emergencia: Emergencia): Observable<Emergencia> {
    return this.http.post<Emergencia>(`${this.baseUrl}`, emergencia);
  }

  update(id: number, emergencia: Emergencia): Observable<Emergencia> {
    return this.http.put<Emergencia>(`${this.baseUrl}/${id}`, emergencia);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  unlinkContato(emergenciaId: number, contatoId: number): Observable<void> { //para desvincular a Emergencia do Contato, para poderem ser excluídas separadamentes
  return this.http.delete<void>(
    `${this.baseUrl}/${emergenciaId}/contato/${contatoId}`,
    //{responseType: 'text' as 'json'}   aqui é se caso o back retorne um json, nesse caso retorna apenas um 204, um corpo sem resposta
  );
}

}
