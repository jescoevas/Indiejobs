import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FollowPage } from './follow.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

xdescribe('Follow', () => {
  let component: FollowPage;
  let fixture: ComponentFixture<FollowPage>;
  let usuarioService:UsuarioService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowPage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers:[
        {
          provide:ActivatedRoute,
          useValue:{
            params:of({id:'12734'})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FollowPage);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService)
    fixture.detectChanges();
  }));

  it('Carga seguidores', () => {
    const usuarios:Usuario[] = [{_id:"127834"}, {_id:"0123485432"}]
    expect(component).toBeTruthy();
    spyOn(usuarioService, "getSeguidores").and.callFake(() => Promise.resolve(usuarios))
    component.ngOnInit()
    fixture.whenStable().then(() => {
      expect(usuarioService.getSeguidores).toHaveBeenCalled()
      expect(component.usuarios.length).toBe(2)
    })
  });
});
