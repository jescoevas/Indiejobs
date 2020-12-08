import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, LoadingController } from '@ionic/angular';

import { LoginPage } from './login.page';
import { RouterTestingModule } from "@angular/router/testing";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from '../../services/usuario.service';
import { environment } from '../../../environments/environment';

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

  it('Formulario: Es enviado', () => {
    let email = component.form.get('email')
    let password = component.form.get('password')
    email.setValue('testing@gmail.com')
    password.setValue('testing')
    spyOn(usuarioService, 'login')
    component.login()
    expect(usuarioService.login).toHaveBeenCalled()
  })
  
});
