import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AplicacaoVacina } from '../models/aplicacao-vacina';

@Injectable({
  providedIn: 'root'
})
export class AplicacaoVacinaService {
  private apiUrl = 'http://localhost:8080/aplicacao'; // ajuste a URL da sua API

  constructor(private http: HttpClient) {}

  findAll(): Observable<AplicacaoVacina[]> {
    return this.http.get<AplicacaoVacina[]>(this.apiUrl);
  }

  findByAnimal(animalId: number): Observable<AplicacaoVacina[]> {
    return this.http.get<AplicacaoVacina[]>(
      `http://localhost:8080/animais/${animalId}/aplicacoes`
    );
  }
}
