import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { environment } from 'src/environments/environment';
import { Tab1Page } from './tab1.page';
import { By } from '@angular/platform-browser';

const apiUrl = environment.apiUrl

describe('Página de inicio', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let servicio:UsuarioService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    servicio = TestBed.inject(UsuarioService)
    fixture.detectChanges();
  }));

  it('Init: Llama a getTrabajadoresCercanos', () => {
    spyOn(servicio, 'getTrabajadoresCercanos')
    component.ngOnInit()
    expect(servicio.getTrabajadoresCercanos).toHaveBeenCalled()
  })

  it('Init: Obtiene los trabajadores cercanos', () => {
    const trabajadores:Usuario[] = [{_id:'1', nombre:'Jesus'}, {_id:'2', nombre:'Marta'}]
    spyOn(servicio, 'getTrabajadoresCercanos').and.callFake(() => {
      return Promise.resolve(trabajadores)
    })
    component.ngOnInit()
    expect(servicio.getTrabajadoresCercanos).toHaveBeenCalled()
    fixture.whenStable().then(() => {
      expect(component.trabajadores.length).toBe(2)
    })
  })

});
