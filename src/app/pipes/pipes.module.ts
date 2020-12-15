import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaRegistroPipe } from './fecha-registro.pipe';



@NgModule({
  declarations: [
    FechaRegistroPipe
  ],
  exports:[
    FechaRegistroPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
