import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  foto:any = 'assets/images/avatar_vacio.png'

  constructor(private menuController:MenuController, private router:Router, private usuarioService:UsuarioService) {}

  ngOnInit(){
    this.menuController.close()
  }

  cerrarSesion(){
    this.usuarioService.cerrarSesion()
    this.router.navigateByUrl('/login')
  }
}
