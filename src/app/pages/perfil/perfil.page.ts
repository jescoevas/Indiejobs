import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { IonSegment, LoadingController } from '@ionic/angular';
import { ReseñaService } from 'src/app/services/reseña.service';
import { Reseña } from 'src/app/models/reseña';
import { Trabajo } from '../../models/trabajo';
import { TrabajoService } from '../../services/trabajo.service';
import { Plugins } from '@capacitor/core'


const URL = environment.apiUrl
const { Share } = Plugins

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
  resenas:Reseña[] = []
  trabajos:Trabajo[] = []
  estrellas:number
  logado:boolean
  cargado:boolean = false

  constructor(private usuarioService:UsuarioService, private reseñaService:ReseñaService, private trabajoService:TrabajoService, private activatedRoute:ActivatedRoute, private loadingController: LoadingController) { }

  async ngOnInit(){
    const loading = await this.loadingController.create({});
    await loading.present();
    this.activatedRoute.params.subscribe(async params => {
      const id = params['id']
      this.usuario = await this.usuarioService.getUsuario(id)
      this.estrellas = await this.usuarioService.getEstrellasTrabajador(id)
      this.logado = id == localStorage.getItem('usuarioId')
      this.imagen = `${ URL }/${ id }/foto`
      this.segmento.value = this.apartados[0];
      this.cargado = true
      await loading.dismiss()
    })
  }

  async cambio(event){
    this.trabajos = []
    this.resenas = []
    const tipo = event.detail.value
    if(tipo === 'Trabajos'){
      this.trabajos = await this.trabajoService.getTrabajosUsuario(this.usuario._id)
    }
    if(tipo === 'Reseñas'){
      this.resenas = await this.reseñaService.getReseñasUsuario(this.usuario._id)
    }
  }

  async compartir(){
    const shareRet = await Share.share({
      text: `Mira el perfil de ${this.usuario.nombre}`,
      url: `https://indiejobs.herokuapp.com/indiejobs/api/perfil/${this.usuario._id}`,
      dialogTitle: 'Compartir en...'
    });
  }

}
