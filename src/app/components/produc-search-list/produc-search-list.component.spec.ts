import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducSearchListComponent } from './produc-search-list.component';

describe('ProducSearchListComponent', () => {
  let component: ProducSearchListComponent;
  let fixture: ComponentFixture<ProducSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducSearchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
