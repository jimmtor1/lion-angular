import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBuyerListComponent } from './product-buyer-list.component';

describe('ProductBuyerListComponent', () => {
  let component: ProductBuyerListComponent;
  let fixture: ComponentFixture<ProductBuyerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBuyerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBuyerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
