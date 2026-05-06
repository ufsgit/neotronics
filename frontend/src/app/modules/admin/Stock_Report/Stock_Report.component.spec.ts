import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Stock_ReportComponent } from './Stock_Report.component';
describe('Stock_ReportComponent', () => {
let component: Stock_ReportComponent;
let fixture: ComponentFixture<Stock_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Stock_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Stock_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

