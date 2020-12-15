import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { IonSegment } from '@ionic/angular';

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

  constructor(private usuarioService:UsuarioService, private activatedRoute:ActivatedRoute) { }

  async ngOnInit(){
    this.activatedRoute.params.subscribe(async params => {
      const id = params['id']
      this.usuario = await this.usuarioService.getUsuario(id)
      this.imagen = `${ URL }/${ id }/foto`
      this.segmento.value = this.apartados[0];
    })
  }

}
