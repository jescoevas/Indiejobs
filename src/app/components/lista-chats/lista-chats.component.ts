import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../models/chat';

@Component({
  selector: 'app-lista-chats',
  templateUrl: './lista-chats.component.html',
  styleUrls: ['./lista-chats.component.scss'],
})
export class ListaChatsComponent implements OnInit {

  @Input() chats:Chat[] = []
  
  constructor() { }

  ngOnInit() {}

}
