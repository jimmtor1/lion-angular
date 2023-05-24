import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderBuyerComponent } from './tender-buyer.component';

describe('TenderBuyerComponent', () => {
  let component: TenderBuyerComponent;
  let fixture: ComponentFixture<TenderBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderBuyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
