import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chat } from '../models/chat';
import { Mensaje } from '../models/mensaje';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  getChats():Promise<Chat[]>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<Chat[]>(resolve => {
      this.http.post(`${apiUrl}/chat/mios`, {}, {headers}).subscribe(data => {
        const chats = data['chats']
        resolve(chats)
      })
    })
  }

  getChatMensajes(chatId:string):Promise<Mensaje[]>{
    return new Promise<Mensaje[]>(resolve => {
      this.http.get(`${apiUrl}/chat/${chatId}`).subscribe(data => {
        const mensajes = data['mensajes']
        resolve(mensajes)
      })
    })
  }

  iniciarChat(usuario2ID:string):Promise<Chat>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<Chat>(resolve => {
      this.http.post(`${apiUrl}/chat/create`, {usuario2ID}, {headers}).subscribe(data => {
        const chat = data['chat']
        resolve(chat)
      })
    })
  }

  enviarMensaje(datos:any):Promise<Mensaje>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<Mensaje>(resolve => {
      this.http.post(`${apiUrl}/mensaje/create`, datos, {headers}).subscribe(data => {
        const mensaje = data['mensaje']
        resolve(mensaje)
      })
    })
  }

  existeChat(usuario2ID:string):Promise<Boolean>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<Boolean>(resolve => {
      this.http.post(`${apiUrl}/chat/existe`, {usuario2ID}, {headers}).subscribe(data => {
        const encontrado = data['encontrado']
        resolve(encontrado)
      })
    })
  }

}
