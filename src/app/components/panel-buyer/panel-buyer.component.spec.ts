import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBuyerComponent } from './panel-buyer.component';

describe('PanelBuyerComponent', () => {
  let component: PanelBuyerComponent;
  let fixture: ComponentFixture<PanelBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelBuyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
