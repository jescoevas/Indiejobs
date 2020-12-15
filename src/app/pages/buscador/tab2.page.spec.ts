import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab2Page } from './tab2.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';

describe('Buscador', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  let usuarioService:UsuarioService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab2Page],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService)
    fixture.detectChanges();
  }));

  describe('Formulario', () => {
    it('Formulario: Iniciado correctamente', () => {
      expect(component.datos.empleo).toEqual('')
      expect(component.datos.ciudad).toEqual('')
      expect(component.enviado).toBeFalsy()
      expect(component.trabajadores.length).toBe(0)
    })
  })

  describe('Buscador', () => {
    it('Buscador: Enviado', () => {
      spyOn(usuarioService, 'getTrabajadoresBuscador')
      component.buscar()
      expect(usuarioService.getTrabajadoresBuscador).toHaveBeenCalledWith(component.datos)
      fixture.whenStable().then( () => expect(component.enviado).toBeTruthy())
    })
    it('Buscador: Enviado haciendo click en formulario', () => {
      spyOn(usuarioService, 'getTrabajadoresBuscador')
      const button = fixture.debugElement.nativeElement.querySelector('#submit');
      button.click();
      expect(usuarioService.getTrabajadoresBuscador).toHaveBeenCalledWith(component.datos)
    })
    it('Buscador: Datos recibidos', () => {
      const trabajadores:Usuario[] = [{_id:'1', nombre:'Jesus'}, {_id:'2', nombre:'Marta'}]
      spyOn(usuarioService, 'getTrabajadoresBuscador').and.callFake(() => Promise.resolve(trabajadores))
      component.buscar()
      expect(usuarioService.getTrabajadoresBuscador).toHaveBeenCalledWith(component.datos)
      fixture.whenStable().then(() => {
        expect(component.trabajadores.length).toBe(2)
      })
    })
  })

});
