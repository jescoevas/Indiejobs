import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormTrabajoPage } from './form-trabajo.page';

describe('FormTrabajoPage', () => {
  let component: FormTrabajoPage;
  let fixture: ComponentFixture<FormTrabajoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTrabajoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormTrabajoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
