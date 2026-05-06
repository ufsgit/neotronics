import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Purchase_MasterComponent } from './Purchase_Master.component';
describe('Purchase_MasterComponent', () => {
let component: Purchase_MasterComponent;
let fixture: ComponentFixture<Purchase_MasterComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Purchase_MasterComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Purchase_MasterComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

