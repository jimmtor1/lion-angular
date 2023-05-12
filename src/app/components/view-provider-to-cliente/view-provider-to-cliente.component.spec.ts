import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProviderToClienteComponent } from './view-provider-to-cliente.component';

describe('ViewProviderToClienteComponent', () => {
  let component: ViewProviderToClienteComponent;
  let fixture: ComponentFixture<ViewProviderToClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProviderToClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProviderToClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
