import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TrabajoService } from '../../services/trabajo.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { FormTrabajoPage } from './form-trabajo.page';

describe('FormTrabajoComponent', () => {
  let component: FormTrabajoPage;
  let fixture: ComponentFixture<FormTrabajoPage>;
  let servicio:TrabajoService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTrabajoPage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormTrabajoPage);
    component = fixture.componentInstance;
    servicio = TestBed.inject(TrabajoService)
    fixture.detectChanges();
  }));


    it('Formulario: Iniciado correctamente', () => {
        let datos:any = {
            cuerpo:'',
            estrellas:0
        }
        expect(component.datos).toEqual(datos)
    })

    it('Formulario: Enviado', () => {
        spyOn(servicio, 'nuevoTrabajo')
        const testForm = <NgForm>{
            value: {
                cuerpo: "Hello",
                estrellas: 0
            },
            valid:true
        };
        component.imagen = 'testing'
        component.submit(testForm)
        expect(servicio.nuevoTrabajo).toHaveBeenCalled()
    })

    it('Formulario: No enviado por imagen default', () => {
        spyOn(servicio, 'nuevoTrabajo')
        const testForm = <NgForm>{
            value: {
                cuerpo: "Hello",
                estrellas: 0
            },
            valid:true
        };
        component.imagen = 'assets/images/imagen_default.png'
        component.submit(testForm)
        expect(servicio.nuevoTrabajo).not.toHaveBeenCalled()
    })
});
