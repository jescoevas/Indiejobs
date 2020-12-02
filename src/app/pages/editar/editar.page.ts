import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit{

  usuario:Usuario

  constructor(private usuarioService:UsuarioService, private router:Router, private toastController:ToastController){ }

  async ngOnInit(){
    this.usuario = await this.usuarioService.getUsuario(localStorage.getItem('usuarioId'))
  }

  async recibeDatosTrabajador(datos:Usuario){
    const data = await this.usuarioService.editar(datos)
      if(data['msg'] === 'Edicion realizada con exito'){
        const toast = await this.toastController.create({
          message: 'Datos actualizados',
          duration: 2000,
          color:'success'
        });
        toast.present();
        this.router.navigateByUrl('/')
      }else{
        return ;
      }
  }

  async recibeDatosUsuario(datos:Usuario){
    
  }

}
