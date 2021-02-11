import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopTrabajosPage } from './top-trabajos.page';

describe('TopTrabajosPage', () => {
  let component: TopTrabajosPage;
  let fixture: ComponentFixture<TopTrabajosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopTrabajosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopTrabajosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
