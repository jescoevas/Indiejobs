import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { IonSegment, LoadingController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-top-trabajadores',
  templateUrl: './top-trabajadores.page.html',
  styleUrls: ['./top-trabajadores.page.scss'],
})
export class TopTrabajadoresPage implements OnInit {

  @ViewChild(IonSegment) segmento: IonSegment;
  apartados = ['Local', 'General']
  trabajadores:Usuario[] = []

  constructor(private usuarioService:UsuarioService, private loadingController: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({});
    await loading.present();
    this.trabajadores = await this.usuarioService.getMejoresTrabajadores("local")
    this.segmento.value = this.apartados[0];
    await loading.dismiss()
  }

  async cambio(event){
    const tipo = event.detail.value
    if(tipo == 'Local') {
      const loading = await this.loadingController.create({});
      await loading.present();
      this.trabajadores = []
      this.trabajadores = await this.usuarioService.getMejoresTrabajadores("local")
      await loading.dismiss()
    }
    if(tipo == 'General') {
      const loading = await this.loadingController.create({});
      await loading.present();
      this.trabajadores = []
      this.trabajadores = await this.usuarioService.getMejoresTrabajadores("general")
      await loading.dismiss()
    }
  }

  ionViewWillLeave() {
    this.trabajadores = []
  }

}
