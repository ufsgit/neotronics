import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {StockTakeComponent } from './StockTake.component';
describe('StockTakeComponent', () => {
let component: StockTakeComponent;
let fixture: ComponentFixture<StockTakeComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ StockTakeComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(StockTakeComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

