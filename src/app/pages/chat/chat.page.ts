import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Mensaje } from '../../models/mensaje';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  mensajes:Mensaje[] = []
  id:string

  datos:any = {
    cuerpo:''
  }

  constructor(private activatedRoute:ActivatedRoute, private chatService:ChatService, private navCtrl: NavController) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.id= params['id']
      this.mensajes = await this.chatService.getChatMensajes(this.id)
    })
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
      await this.chatService.enviarMensaje(this.datos)
      this.datos = {
        cuerpo:''
      }
      form.resetForm(this.datos)
      this.mensajes = await this.chatService.getChatMensajes(this.id)
    }
  }

}
