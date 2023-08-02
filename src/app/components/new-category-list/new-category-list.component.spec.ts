import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategoryListComponent } from './new-category-list.component';

describe('NewCategoryListComponent', () => {
  let component: NewCategoryListComponent;
  let fixture: ComponentFixture<NewCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
