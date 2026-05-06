import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Damage_MasterComponent } from './Damage_Master.component';
describe('Damage_MasterComponent', () => {
let component: Damage_MasterComponent;
let fixture: ComponentFixture<Damage_MasterComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Damage_MasterComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Damage_MasterComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

