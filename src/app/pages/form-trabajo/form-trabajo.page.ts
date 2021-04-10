import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';
import { decode } from 'base64-arraybuffer';
import { TrabajoService } from '../../services/trabajo.service';
import { Trabajo } from '../../models/trabajo';

@Component({
  selector: 'app-form-trabajo',
  templateUrl: './form-trabajo.page.html',
  styleUrls: ['./form-trabajo.page.scss'],
})
export class FormTrabajoPage {

  datos:any = {
    cuerpo:'',
    estrellas:0
  }
  imagen:any = 'assets/images/imagen_default.png'
  imagenArchivo:File

  constructor(private modalController:ModalController, private trabajoService:TrabajoService, private toastController:ToastController, private loading:LoadingController) { }

  cerrar(){
    this.modalController.dismiss()
  }

  async tomarFoto(){
    const image = await Camera.getPhoto({
      quality:40,
      allowEditing:true,
      resultType:CameraResultType.Base64,
      source:CameraSource.Photos
    })

    this.imagen = 'data:image/jpeg;base64,' + image.base64String;
    const blob = new Blob([new Uint8Array(decode(image.base64String))], {
      type: `image/${image.format}`,
    })
    const file = new File([blob], "foto", {
      type: blob.type,
    })

    this.imagenArchivo = file
  }

  async submit(form:NgForm){
    if(form.valid && this.imagen != 'assets/images/imagen_default.png'){
      this.datos.fecha = new Date()
      const loading = await this.loading.create({});
      await loading.present();
      const trabajo:Trabajo = await this.trabajoService.nuevoTrabajo(this.datos)
      await this.trabajoService.asignarFoto(this.imagenArchivo, trabajo._id)
      await loading.dismiss()
      this.modalController.dismiss()
      const toast = await this.toastController.create({
        message: 'Trabajo subido',
        duration: 2000,
        color:'success'
      });

      toast.present();
    }
  }

}
