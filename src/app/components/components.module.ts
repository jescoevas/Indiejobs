import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { ItemUsuarioComponent } from './item-usuario/item-usuario.component';



@NgModule({
  declarations: [
    ListaUsuariosComponent,
    ItemUsuarioComponent
  ],
  exports:[
    ListaUsuariosComponent,
    ItemUsuarioComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
