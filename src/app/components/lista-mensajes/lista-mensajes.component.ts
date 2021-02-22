import { Component, OnInit, Input } from '@angular/core';
import { Mensaje } from '../../models/mensaje';

@Component({
  selector: 'app-lista-mensajes',
  templateUrl: './lista-mensajes.component.html',
  styleUrls: ['./lista-mensajes.component.scss'],
})
export class ListaMensajesComponent implements OnInit {

  @Input() mensajes:Mensaje[] = []

  constructor() { }

  ngOnInit() {}

}
