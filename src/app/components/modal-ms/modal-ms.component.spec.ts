import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMsComponent } from './modal-ms.component';

describe('ModalMsComponent', () => {
  let component: ModalMsComponent;
  let fixture: ComponentFixture<ModalMsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
