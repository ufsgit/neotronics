import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Client_AccountsComponent } from './Client_Accounts.component';
describe('Client_AccountsComponent', () => {
let component: Client_AccountsComponent;
let fixture: ComponentFixture<Client_AccountsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Client_AccountsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Client_AccountsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

