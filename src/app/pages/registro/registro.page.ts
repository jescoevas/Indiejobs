import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{

  constructor(private usuarioService:UsuarioService, private router:Router, private toastController:ToastController){ }

  async recogeDatos(datos:Object){
    const data = await this.usuarioService.registro(datos['usuario'])
      if(data['msg'] === 'Registro realizado con exito'){
        if(datos['imagen']) await this.usuarioService.asignarFoto(datos['imagen'], data['token'])
        const toast = await this.toastController.create({
          message: 'Registrado con éxito',
          duration: 2000,
          color:'success'
        });
        toast.present();
          this.router.navigateByUrl('/login')
      }else{
        return ;
      }
  }

}
