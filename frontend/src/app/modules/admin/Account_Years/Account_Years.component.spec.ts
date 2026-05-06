import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Account_YearsComponent } from './Account_Years.component';
describe('Account_YearsComponent', () => {
let component: Account_YearsComponent;
let fixture: ComponentFixture<Account_YearsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Account_YearsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Account_YearsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

