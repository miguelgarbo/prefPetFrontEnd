import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veterinario } from '../models/veterinario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private http = inject(HttpClient);
  private API = environment.SERVIDOR+'/veterinarios';

  constructor() {}

  save(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(this.API, veterinario);
  }

  findById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.API}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`);
  }

  update(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.put<Veterinario>(`${this.API}/${veterinario.id}`, veterinario);
  }

  findAll(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.API}/findAll`);
  }

  findByNome(nome: string): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.API}/findByNome`, {
      params: { nome }
    });
  }

  findByCPF(cpf: string): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.API}/findByCPF`, {
      params: { cpf }
    });
  }

  findByEmail(email: string): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.API}/findByEmail`, {
      params: { email }
    });
  }

}
