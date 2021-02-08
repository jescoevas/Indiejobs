import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Valoracion } from '../models/valoracion';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  constructor(private http:HttpClient) { }

  getValoracionTrabajo(trabajoId:string):Promise<boolean>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<boolean>(resolve => {
      this.http.post(`${apiUrl}/trabajo/valoracion`, {trabajoId}, {headers}).subscribe(data => {
        const encontrado = data['encontrado']
        resolve(encontrado)
      })
    })
  }

  sumarValoracion(trabajoId:string):Promise<Valoracion>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<Valoracion>(resolve => {
      this.http.post(`${apiUrl}/trabajo/valorar/sumar`, {trabajoId}, {headers}).subscribe(data => {
        const trabajo = data['newTrabajo']
        resolve(trabajo)
      })
    })
  }

  restarValoracion(trabajoId:string):Promise<Valoracion>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<Valoracion>(resolve => {
      this.http.post(`${apiUrl}/trabajo/valorar/restar`, {trabajoId}, {headers}).subscribe(data => {
        const trabajo = data['newTrabajo']
        resolve(trabajo)
      })
    })
  }

}
