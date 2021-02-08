import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trabajo } from '../../models/trabajo';
import { Router } from '@angular/router';
import { ValoracionService } from '../../services/valoracion.service';

const URL = environment.apiUrl

@Component({
  selector: 'app-item-trabajo',
  templateUrl: './item-trabajo.component.html',
  styleUrls: ['./item-trabajo.component.scss'],
})
export class ItemTrabajoComponent implements OnInit {

  @Input() trabajo:Trabajo
  foto:string
  yaValorada:boolean
  estrella:string
  estrellas:number

  constructor(private router:Router, private valoracionService:ValoracionService) { }

  async ngOnInit() {
    this.foto = `${URL}/${this.trabajo.autor}/${this.trabajo._id}/foto`
    this.yaValorada = await this.valoracionService.getValoracionTrabajo(this.trabajo._id)
    this.estrella = this.yaValorada ? 'star' : 'star-outline'
    this.estrellas = this.trabajo.estrellas
  }

  verTrabajo(){
    this.router.navigateByUrl(`/trabajo/${this.trabajo._id}`)
  }

  valorar(){
    if(this.yaValorada){
      this.valoracionService.restarValoracion(this.trabajo._id)
      this.estrella = 'star-outline'
      this.estrellas -= 1
      this.yaValorada = false
    }else{
      this.valoracionService.sumarValoracion(this.trabajo._id)
      this.estrella = 'star'
      this.estrellas += 1
      this.yaValorada = true
    }
  }
}
