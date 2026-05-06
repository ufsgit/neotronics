import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { purchaseordermasterComponent } from './purchaseordermaster.component';
describe('purchaseordermasterComponent', () => {
let component: purchaseordermasterComponent;
let fixture: ComponentFixture<purchaseordermasterComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ purchaseordermasterComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(purchaseordermasterComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

