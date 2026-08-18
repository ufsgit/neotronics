import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketSystemComponent } from './market-system.component';

describe('MarketSystemComponent', () => {
  let component: MarketSystemComponent;
  let fixture: ComponentFixture<MarketSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
