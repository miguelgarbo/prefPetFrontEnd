import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Veterinario } from '../models/veterinario';
import { Tutor } from '../models/tutor';
import { Entidade } from '../models/entidade';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient)
  private API = 'http://localhost:8080/users'

  findAll(): Observable<Usuario[]>{
        return this.http.get<Usuario[]>(this.API+"/findAll")
  }

  findById(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(this.API+"/"+id)
  }

  deleteById(id:number): Observable<any>{
    return this.http.delete<any>(this.API+"/"+id)
  }

  update(usuario:Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(this.API+"/"+usuario.id, usuario)
  }

  saveVet(veterinario:Veterinario): Observable<Veterinario>{
    return this.http.post<Veterinario>(this.API+"/register/veterinario", veterinario)
  }

   saveTutor(tutor:Tutor): Observable<Tutor>{
    return this.http.post<Tutor>(this.API+"/register/tutor", tutor)
  }

   saveEntidade(entidade:Entidade): Observable<Entidade>{
    return this.http.post<Entidade>(this.API+"/register/entidade", entidade)
  }

  findByNome(nome:string): Observable<Usuario>{

    return this.http.get<Usuario>(`${this.API}/findByNome`, 
      { params: { nome: nome } });
  }

  findByCpf(cpf:string): Observable<Usuario[]>{
   return this.http.get<Usuario[]>(`${this.API}/findByCpf`, 
      { params: { cpf: cpf } });
  }

  findByEmail(email:string): Observable<Usuario>{
    return this.http.get<Usuario>(this.API+"/findByEmail", {
      params: {email: email}
    })
  }


  constructor() { }




}
