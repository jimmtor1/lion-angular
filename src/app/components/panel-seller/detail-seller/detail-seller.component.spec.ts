import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSellerComponent } from './detail-seller.component';

describe('DetailSellerComponent', () => {
  let component: DetailSellerComponent;
  let fixture: ComponentFixture<DetailSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
