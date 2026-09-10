import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDashboardV2Component } from './lead-dashboard-v2.component';

describe('LeadDashboardV2Component', () => {
  let component: LeadDashboardV2Component;
  let fixture: ComponentFixture<LeadDashboardV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadDashboardV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadDashboardV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
