import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const URL = environment.apiUrl
const usuarioId = localStorage.getItem('usuarioId')

@Pipe({
  name: 'fotoprincipal'
})
export class FotoPrincipalPipe implements PipeTransform {

  transform( foto: string): string {
    return `${ URL }/${ usuarioId }/foto`;
  }

}
