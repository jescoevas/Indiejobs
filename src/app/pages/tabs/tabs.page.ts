import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { environment } from '../../../environments/environment';

const URL = environment.apiUrl

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage{


  foto:string = 'assets/images/avatar_vacio.png'

  constructor(private menuController:MenuController, private router:Router, private usuarioService:UsuarioService) {}

  cerrarSesion(){
    this.usuarioService.cerrarSesion()
    this.menuController.close()
    this.router.navigateByUrl('/login')
  }

  ionViewWillEnter() {
    const usuarioId = localStorage.getItem('usuarioId')
    this.foto = `${ URL }/${ usuarioId }/foto`
  }
}
