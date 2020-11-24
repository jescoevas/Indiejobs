import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const URL = environment.apiUrl
const usuarioId = localStorage.getItem('usuarioId')

@Pipe({
  name: 'fotoprincipal'
})
export class FotoPrincipalPipe implements PipeTransform {

  transform( foto: string): string {
    const avatar:string = 'assets/images/avatar_vacio.png'
    if(foto === null) return avatar
    const esNull = foto.includes('null')
    return esNull ? avatar : foto
  }

}
