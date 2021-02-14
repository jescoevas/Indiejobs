import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chat } from '../models/chat';

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
}
