import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Stock_Add_DetailsComponent } from './Stock_Add_Details.component';
describe('Stock_Add_DetailsComponent', () => {
let component: Stock_Add_DetailsComponent;
let fixture: ComponentFixture<Stock_Add_DetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Stock_Add_DetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Stock_Add_DetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

