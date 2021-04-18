import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { IonSegment, LoadingController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-top-trabajadores',
  templateUrl: './top-trabajadores.page.html',
  styleUrls: ['./top-trabajadores.page.scss'],
})
export class TopTrabajadoresPage implements OnInit {

  @ViewChildren(IonSegment) segmento: IonSegment;
  tipos = ['Local', 'General']
  tipoActual:string
  ordenes = ['Estrellas', 'Seguidores', 'Más trabajos']
  ordenActual:string
  trabajadores:Usuario[] = []

  constructor(private usuarioService:UsuarioService, private loadingController: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({});
    await loading.present();
    this.tipoActual = 'Local'
    this.ordenActual = 'Estrellas'
    this.trabajadores = await this.usuarioService.getMejoresTrabajadores(this.tipoActual, this.ordenActual)
    this.segmento["_results"][0].value = this.tipos[0];
    this.segmento["_results"][1].value = this.ordenes[0];
    await loading.dismiss()
  }

  async cambioTipo(event){
    this.tipoActual = event.detail.value
    const loading = await this.loadingController.create({});
    await loading.present();
    this.trabajadores = []
    this.trabajadores = await this.usuarioService.getMejoresTrabajadores(this.tipoActual, this.ordenActual)
    await loading.dismiss()
  }

  async cambioOrden(event){
    this.ordenActual = event.detail.value
    const loading = await this.loadingController.create({});
    await loading.present();
    this.trabajadores = []
    this.trabajadores = await this.usuarioService.getMejoresTrabajadores(this.tipoActual, this.ordenActual)
    await loading.dismiss()
  }

}
