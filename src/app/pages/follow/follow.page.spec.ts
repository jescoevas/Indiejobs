import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FollowPage } from './follow.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('FollowPage', () => {
  let component: FollowPage;
  let fixture: ComponentFixture<FollowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowPage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FollowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
