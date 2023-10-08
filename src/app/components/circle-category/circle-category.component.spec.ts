import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleCategoryComponent } from './circle-category.component';

describe('CircleCategoryComponent', () => {
  let component: CircleCategoryComponent;
  let fixture: ComponentFixture<CircleCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
