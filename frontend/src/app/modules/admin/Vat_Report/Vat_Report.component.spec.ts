import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Vat_ReportComponent } from './Vat_Report.component';
describe('Vat_ReportComponent', () => {
let component: Vat_ReportComponent;
let fixture: ComponentFixture<Vat_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Vat_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Vat_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

