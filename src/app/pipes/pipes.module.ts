import { NgModule } from '@angular/core';
import { FotoPrincipalPipe } from './foto-principal.pipe';
import { FotoPipe } from './foto.pipe';



@NgModule({
  declarations: [
    FotoPrincipalPipe,
    FotoPipe
  ],
  exports:[
    FotoPrincipalPipe,
    FotoPipe
  ]
})
export class PipesModule { }
