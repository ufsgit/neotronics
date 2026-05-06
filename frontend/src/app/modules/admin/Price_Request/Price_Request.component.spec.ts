import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Price_RequestComponent } from './Price_Request.component';
describe('Price_RequestComponent', () => {
let component: Price_RequestComponent;
let fixture: ComponentFixture<Price_RequestComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Price_RequestComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Price_RequestComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

