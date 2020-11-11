import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  form:FormGroup
  emailIncorrecto:boolean = false
  passwordIncorrecta:boolean = false

  constructor(private router:Router, private fb:FormBuilder, private usuarioService:UsuarioService) {
    this.form = this.fb.group({
      email:['', [Validators.required]],
      password:['', [Validators.required]]
    })
   }

    get emailRequerido(){
        return this.form.get('email').invalid && this.form.get('email').touched
    }
    get passwordRequerido(){
      return this.form.get('password').invalid && this.form.get('password').touched
    }

  async login(){
    this.usuarioService.login(this.form.value).subscribe(data => {
      const message = data['msg']
      if(message === 'No se ha encontrado el usuario'){
        this.emailIncorrecto = true
      }else if(message === 'Password incorrecta'){
        this.passwordIncorrecta = true
      }else{
        const token = data['token']
        localStorage.setItem('token', token)
        this.router.navigateByUrl('/')
      }
    })
  }

}
