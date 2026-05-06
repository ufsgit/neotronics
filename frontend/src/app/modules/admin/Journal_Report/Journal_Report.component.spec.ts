import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Journal_EntryComponent } from './Journal_Entry.component';
describe('Journal_EntryComponent', () => {
let component: Journal_EntryComponent;
let fixture: ComponentFixture<Journal_EntryComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Journal_EntryComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Journal_EntryComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

