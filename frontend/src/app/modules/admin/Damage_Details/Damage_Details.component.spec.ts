import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Damage_DetailsComponent } from './Damage_Details.component';
describe('Damage_DetailsComponent', () => {
let component: Damage_DetailsComponent;
let fixture: ComponentFixture<Damage_DetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Damage_DetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Damage_DetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

