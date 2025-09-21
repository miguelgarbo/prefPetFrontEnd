import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../models/tutor';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  private http = inject(HttpClient)
  private API = 'http://localhost:8080/tutores'

  findAll(): Observable<Tutor[]>{
        return this.http.get<Tutor[]>(this.API+"/")
  }

  findById(id:number): Observable<Tutor>{
    return this.http.get<Tutor>(this.API+"/"+id)
  }

  deleteById(id:number): Observable<any>{
    return this.http.delete<any>(this.API+"/"+id)
  }

  update(tutor:Tutor): Observable<Tutor>{
    return this.http.put<Tutor>(this.API+"/"+tutor.id, tutor)
  }

  save(tutor:Tutor): Observable<Tutor>{
    return this.http.post<Tutor>(this.API, tutor)
  }

  findByNome(nome:string): Observable<Tutor>{

    return this.http.get<Tutor>(`${this.API}/findByNome`, 
      { params: { nome: nome } });
  }

  findByCpf(cpf:string): Observable<Tutor[]>{
   return this.http.get<Tutor[]>(`${this.API}/findByCpf`, 
      { params: { cpf: cpf } });
  }

  findByEmail(email:string): Observable<Tutor>{
    return this.http.get<Tutor>(this.API+"/findByEmail", {
      params: {email: email}
    })
  }

  findByTelefone(telefone: string): Observable<Tutor[]>{

      return this.http.get<Tutor[]>(this.API,{
        params: {telefone: telefone}
      })

  }

  findByCnpj(cnpj:string): Observable<Tutor[]>{

    return this.http.get<Tutor[]>(this.API,{
      params: {cnpj: cnpj}
    })
  }

  login(email: string, password: string): Observable<Boolean>{

    return this.http.get<Boolean>(this.API+"/login", {
      params: {email: email, senha: password}
    })
  }


  constructor() { }
}
