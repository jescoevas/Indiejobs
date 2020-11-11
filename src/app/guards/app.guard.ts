import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  constructor(private usuarioService:UsuarioService, private router:Router) {}
  canActivate(){
    if(this.usuarioService.sesionIniciada()){
      return true
    }else{
      return this.router.parseUrl('/login')
    }
  }
}
