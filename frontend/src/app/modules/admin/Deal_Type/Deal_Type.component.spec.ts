import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Deal_TypeComponent } from './Deal_Type.component';

describe('Deal_TypeComponent', () => {
  let component: Deal_TypeComponent;
  let fixture: ComponentFixture<Deal_TypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Deal_TypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Deal_TypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
