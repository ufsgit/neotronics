import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-lead-config-menu-slider',
  templateUrl: './lead-config-menu-slider.component.html',
  styleUrls: ['./lead-config-menu-slider.component.css']
})
export class LeadConfigMenuSliderComponent implements OnInit {
  @Input() isSidebarOpen: boolean = true;
  @Input() activeSection: string = '';
  @Input() activeSubTab: string = '';
  @Input() expandedSection: string = '';
  
  @Output() toggle = new EventEmitter<void>();
  @Output() sectionSelect = new EventEmitter<string>();
  @Output() subTabSelect = new EventEmitter<string>();

  sections = [
    { name: 'Company Details', icon: 'business' },
    { name: 'Contacts', icon: 'people' },
    { name: 'Requirement Profile', icon: 'assignment' },
    { name: 'Market Study', icon: 'storefront' },
    { name: 'Pipeline Stage & Pulse', icon: 'timeline' },
    { name: 'Assignment', icon: 'event_available' },
    { name: 'Follow-up Automation', icon: 'autorenew' }
  ];

  subTabs: { [key: string]: string[] } = {
    'Company Details': ['Vertical', 'State', 'District', 'Company Size', 'Source'],
    'Contacts': ['Designation'],
    'Requirement Profile': ['Service/Product'],
    'Market Study': ['Market System'],
    'Pipeline Stage & Pulse': ['Pipeline Stage', 'Pulse', 'Target Stage'],
    'Assignment': ['Branch', 'Department'],
    'Follow-up Automation': ['Workflow']
  };

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.toggle.emit();
  }

  selectSection(section: string) {
    this.sectionSelect.emit(section);
  }

  selectSubTab(tab: string) {
    this.subTabSelect.emit(tab);
  }
}
