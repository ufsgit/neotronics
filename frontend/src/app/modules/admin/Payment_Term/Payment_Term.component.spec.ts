import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Payment_TermComponent } from './Payment_Term.component';
describe('Payment_TermComponent', () => {
let component: Payment_TermComponent;
let fixture: ComponentFixture<Payment_TermComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Payment_TermComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Payment_TermComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

