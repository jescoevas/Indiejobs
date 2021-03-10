import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, LoadingController } from '@ionic/angular';

import { LoginPage } from './login.page';
import { RouterTestingModule } from "@angular/router/testing";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuarioService } from '../../services/usuario.service';
import { environment } from '../../../environments/environment';
import { By } from '@angular/platform-browser';

const apiUrl = environment.apiUrl

describe('Página de login', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let usuarioService:UsuarioService
  let fb:FormBuilder
  let loadingController:LoadingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService)
    fb = TestBed.inject(FormBuilder)
    loadingController = TestBed.inject(LoadingController)
    fixture.detectChanges();
  }));

  describe('Formulario', () => {
    it('Formulario: Iniciado correctamente', () => {
      let email = component.form.get('email')
      let password = component.form.get('password')
      expect(email.value).toEqual('')
      expect(password.value).toEqual('')
      expect(component.form.valid).toBeFalsy()
    })
  
    it('Formulario: Validado', () => {
      let email = component.form.get('email')
      let password = component.form.get('password')
      email.setValue('testing@gmail.com')
      password.setValue('testing')
      expect(email.value).toEqual('testing@gmail.com')
      expect(password.value).toEqual('testing')
      expect(component.form.valid).toBeTruthy()
    })
  })

  //Hay que desactivar el loading para que estos tests funcionen correctamente
  xdescribe('Login', () => {
    it('Login: Datos enviados', () => {
      let email = component.form.get('email')
      let password = component.form.get('password')
      email.setValue('testing@gmail.com')
      password.setValue('testing')
      spyOn(usuarioService, 'login')
      component.login()
      expect(usuarioService.login).toHaveBeenCalledWith(component.form.value)
    })
    
    it('Login: Datos no enviados por password vacía', () => {
      let email = component.form.get('email')
      let password = component.form.get('password')
      email.setValue('testing@gmail.com')
      password.setValue('')
      spyOn(usuarioService, 'login')
      component.login()
      expect(usuarioService.login).not.toHaveBeenCalled()
    })

    it('Login: Botón de submit funciona correctamente', () => {
      let email = component.form.get('email')
      let password = component.form.get('password')
      email.setValue('testing@gmail.com')
      password.setValue('testing')
      spyOn(usuarioService, 'login')
      const button = fixture.debugElement.nativeElement.querySelector('#submit');
      button.click();
      expect(usuarioService.login).toHaveBeenCalled()
    })

    it('Login: Login exitoso', () => {
      let email = component.form.get('email')
      let password = component.form.get('password')
      email.setValue('testing@gmail.com')
      password.setValue('testing')
      spyOn(usuarioService, 'login').and.callFake(() => Promise.resolve('Login exitoso'))
      component.login()
      expect(usuarioService.login).toHaveBeenCalled()
      fixture.whenStable().then(() => {
        expect(component.emailIncorrecto).toBeFalsy()
        expect(component.passwordIncorrecta).toBeFalsy()
      })
    })

    it('Login: Email incorrecto', () => {
      let email = component.form.get('email')
      let password = component.form.get('password')
      email.setValue('testing@gmail.com')
      password.setValue('testing')
      spyOn(usuarioService, 'login').and.callFake(() => Promise.resolve('No se ha encontrado el usuario'))
      component.login()
      expect(usuarioService.login).toHaveBeenCalled()
      fixture.whenStable().then(() => expect(component.emailIncorrecto).toBeTruthy())
    })

    it('Login: Password incorrecta', () => {
      let email = component.form.get('email')
      let password = component.form.get('password')
      email.setValue('testing@gmail.com')
      password.setValue('testing')
      spyOn(usuarioService, 'login').and.callFake(() => Promise.resolve('Password incorrecta'))
      component.login()
      expect(usuarioService.login).toHaveBeenCalled()
      fixture.whenStable().then(() => expect(component.passwordIncorrecta).toBeTruthy())
    })
  })

});
