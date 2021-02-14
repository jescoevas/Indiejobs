import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UltimasResenasPageRoutingModule } from './ultimas-resenas-routing.module';

import { UltimasResenasPage } from './ultimas-resenas.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UltimasResenasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UltimasResenasPage]
})
export class UltimasResenasPageModule {}
