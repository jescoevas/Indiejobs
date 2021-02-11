import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopTrabajadoresPage } from './top-trabajadores.page';

const routes: Routes = [
  {
    path: '',
    component: TopTrabajadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopTrabajadoresPageRoutingModule {}
