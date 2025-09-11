import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Entidade } from '../models/entidade';
import { Observable } from 'rxjs';
import { ObjectEncodingOptions } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class EntidadeService {

  private http = inject(HttpClient)
  private API = 'http://localhost:8080/entidades'

  findAll(): Observable<Entidade[]>{
        return this.http.get<Entidade[]>(this.API)
  }

  findById(id:number): Observable<Entidade>{
    return this.http.get<Entidade>(this.API+"/"+id)
  }

  deleteById(id:number): Observable<any>{
    return this.http.delete<any>(this.API+"/"+id)
  }

  update(entidade:Entidade): Observable<Entidade>{
    return this.http.put<Entidade>(this.API+"/"+entidade.id, entidade)
  }

  save(entidade:Entidade): Observable<Entidade>{
    return this.http.post<Entidade>(this.API, entidade)
  }

  findByNome(nome:string): Observable<Entidade[]>{

    return this.http.get<Entidade[]>(`${this.API}/findByNome`, 
      { params: { nome: nome } });
  }

  findByCpf(cpf:string): Observable<Entidade[]>{
   return this.http.get<Entidade[]>(`${this.API}/findByNome`, 
      { params: { cpf: cpf } });
  }

  findByEmail(email:string): Observable<Entidade[]>{
    return this.http.get<Entidade[]>(this.API, {
      params: {email: email}
    })
  }

  findByTelefone(telefone: string): Observable<Entidade[]>{

      return this.http.get<Entidade[]>(this.API,{
        params: {telefone: telefone}
      })

  }

  findByCnpj(cnpj:string): Observable<Entidade[]>{

    return this.http.get<Entidade[]>(this.API,{
      params: {cnpj: cnpj}
    })
  }

  findByTipoEntidade(tipoEntidade:string): Observable<Entidade[]>{

    return this.http.get<Entidade[]>(this.API,{
      params: {tipoEntidade: tipoEntidade}
    } )
  }


  

  constructor() { }
}
