import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  foto:any = null

  constructor(private http:HttpClient) { }

  registro(usuario:Usuario){
    return this.http.post(`${apiUrl}/registro`,usuario)
  }

  asignarFoto(foto, token){
    const headers = new HttpHeaders({
      'x-token': token
    });

    // let formData = new FormData()
    // formData.append('foto', foto)
    // console.log(foto)
    // console.log(formData)
    return this.http.post(`${apiUrl}/asignarFoto`, {foto}, {headers} )
  }

  login(data:any):Promise<string>{
    return new Promise<string>(resolve => {
      this.http.post(`${apiUrl}/login`,data).subscribe(data => {
        const msg = data['msg']
        if(msg === 'Login realizado con exito'){
          localStorage.setItem('token', data['token'])
          localStorage.setItem('foto', data['foto'])
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
    localStorage.removeItem('foto')
    this.foto = null
  }

  getFotoUsuario(){
    return localStorage.getItem('foto')
  }

}
