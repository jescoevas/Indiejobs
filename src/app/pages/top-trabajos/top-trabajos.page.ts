import { Component, OnInit, ViewChild } from '@angular/core';
import { Trabajo } from '../../models/trabajo';
import { IonSegment, LoadingController } from '@ionic/angular';
import { TrabajoService } from '../../services/trabajo.service';

@Component({
  selector: 'app-top-trabajos',
  templateUrl: './top-trabajos.page.html',
  styleUrls: ['./top-trabajos.page.scss'],
})
export class TopTrabajosPage implements OnInit {

  @ViewChild(IonSegment) segmento: IonSegment;
  apartados = ['Local', 'General']
  trabajos:Trabajo[] = []

  constructor(private trabajoService:TrabajoService, private loadingController: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({});
    await loading.present();
    this.trabajos = await this.trabajoService.getMejoresTrabajos("local")
    this.segmento.value = this.apartados[0];
    await loading.dismiss()
  }

  async cambio(event){
    const tipo = event.detail.value
    if(tipo == 'Local') {
      await this.cargarContenido("local")
    }
    if(tipo == 'General') {
      await this.cargarContenido("general")
    }
  }

  async cargarContenido(tipo:string){
    const loading = await this.loadingController.create({});
    await loading.present();
    this.trabajos = []
    this.trabajos = await this.trabajoService.getMejoresTrabajos(tipo.toLowerCase())
    await loading.dismiss()
  }

  async getValor(){
    await this.cargarContenido(this.segmento.value)
  }

  ionViewWillLeave() {
    this.trabajos = []
  }

}
