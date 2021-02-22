import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValoracionService } from '../../services/valoracion.service';
import { Trabajo } from '../../models/trabajo';

@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.scss'],
})
export class ValoracionComponent implements OnInit {

  @Input() trabajo:Trabajo
  @Output() emitirValor = new EventEmitter<number>()
  yaValorada:boolean
  estrella:string
  
  constructor(private valoracionService:ValoracionService) { }

  async ngOnInit() {
    this.yaValorada = await this.valoracionService.getValoracionTrabajo(this.trabajo._id)
    this.estrella = this.yaValorada ? 'star' : 'star-outline'
  }

  valorar(){
    if(this.yaValorada){
      this.valoracionService.restarValoracion(this.trabajo._id)
      this.estrella = 'star-outline'
      this.yaValorada = false
      this.emitirValor.emit(-1)
    }else{
      this.valoracionService.sumarValoracion(this.trabajo._id)
      this.estrella = 'star'
      this.yaValorada = true
      this.emitirValor.emit(1)
    }
  }

}
