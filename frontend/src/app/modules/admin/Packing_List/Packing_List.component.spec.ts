import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Packing_ListComponent } from './Packing_List.component';
describe('Packing_ListComponent', () => {
let component: Packing_ListComponent;
let fixture: ComponentFixture<Packing_ListComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Packing_ListComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Packing_ListComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

