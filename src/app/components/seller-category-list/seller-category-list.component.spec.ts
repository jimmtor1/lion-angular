import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCategoryListComponent } from './seller-category-list.component';

describe('SellerCategoryListComponent', () => {
  let component: SellerCategoryListComponent;
  let fixture: ComponentFixture<SellerCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
