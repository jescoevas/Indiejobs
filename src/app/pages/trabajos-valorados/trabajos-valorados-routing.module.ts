import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrabajosValoradosPage } from './trabajos-valorados.page';

const routes: Routes = [
  {
    path: '',
    component: TrabajosValoradosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrabajosValoradosPageRoutingModule {}
