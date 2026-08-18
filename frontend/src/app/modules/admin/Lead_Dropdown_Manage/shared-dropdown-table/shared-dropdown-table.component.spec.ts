import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDropdownTableComponent } from './shared-dropdown-table.component';

describe('SharedDropdownTableComponent', () => {
  let component: SharedDropdownTableComponent;
  let fixture: ComponentFixture<SharedDropdownTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedDropdownTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDropdownTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
