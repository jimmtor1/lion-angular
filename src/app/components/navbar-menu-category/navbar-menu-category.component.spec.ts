import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMenuCategoryComponent } from './navbar-menu-category.component';

describe('NavbarMenuCategoryComponent', () => {
  let component: NavbarMenuCategoryComponent;
  let fixture: ComponentFixture<NavbarMenuCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarMenuCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarMenuCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
