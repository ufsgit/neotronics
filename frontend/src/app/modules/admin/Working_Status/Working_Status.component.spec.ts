import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Working_StatusComponent } from './Working_Status.component';

describe('Working_StatusComponent', () => {
  let component: Working_StatusComponent;
  let fixture: ComponentFixture<Working_StatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Working_StatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Working_StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});