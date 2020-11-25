import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../models/usuario';

const URL = environment.apiUrl

@Component({
  selector: 'app-item-usuario',
  templateUrl: './item-usuario.component.html',
  styleUrls: ['./item-usuario.component.scss'],
})
export class ItemUsuarioComponent implements OnInit {

  @Input() trabajador:Usuario
  foto:string = 'assets/images/avatar_vacio.png'

  constructor() { }

  ngOnInit() {
    this.cargarFoto()
  }

  cargarFoto(){
    if(this.trabajador.foto !== this.foto){
      this.foto = `${ URL }/${ this.trabajador._id }/foto`
    }
  }

}
