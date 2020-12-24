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
}
