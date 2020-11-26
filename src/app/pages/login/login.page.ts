import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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

  constructor(private router:Router, private fb:FormBuilder, private usuarioService:UsuarioService,
    private loading:LoadingController) {
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
    const loading = await this.loading.create({
      // cssClass: 'my-custom-class',
      message: 'Por favor, espere...',
      // duration: 2000
    });
    await loading.present();

    const msg = await this.usuarioService.login(this.form.value)
    if(msg === 'No se ha encontrado el usuario'){
      this.emailIncorrecto = true
    }else if(msg === 'Password incorrecta'){
      this.passwordIncorrecta = true
    }else{
      this.router.navigateByUrl('/')
    }
    await loading.dismiss()
  }

}
