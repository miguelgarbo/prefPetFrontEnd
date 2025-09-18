import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal';

@Injectable({
  providedIn: 'root'
})

export class AnimalService {
<<<<<<< HEAD
  private apiUrl = 'http://localhost:8080/animais'; // ajuste a URL do seu backend
=======
  private apiUrl = 'http://localhost:8080/animais'; 
>>>>>>> a2d0d7f91a09e12bd2205ea934fb489b459628e9

  private http = inject(HttpClient);

  findAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  findByTutor(tutorId: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}/tutor/${tutorId}`);
  }
<<<<<<< HEAD
}
=======

  findByMicrochip(numeroMicrochip: string): Observable<Animal>{

    return this.http.get<Animal>(this.apiUrl+"/findByMicrochip",{
        params: {numeroMicrochip: numeroMicrochip}
      } )
  }

}
>>>>>>> a2d0d7f91a09e12bd2205ea934fb489b459628e9
