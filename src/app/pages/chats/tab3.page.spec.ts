import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab3Page } from './tab3.page';
import { ChatService } from '../../services/chat.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Chat } from '../../models/chat';

xdescribe('Chats', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;
  let servicio:ChatService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab3Page],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    servicio = TestBed.inject(ChatService)
    fixture.detectChanges();
  }));

  it('Init: Chats obtenidos', () => {
    const chats:Chat[] = [{_id:'1'}, {_id:'2'}]
    spyOn(servicio, 'getChats').and.callFake(() => Promise.resolve(chats))
    component.ionViewDidEnter()
    expect(servicio.getChats).toHaveBeenCalled()
    fixture.whenStable().then(() => {
      expect(component.chats.length).toBe(2)
    })
  });
});
