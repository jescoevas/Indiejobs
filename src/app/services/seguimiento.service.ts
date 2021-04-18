import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  constructor(private http:HttpClient) { }

  async getSeguidores(_id:string):Promise<Usuario[]>{ 
      return new Promise<Usuario[]>(resolve => {
        this.http.post(`${apiUrl}/seguidores`, {_id}).subscribe(data => {
          const seguidores = data['seguidores']
          resolve(seguidores)
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

}