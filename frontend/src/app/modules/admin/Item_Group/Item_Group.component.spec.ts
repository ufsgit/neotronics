import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Item_GroupComponent } from './Item_Group.component';
describe('Item_GroupComponent', () => {
let component: Item_GroupComponent;
let fixture: ComponentFixture<Item_GroupComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Item_GroupComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Item_GroupComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

