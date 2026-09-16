import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDashboardV3Component } from './lead-dashboard-v3.component';

describe('LeadDashboardV3Component', () => {
  let component: LeadDashboardV3Component;
  let fixture: ComponentFixture<LeadDashboardV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadDashboardV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadDashboardV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
