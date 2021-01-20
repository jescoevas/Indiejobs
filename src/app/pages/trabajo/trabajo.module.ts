import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrabajoPageRoutingModule } from './trabajo-routing.module';

import { TrabajoPage } from './trabajo.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrabajoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TrabajoPage]
})
export class TrabajoPageModule {}
