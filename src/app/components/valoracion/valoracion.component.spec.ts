import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValoracionComponent } from './valoracion.component';
import { ValoracionService } from '../../services/valoracion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Trabajo } from '../../models/trabajo';

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

  it('should create', () => {
    component.trabajo  = {_id:"dfsaddaf"}
    spyOn(servicio, 'getValoracionTrabajo')
    component.ngOnInit()
    expect(servicio.getValoracionTrabajo).toHaveBeenCalled()
  });
});
