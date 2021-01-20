import { Component, OnInit } from '@angular/core';
import { Trabajo } from '../../models/trabajo';
import { TrabajoService } from '../../services/trabajo.service';
import { ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core'
const { Share } = Plugins

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.page.html',
  styleUrls: ['./trabajo.page.scss'],
})
export class TrabajoPage implements OnInit {

  trabajo:Trabajo
  cargado:boolean = false

  constructor( private trabajoService:TrabajoService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      const id = params['id']
      this.trabajo = await this.trabajoService.getTrabajo(id)
      this.cargado = true
    })
  }

  async compartir(){
    const shareRet = await Share.share({
      text: `Mira este trabajo en Indiejobs!`,
      url: `https://indiejobs.herokuapp.com/indiejobs/api/trabajo/${this.trabajo._id}`,
      dialogTitle: 'Compartir en...'
    });
  }

}
