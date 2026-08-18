import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProductComponent } from './service-product.component';

describe('ServiceProductComponent', () => {
  let component: ServiceProductComponent;
  let fixture: ComponentFixture<ServiceProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
