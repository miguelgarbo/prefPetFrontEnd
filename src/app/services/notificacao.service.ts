import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Notificacao } from '../models/notificacao';
import { Observable } from 'rxjs';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  api = 'http://localhost:8080/notificacoes'

  private http = inject(HttpClient)


  findByTutorId(id: number): Observable<Notificacao[]>{

   return this.http.get<Notificacao[]>(this.api+"/findByTutorId",
      {params: {id: id}})

  }

  gerar(): Observable<String>{
    return this.http.get<String>(this.api+"/gerar")
  }


  constructor() { }

}
