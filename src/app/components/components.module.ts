import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { ItemUsuarioComponent } from './item-usuario/item-usuario.component';
import { FormTrabajadorComponent } from './form-trabajador/form-trabajador.component';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaUsuariosComponent,
    ItemUsuarioComponent,
    FormTrabajadorComponent,
    FormUsuarioComponent
  ],
  exports:[
    ListaUsuariosComponent,
    ItemUsuarioComponent,
    FormTrabajadorComponent,
    FormUsuarioComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class ComponentsModule { }
