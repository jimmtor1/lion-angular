import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendersSellerComponent } from './tenders-seller.component';

describe('TendersSellerComponent', () => {
  let component: TendersSellerComponent;
  let fixture: ComponentFixture<TendersSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TendersSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TendersSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
