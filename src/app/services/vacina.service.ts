import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacina } from '../models/vacina';

@Injectable({
  providedIn: 'root'
})
export class VacinaService {

  http = inject(HttpClient)
  API = "http://localhost:8080/vacinas"

  constructor() { }

  findAll(): Observable<Vacina[]>{
    return this.http.get<Vacina[]>(this.API+"/findAll");
  }
}
