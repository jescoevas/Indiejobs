import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trabajo } from '../../models/trabajo';
import { Router } from '@angular/router';

const URL = environment.apiUrl

@Component({
  selector: 'app-item-trabajo',
  templateUrl: './item-trabajo.component.html',
  styleUrls: ['./item-trabajo.component.scss'],
})
export class ItemTrabajoComponent implements OnInit {

  @Input() trabajo:Trabajo
  foto:string

  constructor(private router:Router) { }

  ngOnInit() {
    this.foto = `${URL}/${this.trabajo.autor}/${this.trabajo._id}/foto`
  }

  verTrabajo(){
    this.router.navigateByUrl(`/trabajo/${this.trabajo._id}`)
  }

}
