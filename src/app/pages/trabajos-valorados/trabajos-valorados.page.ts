import { Component, OnInit } from '@angular/core';
import { TrabajoService } from '../../services/trabajo.service';
import { Trabajo } from '../../models/trabajo';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-trabajos-valorados',
  templateUrl: './trabajos-valorados.page.html',
  styleUrls: ['./trabajos-valorados.page.scss'],
})
export class TrabajosValoradosPage implements OnInit {

  trabajos:Trabajo[] = []

  constructor(private trabajoService:TrabajoService, private loadingController:LoadingController) { }

  async ngOnInit() {
    this.cargarContenido()
  }

  async cargarContenido(){
    const loading = await this.loadingController.create({});
    await loading.present();
    this.trabajos = []
    this.trabajos = await this.trabajoService.getMisTrabajosValorados()
    await loading.dismiss()
  }

  async getValor(){
    await this.cargarContenido()
  }

}
