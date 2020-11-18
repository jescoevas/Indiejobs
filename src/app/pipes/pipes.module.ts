import { NgModule } from '@angular/core';
import { FotoPrincipalPipe } from './foto.pipe';



@NgModule({
  declarations: [
    FotoPrincipalPipe
  ],
  exports:[
    FotoPrincipalPipe
  ]
})
export class PipesModule { }
