import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacina } from '../models/vacina';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacinaService {

  http = inject(HttpClient)
  API = environment.SERVIDOR+"/vacinas"

  constructor() { }
    findAll(): Observable<Vacina[]>{
    return this.http.get<Vacina[]>(this.API+"/findAll");
  }

   save(vacina: Vacina): Observable<Vacina>{
    return this.http.post<Vacina>(this.API+"/save", vacina);
  } 
}
