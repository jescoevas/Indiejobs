import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Trabajo } from '../models/trabajo';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {

  constructor(private http:HttpClient) { }

  getTrabajosUsuario(id:string):Promise<Trabajo[]>{
    return new Promise<Trabajo[]>(resolve => {
      this.http.post(`${apiUrl}/usuario/trabajos`, {id}).subscribe(data => {
        const trabajos = data['trabajos']
        resolve(trabajos)
      })
    })
  }
}
