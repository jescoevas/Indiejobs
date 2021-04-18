import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {

  @Input() trabajadores:Usuario[] = []
  @Input() top:boolean

  constructor() { }

  ngOnInit() {}

}
