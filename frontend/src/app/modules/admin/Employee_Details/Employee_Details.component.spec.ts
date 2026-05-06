import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Employee_DetailsComponent } from './Employee_Details.component';
describe('Employee_DetailsComponent', () => {
let component: Employee_DetailsComponent;
let fixture: ComponentFixture<Employee_DetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Employee_DetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Employee_DetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

