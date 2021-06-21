import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrabajosValoradosPageRoutingModule } from './trabajos-valorados-routing.module';

import { TrabajosValoradosPage } from './trabajos-valorados.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrabajosValoradosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TrabajosValoradosPage]
})
export class TrabajosValoradosPageModule {}
