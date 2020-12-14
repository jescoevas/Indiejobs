import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  trabajadores:Usuario[] = []
  datos:any = {
    empleo:'',
    ciudad:''
  }
  enviado:boolean = false

  constructor(private usuarioService:UsuarioService) {}

  async buscar(){
    this.trabajadores = await this.usuarioService.getTrabajadoresBuscador(this.datos)
    this.enviado = true
  }

  ionViewWillLeave() {
    this.enviado = false
    this.datos = {
      empleo:'',
      ciudad:''
    }
    this.trabajadores = []
  }

}
