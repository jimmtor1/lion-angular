import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarGeneralPhoneComponent } from './navbar-general-phone.component';

describe('NavbarGeneralPhoneComponent', () => {
  let component: NavbarGeneralPhoneComponent;
  let fixture: ComponentFixture<NavbarGeneralPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarGeneralPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarGeneralPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
