import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetStageComponent } from './target-stage.component';

describe('TargetStageComponent', () => {
  let component: TargetStageComponent;
  let fixture: ComponentFixture<TargetStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
