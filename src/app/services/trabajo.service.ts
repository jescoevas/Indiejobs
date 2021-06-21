import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Trabajo } from '../models/trabajo';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {

  constructor(private http:HttpClient) { }

  getTrabajo(trabajoId:string):Promise<Trabajo>{
    return new Promise<Trabajo>(resolve => {
      this.http.get(`${apiUrl}/trabajo/${trabajoId}`).subscribe(data => {
        const trabajo = data['trabajo']
        resolve(trabajo)
      })
    })
  }

  getTrabajosUsuario(id:string):Promise<Trabajo[]>{
    return new Promise<Trabajo[]>(resolve => {
      this.http.post(`${apiUrl}/usuario/trabajos`, {id}).subscribe(data => {
        const trabajos = data['trabajos']
        resolve(trabajos)
      })
    })
  }

  getNumTrabajosUsuario(id:string):Promise<number>{
    return new Promise<number>(resolve => {
      this.http.post(`${apiUrl}/usuario/trabajos`, {id}).subscribe(data => {
        const num = data['num']
        resolve(num)
      })
    })
  }

  nuevoTrabajo(datos:any):Promise<Object>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });

    return new Promise<Object>(resolve => {
      this.http.post(`${apiUrl}/trabajo/create`,datos, {headers}).subscribe(data => {
        const trabajoDB = data['trabajoDB']
        resolve(trabajoDB)
      })
    })
  }

  asignarFoto(foto:File, trabajoId:string):Promise<string>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });

    let formData = new FormData()
    formData.append('foto', foto, foto.name)
    formData.append('trabajoId', trabajoId)
    return new Promise<string>(resolve => {
      this.http.post(`${apiUrl}/trabajo/asignarFoto`, formData, {headers}).subscribe(data => {
        const msg = data['msg']
        resolve(msg)
      })
    })
  }

  getMejoresTrabajos(tipo:string):Promise<Trabajo[]>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<Trabajo[]>(resolve => {
      this.http.post(`${apiUrl}/trabajos/top`, {tipo}, {headers}).subscribe(data => {
        const trabajos = data['trabajos']
        resolve(trabajos)
      })
    })
  }

  getMisTrabajosValorados():Promise<Trabajo[]>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<Trabajo[]>(resolve => {
      this.http.get(`${apiUrl}/trabajos/mis-valorados`, {headers}).subscribe(data => {
        const trabajos = data['trabajos']
        resolve(trabajos)
      })
    })
  }

}
