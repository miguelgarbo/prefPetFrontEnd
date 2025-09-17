import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emergencia } from '../models/emergencia';

@Injectable({
  providedIn: 'root'
})
export class EmergenciaService {

  private baseUrl = 'http://localhost:8080/emergencia';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Emergencia[]> {
    return this.http.get<Emergencia[]>(`${this.baseUrl}/findAll`);
  }

  findById(id: number): Observable<Emergencia> {
    return this.http.get<Emergencia>(`${this.baseUrl}/findById/${id}`);
  }

  save(emergencia: Emergencia): Observable<Emergencia> {
    return this.http.post<Emergencia>(`${this.baseUrl}/save`, emergencia);
  }

  update(id: number, emergencia: Emergencia): Observable<Emergencia> {
    return this.http.put<Emergencia>(`${this.baseUrl}/update/${id}`, emergencia);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
