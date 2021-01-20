import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormTrabajoPage } from './form-trabajo.page';

const routes: Routes = [
  {
    path: '',
    component: FormTrabajoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormTrabajoPageRoutingModule {}
