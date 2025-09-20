import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal';

@Injectable({
  providedIn: 'root'  
})

export class AnimalService {
  private apiUrl = 'http://localhost:8080/animais'; 

  private http = inject(HttpClient);

  findAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl+"/findAll");
  }

    findByTutor(tutorId: number): Observable<Animal[]> {
      return this.http.get<Animal[]>(`${this.apiUrl}/findByTutor?tutorId=${tutorId}`);
    }

  findByMicrochip(numeroMicrochip: string): Observable<Animal>{
    return this.http.get<Animal>(this.apiUrl+"/findByMicrochip",{
        params: {numeroMicrochip: numeroMicrochip}
      } )
  }

  findById(id:number): Observable<Animal>{
      return this.http.get<Animal>(this.apiUrl+"/findById/"+id)
    }

}
