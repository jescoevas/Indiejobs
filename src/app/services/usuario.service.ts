import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  registro(usuario:Usuario){
    return this.http.post(`${apiUrl}/registro`,usuario)
  }

  login(data:any){
    return this.http.post(`${apiUrl}/login`,data)
  }

  getTrabajadores(){
    return this.http.get(`${apiUrl}/trabajadores`)
  }

  checkEmail(email:string){
    return this.http.post(`${apiUrl}/checkEmail`, {email})
  }

  checkTelefono(telefono:string){
    return this.http.post(`${apiUrl}/checkTelefono`, {telefono})
  }

  sesionIniciada(){
    return localStorage.getItem('token') ? true : false
  }

}
