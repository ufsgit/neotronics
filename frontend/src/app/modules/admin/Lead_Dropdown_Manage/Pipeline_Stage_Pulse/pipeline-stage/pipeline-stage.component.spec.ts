import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineStageComponent } from './pipeline-stage.component';

describe('PipelineStageComponent', () => {
  let component: PipelineStageComponent;
  let fixture: ComponentFixture<PipelineStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
