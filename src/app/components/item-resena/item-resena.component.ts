import { Component, OnInit, Input } from '@angular/core';
import { Reseña } from 'src/app/models/reseña';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const URL = environment.apiUrl

@Component({
  selector: 'app-item-resena',
  templateUrl: './item-resena.component.html',
  styleUrls: ['./item-resena.component.scss'],
})
export class ItemResenaComponent implements OnInit {

  @Input() resena:Reseña
  foto:string = 'assets/images/avatar_vacio.png'

  constructor(private router:Router) { }

  ngOnInit() {
     this.cargarFoto()
  }

  cargarFoto(){
    if(this.resena.autor.foto !== this.foto){
      this.foto = `${ URL }/${ this.resena.autor }/foto`
    }
  }

  perfil(){
    this.router.navigateByUrl(`/perfil/${this.resena.autor}`)
  }

}
