import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinRecordComponent } from './coin-record.component';

describe('CoinRecordComponent', () => {
  let component: CoinRecordComponent;
  let fixture: ComponentFixture<CoinRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
