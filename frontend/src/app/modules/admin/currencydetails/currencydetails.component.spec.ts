import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { currencydetailsComponent } from './currencydetails.component';
describe('currencydetailsComponent', () => {
let component: currencydetailsComponent;
let fixture: ComponentFixture<currencydetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ currencydetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(currencydetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

