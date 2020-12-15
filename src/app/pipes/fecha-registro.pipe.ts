import { Pipe, PipeTransform } from '@angular/core';

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 
                'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

@Pipe({
  name: 'fechaRegistro'
})
export class FechaRegistroPipe implements PipeTransform {

  transform(fecha:string) {
    const parseada = Date.parse(fecha)
    return parseada;
  }

}
