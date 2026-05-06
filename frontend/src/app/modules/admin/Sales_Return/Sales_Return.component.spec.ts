import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sales_ReturnComponent } from './Sales_Return.component';

describe('Sales_ReturnComponent', () => {
  let component: Sales_ReturnComponent;
  let fixture: ComponentFixture<Sales_ReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sales_ReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sales_ReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
