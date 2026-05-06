import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Receipt_ReferenceComponent } from './Receipt_Reference.component';
describe('Receipt_ReferenceComponent', () => {
let component: Receipt_ReferenceComponent;
let fixture: ComponentFixture<Receipt_ReferenceComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Receipt_ReferenceComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Receipt_ReferenceComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

