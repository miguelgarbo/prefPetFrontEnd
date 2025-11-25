import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AplicacaoVacina } from '../models/aplicacao-vacina';

@Injectable({
  providedIn: 'root'
})
export class AplicacaoVacinaService {

  private apiUrl = 'http://localhost:8080/aplicacao';
  private http = inject(HttpClient);

  constructor() {}

  // ---------------------------
  // CRUD
  // ---------------------------

  save(aplicacao: AplicacaoVacina, meses: number): Observable<AplicacaoVacina> {
    return this.http.post<AplicacaoVacina>(
      `${this.apiUrl}?meses=${meses}`,
      aplicacao
    );
  }

  findById(id: number): Observable<AplicacaoVacina> {
    return this.http.get<AplicacaoVacina>(`${this.apiUrl}/${id}`);
  }

  findAll(): Observable<AplicacaoVacina[]> {
    return this.http.get<AplicacaoVacina[]>(`${this.apiUrl}/findAll`);
  }

  update(id: number, aplicacao: AplicacaoVacina): Observable<AplicacaoVacina> {
    return this.http.put<AplicacaoVacina>(
      `${this.apiUrl}/${id}`,
      aplicacao
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ---------------------------
  // CONSULTAS PERSONALIZADAS
  // ---------------------------

  findByAnimalId(animalId: number): Observable<AplicacaoVacina[]> {
    return this.http.get<AplicacaoVacina[]>(
      `${this.apiUrl}/findByAnimalId/${animalId}`
    );
  }

  findByLote(lote: string): Observable<AplicacaoVacina> {
    return this.http.get<AplicacaoVacina>(
      `${this.apiUrl}/by-lote?lote=${lote}`
    );
  }

  findByValidadeBefore(data: string): Observable<AplicacaoVacina[]> {
    return this.http.get<AplicacaoVacina[]>(
      `${this.apiUrl}/validade-before?data=${data}`
    );
  }

  findByValidadeAfter(data: string): Observable<AplicacaoVacina[]> {
    return this.http.get<AplicacaoVacina[]>(
      `${this.apiUrl}/validade-after?data=${data}`
    );
  }

  findByDataAplicacao(data: string): Observable<AplicacaoVacina[]> {
    return this.http.get<AplicacaoVacina[]>(
      `${this.apiUrl}/aplicacaoData?data=${data}`
    );
  }

  findByDataAplicacaoAfter(data: string): Observable<AplicacaoVacina[]> {
    return this.http.get<AplicacaoVacina[]>(
      `${this.apiUrl}/aplicacao-after?data=${data}`
    );
  }
}
