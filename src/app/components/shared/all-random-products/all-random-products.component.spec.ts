import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRandomProductsComponent } from './all-random-products.component';

describe('AllRandomProductsComponent', () => {
  let component: AllRandomProductsComponent;
  let fixture: ComponentFixture<AllRandomProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRandomProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRandomProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
