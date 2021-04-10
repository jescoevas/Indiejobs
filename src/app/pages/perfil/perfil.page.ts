import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSegment, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ReseñaService } from 'src/app/services/reseña.service';
import { Reseña } from 'src/app/models/reseña';
import { Trabajo } from '../../models/trabajo';
import { TrabajoService } from '../../services/trabajo.service';
import { Plugins } from '@capacitor/core'
import { NgForm } from '@angular/forms';
import { ChatService } from '../../services/chat.service';


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
  imagen:string = 'assets/images/avatar_vacio.png'
  apartados = ['Perfil', 'Trabajos', 'Reseñas']
  resenas:Reseña[] = []
  trabajos:Trabajo[] = []
  existeChat:Boolean
  estrellas:number
  logado:boolean
  cargado:boolean = false

  resena:any = {
    cuerpo:''
  }

  constructor(private usuarioService:UsuarioService, private reseñaService:ReseñaService, private trabajoService:TrabajoService,
     private activatedRoute:ActivatedRoute, private loadingController: LoadingController, private router:Router, private chatService:ChatService,
     private toastController:ToastController) { }

  async ngOnInit(){
    const loading = await this.loadingController.create({});
    await loading.present();
    this.activatedRoute.params.subscribe(async params => {
      const id = params['id']
      this.usuario = await this.usuarioService.getUsuario(id)
      this.estrellas = await this.usuarioService.getEstrellasTrabajador(id)
      this.existeChat = await this.chatService.existeChat(id)
      this.logado = id == localStorage.getItem('usuarioId')
      if(this.usuario.foto !== this.imagen){
        this.imagen = `${ URL }/${ id }/foto`
      }
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

  getValor(valor:number){
    this.estrellas+=valor
  }

  iniciarChat(){
    this.router.navigateByUrl(`/chat/${this.usuario._id}`)
  }

  async submit(form:NgForm){
    if(form.valid){
      this.resena.idReceptor = this.usuario._id
      this.resena.fecha = new Date()
      const loading = await this.loadingController.create({});
      await loading.present();
      await this.reseñaService.nuevaResena(this.resena)
      await loading.dismiss()
      this.resena = {
        cuerpo:''
      }
      form.resetForm(this.resena)
      this.resenas = await this.reseñaService.getReseñasUsuario(this.usuario._id)
      const toast = await this.toastController.create({
        message: 'Trabajo subido',
        duration: 2000,
        color:'success'
      });

      toast.present();
    }
  }

}
