import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UltimasResenasPage } from './ultimas-resenas.page';

describe('UltimasResenasPage', () => {
  let component: UltimasResenasPage;
  let fixture: ComponentFixture<UltimasResenasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltimasResenasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UltimasResenasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
