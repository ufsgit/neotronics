import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {StockTakeNameComponent } from './StockTakeName.component';
describe('StockTakeNameComponent', () => {
let component: StockTakeNameComponent;
let fixture: ComponentFixture<StockTakeNameComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ StockTakeNameComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(StockTakeNameComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

