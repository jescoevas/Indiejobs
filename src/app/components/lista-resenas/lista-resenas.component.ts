import { Component, Input, OnInit } from '@angular/core';
import { Reseña } from 'src/app/models/reseña';

@Component({
  selector: 'app-lista-resenas',
  templateUrl: './lista-resenas.component.html',
  styleUrls: ['./lista-resenas.component.scss'],
})
export class ListaResenasComponent implements OnInit {

  @Input() resenas:Reseña[] = []

  constructor() { }

  ngOnInit() {}

}
