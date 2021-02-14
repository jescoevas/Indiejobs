import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UltimasResenasPage } from './ultimas-resenas.page';

const routes: Routes = [
  {
    path: '',
    component: UltimasResenasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UltimasResenasPageRoutingModule {}
