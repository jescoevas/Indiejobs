import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foto'
})
export class FotoPipe implements PipeTransform {

  transform( usuarioId: string): string {
    return `${ URL }/${ usuarioId }/foto`;
  }

}
