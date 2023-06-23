import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMiniComponent } from './chat-mini.component';

describe('ChatMiniComponent', () => {
  let component: ChatMiniComponent;
  let fixture: ComponentFixture<ChatMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMiniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
