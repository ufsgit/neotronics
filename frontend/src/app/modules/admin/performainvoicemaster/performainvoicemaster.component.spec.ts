import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { performainvoicemasterComponent } from './performainvoicemaster.component';
describe('performainvoicemasterComponent', () => {
let component: performainvoicemasterComponent;
let fixture: ComponentFixture<performainvoicemasterComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ performainvoicemasterComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(performainvoicemasterComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

