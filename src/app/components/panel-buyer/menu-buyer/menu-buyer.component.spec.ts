import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBuyerComponent } from './menu-buyer.component';

describe('MenuBuyerComponent', () => {
  let component: MenuBuyerComponent;
  let fixture: ComponentFixture<MenuBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBuyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
