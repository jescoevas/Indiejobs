import { Component, OnInit, Input } from '@angular/core';
import { Trabajo } from '../../models/trabajo';

@Component({
  selector: 'app-lista-trabajos',
  templateUrl: './lista-trabajos.component.html',
  styleUrls: ['./lista-trabajos.component.scss'],
})
export class ListaTrabajosComponent implements OnInit {

  @Input() trabajos:Trabajo[] = []

  constructor() { }

  ngOnInit() {}

}
