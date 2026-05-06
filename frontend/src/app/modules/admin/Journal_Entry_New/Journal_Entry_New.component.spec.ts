import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Journal_Entry_NewComponent } from './Journal_Entry_New.component';
describe('Journal_Entry_NewComponent', () => {
let component: Journal_Entry_NewComponent;
let fixture: ComponentFixture<Journal_Entry_NewComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Journal_Entry_NewComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Journal_Entry_NewComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

