import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HSNComponent } from './HSN.component';
describe('HSNComponent', () => {
let component: HSNComponent;
let fixture: ComponentFixture<HSNComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ HSNComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(HSNComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

