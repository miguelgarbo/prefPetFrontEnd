import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private apiUrl = 'http://localhost:8080/contatos'; // ajuste se necessário

  constructor(private http: HttpClient) {}

  findAll(): Observable<Contato[]> {
    return this.http.get<Contato[]>(`${this.apiUrl}/findAll`);
  }

  save(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(`${this.apiUrl}/save`, contato);
  } 
}
