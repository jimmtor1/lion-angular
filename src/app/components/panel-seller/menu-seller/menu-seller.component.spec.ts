import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSellerComponent } from './menu-seller.component';

describe('MenuSellerComponent', () => {
  let component: MenuSellerComponent;
  let fixture: ComponentFixture<MenuSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
