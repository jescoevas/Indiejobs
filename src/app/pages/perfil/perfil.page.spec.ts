import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuarioService } from '../../services/usuario.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('Perfil', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  let usuarioService:UsuarioService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilPage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService)
    fixture.detectChanges();
  }));

  it('Carga correcta del perfil', () => {
    expect(component).toBeTruthy()
    spyOn(usuarioService, "getUsuario")
    component.ngOnInit()
    fixture.whenStable().then(() => {
      expect(usuarioService.getUsuario).toHaveBeenCalled()
    })
  })

  // describe('Seguir a usuario', () => {

  //   it('Follow', () => {
  //     spyOn(usuarioService,"follow")
  //     component.follow()
  //     fixture.whenStable().then(() => {
  //       expect(usuarioService.follow).toHaveBeenCalled()
  //       expect(component.seguido).toBeTruthy()
  //     })
  //   })

  //   it('Unfollow', () => {
  //     spyOn(usuarioService,"unfollow")
  //     component.unfollow()
  //     fixture.whenStable().then(() => {
  //       expect(usuarioService.unfollow).toHaveBeenCalled()
  //       expect(component.seguido).toBeFalsy()
  //     })
  //   })

  // })

});
