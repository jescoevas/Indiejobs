import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopTrabajadoresPage } from './top-trabajadores.page';

describe('TopTrabajadoresPage', () => {
  let component: TopTrabajadoresPage;
  let fixture: ComponentFixture<TopTrabajadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopTrabajadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopTrabajadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
