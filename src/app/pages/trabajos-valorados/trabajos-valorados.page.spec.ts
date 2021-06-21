import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrabajosValoradosPage } from './trabajos-valorados.page';

xdescribe('TrabajosValoradosPage', () => {
  let component: TrabajosValoradosPage;
  let fixture: ComponentFixture<TrabajosValoradosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajosValoradosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrabajosValoradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
