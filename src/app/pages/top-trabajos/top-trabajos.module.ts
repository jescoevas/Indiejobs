import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopTrabajosPageRoutingModule } from './top-trabajos-routing.module';

import { TopTrabajosPage } from './top-trabajos.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopTrabajosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TopTrabajosPage]
})
export class TopTrabajosPageModule {}
