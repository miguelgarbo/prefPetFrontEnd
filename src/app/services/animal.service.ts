import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal';

@Injectable({
  providedIn: 'root'
})

export class AnimalService {
  private apiUrl = 'http://localhost:8080/animais'; // ajuste a URL do seu backend

  private http = inject(HttpClient);

  findAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  findByTutor(tutorId: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}/tutor/${tutorId}`);
  }
}
