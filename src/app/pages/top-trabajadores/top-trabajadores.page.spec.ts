import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopTrabajadoresPage } from './top-trabajadores.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

xdescribe('Top Trabajadores', () => {
  let component: TopTrabajadoresPage;
  let fixture: ComponentFixture<TopTrabajadoresPage>;
  let servicio:UsuarioService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopTrabajadoresPage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TopTrabajadoresPage);
    component = fixture.componentInstance;
    servicio = TestBed.inject(UsuarioService)
    fixture.detectChanges();
  }));

  it('Carga mejores trabajadores', () => {
    const trabajadores:Usuario[] = [{_id:"34356"}, {_id:"143"}]
    spyOn(servicio, "getMejoresTrabajadores").and.callFake(() => Promise.resolve(trabajadores))
    component.ngOnInit()
    expect(servicio.getMejoresTrabajadores).toHaveBeenCalled()
    fixture.whenStable().then(() => {
      expect(component.tipoActual).toBe("Local")
      expect(component.ordenActual).toBe("Estrellas")
      expect(component.trabajadores.length).toBe(2)
    })
  });

});
