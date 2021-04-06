import { Component, OnDestroy } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnDestroy{

  trabajadores:Usuario[] = []

  constructor(private usuarioService:UsuarioService) {}


  async ionViewDidEnter() {
    this.trabajadores = await this.usuarioService.getTrabajadoresCercanos()
  }

  ionViewWillLeave() {
    this.trabajadores = []
  }

  ngOnDestroy(){
    this.trabajadores = []
  }

  refresh(event){
    setTimeout(async() => {
      this.trabajadores = await this.usuarioService.getTrabajadoresCercanos()
      event.target.complete();
    }, 1000);
  }

}
