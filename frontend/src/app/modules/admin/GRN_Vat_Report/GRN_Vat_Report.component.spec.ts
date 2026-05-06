import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GRN_Vat_ReportComponent } from './GRN_Vat_Report.component';
describe('GRN_Vat_ReportComponent', () => {
let component: GRN_Vat_ReportComponent;
let fixture: ComponentFixture<GRN_Vat_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ GRN_Vat_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(GRN_Vat_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

