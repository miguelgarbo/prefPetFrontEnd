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

  gerarConvite(iddestinario:number,idtutor: number, idanimal: number): Observable<string>{
    return this.http.get<string>(this.api+"/gerarConvite",{
      params: {'tutorDestinatario_id': iddestinario,'tutor_id': idtutor, 'animal_id': idanimal}
    })
  }

  gerar(): Observable<string>{
    return this.http.get<string>(this.api+"/gerar")
  }


  constructor() { }

}
