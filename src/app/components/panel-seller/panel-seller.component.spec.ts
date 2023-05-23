import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSellerComponent } from './panel-seller.component';

describe('PanelSellerComponent', () => {
  let component: PanelSellerComponent;
  let fixture: ComponentFixture<PanelSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
