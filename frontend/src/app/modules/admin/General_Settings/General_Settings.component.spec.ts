import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { General_SettingsComponent } from './General_Settings.component';
describe('General_SettingsComponent', () => {
let component: General_SettingsComponent;
let fixture: ComponentFixture<General_SettingsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ General_SettingsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(General_SettingsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

