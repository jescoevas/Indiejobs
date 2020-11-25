import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  trabajadores:Usuario[] = []

  constructor(private usuarioService:UsuarioService) {}

  async ngOnInit(){
    this.trabajadores = await this.usuarioService.getTrabajadores()
  }

}
