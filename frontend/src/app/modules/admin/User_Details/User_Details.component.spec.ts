import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { User_DetailsComponent } from './User_Details.component';
describe('User_DetailsComponent', () => {
let component: User_DetailsComponent;
let fixture: ComponentFixture<User_DetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ User_DetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(User_DetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

