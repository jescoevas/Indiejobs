import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';
import { TrabajoService } from './trabajo.service';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private trabajoService:TrabajoService) { }

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
        resolve({msg})
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
        const foto = data['foto']
        resolve(foto)
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

  getTrabajadoresCercanos():Promise<Usuario[]>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });

    return new Promise<Usuario[]>(resolve => {
      this.http.get(`${apiUrl}/trabajadores/cercanos`, {headers}).subscribe(data => {
        const trabajadores = data['cercanos']
        resolve(trabajadores)
      })
    })
  }

  getTrabajadoresBuscador(datos:any):Promise<Usuario[]>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });

    return new Promise<Usuario[]>(resolve => {
      this.http.post(`${apiUrl}/buscador`, datos, {headers}).subscribe(data => {
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

  async getEstrellasTrabajador(id:string){
    const trabajos = await this.trabajoService.getTrabajosUsuario(id)
    let res = 0
    for (let index = 0; index < trabajos.length; index++) {
      res+=trabajos[index].estrellas
    }
    return res
  }

  async getMejoresTrabajadores(tipo:string, orden:string):Promise<Usuario[]>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<Usuario[]>(resolve => {
      this.http.post(`${apiUrl}/trabajadores/top`, {tipo, orden}, {headers}).subscribe(data => {
        const trabajadores = data['trabajadores']
        resolve(trabajadores)
      })
    })
  }

  async getSeguidores(_id:string):Promise<Usuario[]>{ 
    return new Promise<Usuario[]>(resolve => {
      this.http.post(`${apiUrl}/seguidores`, {_id}).subscribe(data => {
        const seguidores = data['seguidores']
        resolve(seguidores)
      })
    })
  }

  async getSiguiendo(_id:string):Promise<Usuario[]>{
    return new Promise<Usuario[]>(resolve => {
    this.http.post(`${apiUrl}/siguiendo`, {_id}).subscribe(data => {
      const siguiendo = data['siguiendo']
      resolve(siguiendo)
      })
    })
  }

  async getNumSiguiendo(_id:string):Promise<number>{
      return new Promise<number>(resolve => {
      this.http.post(`${apiUrl}/siguiendo`, {_id}).subscribe(data => {
        const num = data['num']
        resolve(num)
      })
    })
  }
  
  async getNumSeguidores(_id:string):Promise<number>{ 
    return new Promise<number>(resolve => {
      this.http.post(`${apiUrl}/seguidores`, {_id}).subscribe(data => {
        const num = data['num']
        resolve(num)
      })
    })
  }
  async getSeguido(_id:string):Promise<Boolean>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<Boolean>(resolve => {
      this.http.post(`${apiUrl}/seguido`, {_id}, {headers}).subscribe(data => {
        const seguido = data['seguido']
        resolve(seguido)
      })
    })
  }

  async follow(_id:string):Promise<String>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<String>(resolve => {
      this.http.post(`${apiUrl}/follow`, {_id}, {headers}).subscribe(data => {
        const msg = data['msg']
        resolve(msg)
      })
    })
  }

  async unfollow(_id:string):Promise<String>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<String>(resolve => {
      this.http.post(`${apiUrl}/unfollow`, {_id}, {headers}).subscribe(data => {
        const msg = data['msg']
        resolve(msg)
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
