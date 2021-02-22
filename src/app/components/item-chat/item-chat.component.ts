import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../models/chat';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Mensaje } from '../../models/mensaje';
import { ChatService } from '../../services/chat.service';

const URL = environment.apiUrl

@Component({
  selector: 'app-item-chat',
  templateUrl: './item-chat.component.html',
  styleUrls: ['./item-chat.component.scss'],
})
export class ItemChatComponent implements OnInit {

  @Input() chat:Chat
  ultimoMensaje:string
  foto:string = 'assets/images/avatar_vacio.png'

  constructor(private router:Router, private chatService:ChatService) { }

  async ngOnInit() {
    this.cargarFoto()
    const ultmen = await this.chatService.getChatMensajes(this.chat._id)
    this.ultimoMensaje = ultmen[ultmen.length-1].cuerpo
  }

  cargarFoto(){
    const esUsuario1 = this.chat.usuario1 == localStorage.getItem('usuarioId')
    if(esUsuario1){
      if(this.chat.usuario2 !== this.foto){
        this.foto = `${ URL }/${ this.chat.usuario2 }/foto`
      }
    }else{
      if(this.chat.usuario1 !== this.foto){
        this.foto = `${ URL }/${ this.chat.usuario1 }/foto`
      }
    }
  }

  verChat(){
    this.router.navigateByUrl(`/chat/${this.chat._id}`)
  }

}
