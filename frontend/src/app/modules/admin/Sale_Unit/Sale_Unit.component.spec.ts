import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Sale_UnitComponent } from './Sale_Unit.component';
describe('Sale_UnitComponent', () => {
let component: Sale_UnitComponent;
let fixture: ComponentFixture<Sale_UnitComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Sale_UnitComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Sale_UnitComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

