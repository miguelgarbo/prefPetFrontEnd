import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from '../models/contato';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private apiUrl = environment.SERVIDOR+'/contatos'; 

  constructor(private http: HttpClient) {}

  findAll(): Observable<Contato[]> {
    return this.http.get<Contato[]>(`${this.apiUrl}/findAll`);
  }

  save(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(`${this.apiUrl}/save`, contato);
  } 

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  update(id: number, contato: Contato): Observable<Contato> {
      return this.http.put<Contato>(`${this.apiUrl}/update/${id}`, contato);
    }
}
