import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Reseña } from '../models/reseña';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ReseñaService {

  constructor(private http:HttpClient) { }

  getReseñasUsuario(id:string):Promise<Reseña[]>{
    return new Promise<Reseña[]>(resolve => {
      this.http.post(`${apiUrl}/usuario/resenas`, {id}).subscribe(data => {
        const reseñas = data['reseñas']
        resolve(reseñas)
      })
    })
  }

  nuevaResena(datos:any):Promise<Object>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });

    return new Promise<Object>(resolve => {
      this.http.post(`${apiUrl}/resena/create`,datos, {headers}).subscribe(data => {
        const reseñaDB = data['reseñaDB']
        resolve(reseñaDB)
      })
    })
  }

  getUltimasResenas():Promise<Reseña[]>{
    return new Promise<Reseña[]>(resolve => {
      this.http.get(`${apiUrl}/resenas/ultimas`).subscribe(data => {
        const resenas = data['resenas']
        resolve(resenas)
      })
    })
  }
}
