import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Stock_ReportsComponent } from './Stock_Reports.component';
describe('Stock_ReportsComponent', () => {
let component: Stock_ReportsComponent;
let fixture: ComponentFixture<Stock_ReportsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Stock_ReportsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Stock_ReportsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

