import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopTrabajadoresPageRoutingModule } from './top-trabajadores-routing.module';

import { TopTrabajadoresPage } from './top-trabajadores.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopTrabajadoresPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TopTrabajadoresPage]
})
export class TopTrabajadoresPageModule {}
