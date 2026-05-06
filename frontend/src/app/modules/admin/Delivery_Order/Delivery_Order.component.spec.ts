import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Delivery_OrderComponent } from './Delivery_Order.component';
describe('Delivery_OrderComponent', () => {
let component: Delivery_OrderComponent;
let fixture: ComponentFixture<Delivery_OrderComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Delivery_OrderComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Delivery_OrderComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

