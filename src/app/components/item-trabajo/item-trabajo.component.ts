import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() emitirValor = new EventEmitter<number>()
  foto:string
  estrellas:number

  constructor(private router:Router) { }

  async ngOnInit() {
    this.foto = `${URL}/${this.trabajo.autor}/${this.trabajo._id}/foto`
    this.estrellas = this.trabajo.estrellas
  }

  verTrabajo(){
    this.router.navigateByUrl(`/trabajo/${this.trabajo._id}`)
  }

  getValor(valor:number){
    this.estrellas+=valor
    this.emitirValor.emit(valor)
  }
}
