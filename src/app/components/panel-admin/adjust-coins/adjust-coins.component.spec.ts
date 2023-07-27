import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustCoinsComponent } from './adjust-coins.component';

describe('AdjustCoinsComponent', () => {
  let component: AdjustCoinsComponent;
  let fixture: ComponentFixture<AdjustCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjustCoinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjustCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
