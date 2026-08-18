import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySizeComponent } from './company-size.component';

describe('CompanySizeComponent', () => {
  let component: CompanySizeComponent;
  let fixture: ComponentFixture<CompanySizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
