import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Credit_NoteComponent } from './Credit_Note.component';

describe('Credit_NoteComponent', () => {
  let component: Credit_NoteComponent;
  let fixture: ComponentFixture<Credit_NoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Credit_NoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Credit_NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
