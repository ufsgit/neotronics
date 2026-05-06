import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Account_GroupComponent } from './Account_Group.component';
describe('Account_GroupComponent', () => {
let component: Account_GroupComponent;
let fixture: ComponentFixture<Account_GroupComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Account_GroupComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Account_GroupComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

