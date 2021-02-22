import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Mensaje } from '../../models/mensaje';
import { NgForm } from '@angular/forms';

const URL = environment.apiUrl

@Component({
  selector: 'app-item-mensaje',
  templateUrl: './item-mensaje.component.html',
  styleUrls: ['./item-mensaje.component.scss'],
})
export class ItemMensajeComponent implements OnInit {

  @Input() mensaje:Mensaje
  foto:string = 'assets/images/avatar_vacio.png'
  esLogado:boolean = false

  constructor() { }

  ngOnInit() {
    this.cargarFoto()
    this.esLogado = this.mensaje.autor == localStorage.getItem('usuarioId')
 }

 cargarFoto(){
   if(this.mensaje.autor !== this.foto){
     this.foto = `${ URL }/${ this.mensaje.autor }/foto`
   }
 }

 

}
