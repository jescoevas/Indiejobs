import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { IonicModule } from '@ionic/angular';
import { ItemUsuarioComponent } from './item-usuario/item-usuario.component';
import { FormTrabajadorComponent } from './form-trabajador/form-trabajador.component';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormUsuarioEdicionComponent } from './form-usuario-edicion/form-usuario-edicion.component';



@NgModule({
  declarations: [
    ListaUsuariosComponent,
    ItemUsuarioComponent,
    FormTrabajadorComponent,
    FormUsuarioComponent,
    FormUsuarioEdicionComponent
  ],
  exports:[
    ListaUsuariosComponent,
    ItemUsuarioComponent,
    FormTrabajadorComponent,
    FormUsuarioComponent,
    FormUsuarioEdicionComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
