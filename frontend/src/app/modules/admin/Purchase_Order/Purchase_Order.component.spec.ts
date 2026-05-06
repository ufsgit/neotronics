import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Purchase_orderComponent } from './Purchase_order.component';
describe('Purchase_orderComponent', () => {
let component: Purchase_orderComponent;
let fixture: ComponentFixture<Purchase_orderComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Purchase_orderComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Purchase_orderComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

