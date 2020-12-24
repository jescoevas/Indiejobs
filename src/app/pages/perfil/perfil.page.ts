import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { IonSegment, LoadingController } from '@ionic/angular';
import { ReseñaService } from 'src/app/services/reseña.service';
import { Reseña } from 'src/app/models/reseña';

const URL = environment.apiUrl

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  @ViewChild(IonSegment) segmento: IonSegment;

  usuario:Usuario
  imagen:string
  apartados = ['Perfil', 'Trabajos', 'Reseñas']
  reseñas:Reseña[] = []
  cargado:boolean = false

  constructor(private usuarioService:UsuarioService, private reseñaService:ReseñaService, private activatedRoute:ActivatedRoute, private loadingController: LoadingController) { }

  async ngOnInit(){
    const loading = await this.loadingController.create({});
    await loading.present();
    this.activatedRoute.params.subscribe(async params => {
      const id = params['id']
      this.usuario = await this.usuarioService.getUsuario(id)
      this.imagen = `${ URL }/${ id }/foto`
      this.segmento.value = this.apartados[0];
      this.reseñas = await this.reseñaService.getReseñasUsuario(id)
      console.log(this.reseñas)
      this.cargado = true
      await loading.dismiss()
    })
  }

}
