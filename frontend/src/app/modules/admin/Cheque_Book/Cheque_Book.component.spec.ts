import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Cheque_BookComponent } from './Cheque_Book.component';
describe('Cheque_BookComponent', () => {
let component: Cheque_BookComponent;
let fixture: ComponentFixture<Cheque_BookComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Cheque_BookComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Cheque_BookComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

