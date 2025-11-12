import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Tutor } from '../models/tutor';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient)
  API =  "http://localhost:8080/login"
  
  constructor(){}

  logar(login: Login): Observable<string>{
    return this.http.post<string>(this.API, login, {responseType: 'text' as 'json'});
  }

  addToken(token: string){
    this.removeToken()
    localStorage.setItem('token', token)
  }

  removeToken(){
    localStorage.removeItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  jwtDecode(){
    let token = this.getToken();
    if(token){
      return jwtDecode<JwtPayload>(token)
    }
    return ""
  }

  hasRole(role:string){
   let user = this.jwtDecode() as Usuario
    if(user.role == role){
        return true
    }else{
      return false
    }
  }

  getCurrentUser(){
    return this.jwtDecode() as Usuario
  }

}
