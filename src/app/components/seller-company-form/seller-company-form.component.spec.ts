import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCompanyFormComponent } from './seller-company-form.component';

describe('SellerCompanyFormComponent', () => {
  let component: SellerCompanyFormComponent;
  let fixture: ComponentFixture<SellerCompanyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerCompanyFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerCompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
