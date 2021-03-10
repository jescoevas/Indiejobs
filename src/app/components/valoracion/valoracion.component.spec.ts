import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValoracionComponent } from './valoracion.component';
import { ValoracionService } from '../../services/valoracion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ValoracionComponent', () => {
  let component: ValoracionComponent;
  let fixture: ComponentFixture<ValoracionComponent>;
  let servicio:ValoracionService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoracionComponent ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ValoracionComponent);
    component = fixture.componentInstance;
    servicio = TestBed.inject(ValoracionService)
    fixture.detectChanges();
  }));

  xit('Sumar valoración', () => {
    component.trabajo = {_id:"dfsgsfd"}
    fixture.detectChanges()
    //spyOn(servicio, 'sumarValoracion')
    component.yaValorada = true
    expect(component.yaValorada).toBeTruthy()
    // component.valorar()
    // expect(servicio.sumarValoracion).toHaveBeenCalled()
  });
});
