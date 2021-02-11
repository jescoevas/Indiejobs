import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopTrabajosPage } from './top-trabajos.page';

const routes: Routes = [
  {
    path: '',
    component: TopTrabajosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopTrabajosPageRoutingModule {}
