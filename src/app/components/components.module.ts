import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { IonicModule } from '@ionic/angular';
import { ItemUsuarioComponent } from './item-usuario/item-usuario.component';
import { FormTrabajadorComponent } from './form-trabajador/form-trabajador.component';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormUsuarioEdicionComponent } from './form-usuario-edicion/form-usuario-edicion.component';
import { ListaResenasComponent } from './lista-resenas/lista-resenas.component';
import { ItemResenaComponent } from './item-resena/item-resena.component';
import { ListaTrabajosComponent } from './lista-trabajos/lista-trabajos.component';
import { ItemTrabajoComponent } from './item-trabajo/item-trabajo.component';
import { ValoracionComponent } from './valoracion/valoracion.component';
import { ListaChatsComponent } from './lista-chats/lista-chats.component';
import { ItemChatComponent } from './item-chat/item-chat.component';
import { ListaMensajesComponent } from './lista-mensajes/lista-mensajes.component';
import { ItemMensajeComponent } from './item-mensaje/item-mensaje.component';



@NgModule({
  declarations: [
    ListaUsuariosComponent,
    ItemUsuarioComponent,
    FormTrabajadorComponent,
    FormUsuarioComponent,
    FormUsuarioEdicionComponent,
    ListaResenasComponent,
    ItemResenaComponent,
    ListaTrabajosComponent,
    ItemTrabajoComponent,
    ValoracionComponent,
    ListaChatsComponent,
    ItemChatComponent,
    ListaMensajesComponent,
    ItemMensajeComponent
  ],
  exports:[
    ListaUsuariosComponent,
    ItemUsuarioComponent,
    FormTrabajadorComponent,
    FormUsuarioComponent,
    FormUsuarioEdicionComponent,
    ListaResenasComponent,
    ItemResenaComponent,
    ListaTrabajosComponent,
    ItemTrabajoComponent,
    ValoracionComponent,
    ListaChatsComponent,
    ItemChatComponent,
    ListaMensajesComponent,
    ItemMensajeComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
