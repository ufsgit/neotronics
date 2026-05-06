import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Debit_NoteComponent } from './Debit_Note.component';

describe('Debit_NoteComponent', () => {
  let component: Debit_NoteComponent;
  let fixture: ComponentFixture<Debit_NoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Debit_NoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Debit_NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
