import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { ToastController, LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit{

  usuario:Usuario

  constructor(private usuarioService:UsuarioService, private router:Router, private toastController:ToastController, private loading:LoadingController){ }

  async ngOnInit(){
    this.usuario = await this.usuarioService.getUsuario(localStorage.getItem('usuarioId'))
  }

  async recibeDatos(datos:Usuario){
    const loading = await this.loading.create({message: 'Por favor, espere...'});
    await loading.present();
    const data = await this.usuarioService.editar(datos)
      if(data['msg'] === 'Edicion realizada con exito'){
        const toast = await this.toastController.create({
          message: 'Datos actualizados',
          duration: 2000,
          color:'success'
        });
        await loading.dismiss()
        toast.present();
        this.router.navigateByUrl('/')
      }else{
        return ;
      }
  }

}
