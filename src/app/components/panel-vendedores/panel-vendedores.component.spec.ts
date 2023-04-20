import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelVendedoresComponent } from './panel-vendedores.component';

describe('PanelVendedoresComponent', () => {
  let component: PanelVendedoresComponent;
  let fixture: ComponentFixture<PanelVendedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelVendedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
