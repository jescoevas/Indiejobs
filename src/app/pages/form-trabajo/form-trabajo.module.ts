import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormTrabajoPageRoutingModule } from './form-trabajo-routing.module';

import { FormTrabajoPage } from './form-trabajo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormTrabajoPageRoutingModule
  ],
  declarations: [FormTrabajoPage]
})
export class FormTrabajoPageModule {}
