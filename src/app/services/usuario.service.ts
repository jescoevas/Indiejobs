import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  registro(usuario:Usuario):Promise<Object>{
    return new Promise<Object>(resolve => {
      this.http.post(`${apiUrl}/registro`,usuario).subscribe(data => {
        const msg = data['msg']
        const token = data['token']
        resolve({msg, token})
      })
    })
  }

  asignarFoto(foto:File, token:string):Promise<string>{
    const headers = new HttpHeaders({
      'x-token': token
    });

    let formData = new FormData()
    formData.append('foto', foto, foto.name)
    return new Promise<string>(resolve => {
      this.http.post(`${apiUrl}/asignarFoto`, formData, {headers}).subscribe(data => {
        const msg = data['msg']
        resolve(msg)
      })
    })
  }

  login(data:any):Promise<string>{
    return new Promise<string>(resolve => {
      this.http.post(`${apiUrl}/login`,data).subscribe(data => {
        const msg = data['msg']
        if(msg === 'Login realizado con exito'){
          localStorage.setItem('token', data['token'])
          localStorage.setItem('usuarioId', data['usuarioId'])
        }
        resolve(msg)
      })
    })
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

  cerrarSesion(){
    localStorage.removeItem('token')
    localStorage.removeItem('usuarioId')
  }

}
