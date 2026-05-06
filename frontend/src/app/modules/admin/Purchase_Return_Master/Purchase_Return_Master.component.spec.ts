import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Purchase_Return_MasterComponent } from './Purchase_Return_Master.component';
describe('Purchase_Return_MasterComponent', () => {
let component: Purchase_Return_MasterComponent;
let fixture: ComponentFixture<Purchase_Return_MasterComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Purchase_Return_MasterComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Purchase_Return_MasterComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

