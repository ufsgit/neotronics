import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Stock_AdjustComponent } from './Stock_Adjust.component';
describe('AddStockComponent', () => {
let component: Stock_AdjustComponent;
let fixture: ComponentFixture<Stock_AdjustComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Stock_AdjustComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Stock_AdjustComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

