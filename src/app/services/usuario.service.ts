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

  getUsuario(usuarioId:string):Promise<Usuario>{
    return new Promise<Usuario>(resolve => {
      this.http.get(`${apiUrl}/usuario/${usuarioId}`).subscribe(data => {
        const usuario = data['usuario']
        resolve(usuario)
      })
    })
  }

  registro(usuario:Usuario):Promise<Object>{
    return new Promise<Object>(resolve => {
      this.http.post(`${apiUrl}/registro`,usuario).subscribe(data => {
        const msg = data['msg']
        const token = data['token']
        resolve({msg, token})
      })
    })
  }

  editar(usuario:Usuario):Promise<Object>{
    return new Promise<Object>(resolve => {
      this.http.put(`${apiUrl}/editar`,usuario).subscribe(data => {
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
          localStorage.setItem('foto', data['foto'])
        }
        resolve(msg)
      })
    })
  }

  getTrabajadores():Promise<Usuario[]>{
    return new Promise<Usuario[]>(resolve => {
      this.http.get(`${apiUrl}/trabajadores`).subscribe(data => {
        const trabajadores = data['trabajadores']
        resolve(trabajadores)
      })
    })
  }

  checkEmail(email:string):Promise<number>{
    return new Promise<number>(resolve => {
      this.http.post(`${apiUrl}/checkEmail`, {email}).subscribe(data => {
        const num = data['num']
        resolve(num)
      })
    })
  }

  checkTelefono(telefono:string):Promise<number>{
    return new Promise<number>(resolve => {
      this.http.post(`${apiUrl}/checkTelefono`, {telefono}).subscribe(data => {
        const num = data['num']
        resolve(num)
      })
    })
  }

  sesionIniciada(){
    return localStorage.getItem('token') ? true : false
  }

  cerrarSesion(){
    localStorage.clear()
  }

}
