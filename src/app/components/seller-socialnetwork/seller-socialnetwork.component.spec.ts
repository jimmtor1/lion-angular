import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSocialnetworkComponent } from './seller-socialnetwork.component';

describe('SellerSocialnetworkComponent', () => {
  let component: SellerSocialnetworkComponent;
  let fixture: ComponentFixture<SellerSocialnetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerSocialnetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerSocialnetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
