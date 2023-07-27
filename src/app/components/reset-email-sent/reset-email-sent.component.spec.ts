import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetEmailSentComponent } from './reset-email-sent.component';

describe('ResetEmailSentComponent', () => {
  let component: ResetEmailSentComponent;
  let fixture: ComponentFixture<ResetEmailSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetEmailSentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
