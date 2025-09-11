import { inject, Injectable } from '@angular/core';
import { Publicacao } from '../models/publicacao';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {


   private http = inject(HttpClient)
   private API = 'http://localhost:8080/publicacao'

  findAll(): Observable<Publicacao[]>{
        return this.http.get<Publicacao[]>(this.API+"/findAll")
  }

  findById(id:number): Observable<Publicacao>{
    return this.http.get<Publicacao>(this.API+"/"+id)
  }

  deleteById(id:number): Observable<any>{
    return this.http.delete<any>(this.API+"/"+id)
  }

  update(publicacao:Publicacao): Observable<Publicacao>{
    return this.http.put<Publicacao>(this.API+"/"+publicacao.id, publicacao)
  }

  save(publicacao:Publicacao): Observable<Publicacao>{
    return this.http.post<Publicacao>(this.API, Publicacao)
  }


  constructor() { }
}
