import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { salesquotationmasterComponent } from './salesquotationmaster.component';
describe('salesquotationmasterComponent', () => {
let component: salesquotationmasterComponent;
let fixture: ComponentFixture<salesquotationmasterComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ salesquotationmasterComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(salesquotationmasterComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

