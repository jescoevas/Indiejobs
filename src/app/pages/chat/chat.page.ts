import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Mensaje } from '../../models/mensaje';
import { NgForm } from '@angular/forms';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  mensajes:Mensaje[] = []
  id:string

  datos:any = {
    cuerpo:''
  }

  constructor(private activatedRoute:ActivatedRoute, private chatService:ChatService) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.id= params['id']
      this.mensajes = await this.chatService.getChatMensajes(this.id)
    })
  }

  ionViewDidEnter() {
    this.content.scrollToBottom(800)
  }

  async enviar(form:NgForm){
    if(form.valid){
      if(this.mensajes.length == 0){
        const chat = await this.chatService.iniciarChat(this.id)
        this.id = chat._id
        this.datos.chatId = chat._id
      }else{
        this.datos.chatId = this.mensajes[0].chat
      }
      this.datos.fecha = new Date()
      const mensaje = await this.chatService.enviarMensaje(this.datos)
      this.datos = {
        cuerpo:''
      }
      form.resetForm(this.datos)
      this.mensajes.push(mensaje)
      
    }
    this.content.scrollToBottom(100)
  }
}



