import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Contra_EntryComponent } from './Contra_Entry.component';
describe('Contra_EntryComponent', () => {
let component: Contra_EntryComponent;
let fixture: ComponentFixture<Contra_EntryComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Contra_EntryComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Contra_EntryComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

