import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Receipt_VoucherComponent } from './Receipt_Voucher.component';
describe('Receipt_VoucherComponent', () => {
let component: Receipt_VoucherComponent;
let fixture: ComponentFixture<Receipt_VoucherComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Receipt_VoucherComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Receipt_VoucherComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

