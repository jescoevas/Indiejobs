import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuarioService } from '../../services/usuario.service';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  let usuarioService:UsuarioService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilPage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService)
    fixture.detectChanges();
  }));
});
