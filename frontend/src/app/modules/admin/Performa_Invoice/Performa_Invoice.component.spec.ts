import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Performa_InvoiceComponent } from './Performa_Invoice.component';
describe('Performa_InvoiceComponent', () => {
let component: Performa_InvoiceComponent;
let fixture: ComponentFixture<Performa_InvoiceComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Performa_InvoiceComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Performa_InvoiceComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

