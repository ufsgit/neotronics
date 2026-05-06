import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuotationComponent } from './Quotation.component';
describe('QuotationComponent', () => {
let component: QuotationComponent;
let fixture: ComponentFixture<QuotationComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ QuotationComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(QuotationComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

