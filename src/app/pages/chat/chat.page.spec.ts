import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatPage } from './chat.page';
import { ChatService } from '../../services/chat.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Mensaje } from '../../models/mensaje';

describe('ChatPage', () => {
  let component: ChatPage;
  let fixture: ComponentFixture<ChatPage>;
  let servicio: ChatService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPage);
    component = fixture.componentInstance;
    servicio = TestBed.inject(ChatService)
    fixture.detectChanges();
  }));

  it('Init: Obtener mensajes', () => {
    const mensajes:Mensaje[] = [{_id:'1'}, {_id:'2'}]
    spyOn(servicio, 'getChatMensajes').and.callFake(() => Promise.resolve(mensajes))
    component.ngOnInit()
    expect(servicio.getChatMensajes).toHaveBeenCalled()
    fixture.whenStable().then(() => {
      expect(component.mensajes.length).toBe(2)
    })
  })

  it('Formulario: Iniciar chat', () => {
    component.datos = {
      cuerpo:'ssd'
    }
    component.mensajes = []
    fixture.detectChanges()
    spyOn(servicio, 'iniciarChat')
    const testForm = <NgForm>{
        value: {
            cuerpo: "Hello"
        },
        valid:true
    };
    component.enviar(testForm)
    expect(servicio.iniciarChat).toHaveBeenCalled()
})

it('Formulario: Enviar mensaje', () => {
  component.datos = {
    cuerpo:'ssd'
  }
  component.mensajes = [{_id:'123abc'}]
  fixture.detectChanges()
  spyOn(servicio, "enviarMensaje")
  const testForm = <NgForm>{
      value: {
          cuerpo: "Hello"
      },
      valid:true
  };
  component.enviar(testForm)
  expect(servicio.enviarMensaje).toHaveBeenCalled()
})


});
