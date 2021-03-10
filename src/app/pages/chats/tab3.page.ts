import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  chats:Chat[] = []

  constructor(private chatService:ChatService) {}

  async ngOnInit(){
    this.chats = await this.chatService.getChats()
  }

  refresh(event){
    setTimeout(async() => {
      this.chats = await this.chatService.getChats()
      event.target.complete();
    }, 1000);
  }

}
