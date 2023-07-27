import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinbycompanyComponent } from './coinbycompany.component';

describe('CoinbycompanyComponent', () => {
  let component: CoinbycompanyComponent;
  let fixture: ComponentFixture<CoinbycompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinbycompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinbycompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
