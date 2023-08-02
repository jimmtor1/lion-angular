import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSuscriptionComponent } from './cancel-suscription.component';

describe('CancelSuscriptionComponent', () => {
  let component: CancelSuscriptionComponent;
  let fixture: ComponentFixture<CancelSuscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelSuscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelSuscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
