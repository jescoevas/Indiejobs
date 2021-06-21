import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, LoadingController } from '@ionic/angular';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.page.html',
  styleUrls: ['./follow.page.scss'],
})
export class FollowPage implements OnInit {

  @ViewChild(IonSegment) segmento: IonSegment;
  apartados = ['Seguidores', 'Siguiendo']
  usuarios:Usuario[] = []
  _id:string

  constructor(private usuarioService:UsuarioService, private loadingController: LoadingController, private activatedRoute:ActivatedRoute) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this._id = params['id']
      const loading = await this.loadingController.create({});
      await loading.present();
      this.usuarios = await this.usuarioService.getSeguidores(this._id)
      this.segmento.value = this.apartados[0];
      await loading.dismiss()
    })
  }

  async cambio(event){
    const tipo = event.detail.value
    if(tipo == 'Seguidores') {
      const loading = await this.loadingController.create({});
      await loading.present();
      this.usuarios = []
      this.usuarios = await this.usuarioService.getSeguidores(this._id)
      await loading.dismiss()
    }
    if(tipo == 'Siguiendo') {
      const loading = await this.loadingController.create({});
      await loading.present();
      this.usuarios = []
      this.usuarios = await this.usuarioService.getSiguiendo(this._id)
      await loading.dismiss()
    }
  }

}
