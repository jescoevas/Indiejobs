import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { SeguimientoService } from '../../services/seguimiento.service';
import { TrabajoService } from '../../services/trabajo.service';

const URL = environment.apiUrl

@Component({
  selector: 'app-item-usuario',
  templateUrl: './item-usuario.component.html',
  styleUrls: ['./item-usuario.component.scss'],
})
export class ItemUsuarioComponent implements OnInit {

  @Input() trabajador:Usuario
  @Input() top:boolean
  foto:string = 'assets/images/avatar_vacio.png'
  estrellas:number
  numSeguidores:number
  numTrabajos:number

  constructor(private router:Router, private usuarioService:UsuarioService, private seguimientoService:SeguimientoService, private trabajoService:TrabajoService) { }

  async ngOnInit() {
    this.cargarFoto()
    this.estrellas = await this.usuarioService.getEstrellasTrabajador(this.trabajador._id)
    this.numSeguidores = await this.seguimientoService.getNumSeguidores(this.trabajador._id)
    this.numTrabajos = await this.trabajoService.getNumTrabajosUsuario(this.trabajador._id)
  }

  cargarFoto(){
    if(this.trabajador.foto !== this.foto){
      this.foto = `${ URL }/${ this.trabajador._id }/foto`
    }
  }

  perfil(_id:string){
    this.router.navigateByUrl(`/perfil/${_id}`)
  }

}
