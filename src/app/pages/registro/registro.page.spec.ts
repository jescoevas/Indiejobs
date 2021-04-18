import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroPage } from './registro.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import { FormUsuarioComponent } from '../../components/form-usuario/form-usuario.component';
import { UsuarioService } from '../../services/usuario.service';

xdescribe('Página de registro', () => {
  let page: RegistroPage;
  let component:FormUsuarioComponent
  let pageFixture: ComponentFixture<RegistroPage>;
  let componentFixture: ComponentFixture<FormUsuarioComponent>;
  let usuarioService:UsuarioService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPage, FormUsuarioComponent ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    pageFixture = TestBed.createComponent(RegistroPage);
    page = pageFixture.componentInstance;
    pageFixture.detectChanges();
    componentFixture = TestBed.createComponent(FormUsuarioComponent)
    component = componentFixture.componentInstance
    usuarioService = TestBed.inject(UsuarioService)
    componentFixture.detectChanges()
  }));

  describe('Formulario', () => {
    it('Formulario: Iniciado correctamente', () => {
      const nombre = component.form.get('nombre')
      const email = component.form.get('email')
      const password = component.form.get('password')
      const fechaNacimiento = component.form.get('fechaNacimiento')
      const telefono = component.form.get('telefono')
      const ciudad = component.form.get('ciudad')
      const direccion = component.form.get('direccion')
      const codigoPostal = component.form.get('codigoPostal')
      const trabajador = component.form.get('trabajador')
      expect(nombre.value).toEqual('')
      expect(email.value).toEqual('')
      expect(password.value).toEqual('')
      expect(fechaNacimiento.value).toEqual('')
      expect(telefono.value).toEqual('')
      expect(ciudad.value).toEqual('')
      expect(direccion.value).toEqual('')
      expect(codigoPostal.value).toEqual('')
      expect(trabajador.value).toBeFalsy()
      expect(component.form.valid).toBeFalsy()
    })
  
    it('Formulario: Validado', () => {
      const date = new Date()
      spyOn(usuarioService, 'checkEmail').and.callFake(() => Promise.resolve(0))
      spyOn(usuarioService, 'checkTelefono').and.callFake(() => Promise.resolve(0))
      let nombre = component.form.get('nombre')
      let email = component.form.get('email')
      let password = component.form.get('password')
      let fechaNacimiento = component.form.get('fechaNacimiento')
      let telefono = component.form.get('telefono')
      let ciudad = component.form.get('ciudad')
      let direccion = component.form.get('direccion')
      let codigoPostal = component.form.get('codigoPostal')
      let trabajador = component.form.get('trabajador')
      nombre.setValue('testing')
      email.setValue('testing@testing.com')
      password.setValue('testing')
      fechaNacimiento.setValue(date)
      telefono.setValue(111111111)
      ciudad.setValue('testing')
      direccion.setValue('testing')
      codigoPostal.setValue(41006)
      trabajador.setValue(false)
      expect(nombre.value).toEqual('testing')
      expect(email.value).toEqual('testing@testing.com')
      expect(password.value).toEqual('testing')
      expect(fechaNacimiento.value).toEqual(date)
      expect(telefono.value).toEqual(111111111  )
      expect(ciudad.value).toEqual('testing')
      expect(direccion.value).toEqual('testing')
      expect(codigoPostal.value).toEqual(41006)
      expect(trabajador.value).toBeFalsy()
      componentFixture.whenStable().then(() => {
        expect(usuarioService.checkEmail).toHaveBeenCalled()
        expect(usuarioService.checkTelefono).toHaveBeenCalled()
        expect(component.form.valid).toBeTruthy()
      })
    })
  })
  
  describe('Registro', () => {
    it('Registro: Datos emitidos', () => {
      const date = new Date()
      spyOn(usuarioService, 'checkEmail').and.callFake(() => Promise.resolve(0))
      spyOn(usuarioService, 'checkTelefono').and.callFake(() => Promise.resolve(0))
      let nombre = component.form.get('nombre')
      let email = component.form.get('email')
      let password = component.form.get('password')
      let fechaNacimiento = component.form.get('fechaNacimiento')
      let telefono = component.form.get('telefono')
      let ciudad = component.form.get('ciudad')
      let direccion = component.form.get('direccion')
      let codigoPostal = component.form.get('codigoPostal')
      let trabajador = component.form.get('trabajador')
      nombre.setValue('testing')
      email.setValue('testing@testing.com')
      password.setValue('testing')
      fechaNacimiento.setValue(date)
      telefono.setValue(111111111)
      ciudad.setValue('testing')
      direccion.setValue('testing')
      codigoPostal.setValue(41006)
      trabajador.setValue(false)
      expect(nombre.value).toEqual('testing')
      expect(email.value).toEqual('testing@testing.com')
      expect(password.value).toEqual('testing')
      expect(fechaNacimiento.value).toEqual(date)
      expect(telefono.value).toEqual(111111111  )
      expect(ciudad.value).toEqual('testing')
      expect(direccion.value).toEqual('testing')
      expect(codigoPostal.value).toEqual(41006)
      expect(trabajador.value).toBeFalsy()
      component.submit()
      component.emiteDatos.subscribe(data => expect(data).toBeTruthy())
    })

    it('Registro: Enviado', () => {
      const datos:Object = {usuario:{}, imagen:{}}
      spyOn(usuarioService, 'registro')
      page.recogeDatos(datos)
      expect(usuarioService.registro).toHaveBeenCalled()
    })

    it('Registro: Mensaje y token recibido', () => {
      const datos:Object = {usuario:{}, imagen:{file:'szfz'}}
      spyOn(usuarioService, 'registro').and.callFake(() => {
        return Promise.resolve({msg:'Registro realizado con exito', token:'sdidsiasdis'})
      })
      spyOn(usuarioService, 'asignarFoto')
      page.recogeDatos(datos)
      expect(usuarioService.registro).toHaveBeenCalled()
      pageFixture.whenStable().then(() => expect(usuarioService.asignarFoto).toHaveBeenCalled())
    })

    it('Registro: Sin imagen', () => {
      const datos:Object = {usuario:{}, imagen:undefined}
      spyOn(usuarioService, 'registro').and.callFake(() => {
        return Promise.resolve({msg:'Registro realizado con exito', token:'sdidsiasdis'})
      })
      spyOn(usuarioService, 'asignarFoto')
      page.recogeDatos(datos)
      expect(usuarioService.registro).toHaveBeenCalled()
      pageFixture.whenStable().then(() => expect(usuarioService.asignarFoto).not.toHaveBeenCalled())
    })
  })

});
