import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Country_Of_OrginComponent } from './Country_Of_Orgin.component';
describe('Country_Of_OrginComponent', () => {
let component: Country_Of_OrginComponent;
let fixture: ComponentFixture<Country_Of_OrginComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Country_Of_OrginComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Country_Of_OrginComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

