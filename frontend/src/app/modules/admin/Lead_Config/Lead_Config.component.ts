import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Lead_Config',
  templateUrl: './Lead_Config.component.html',
  styleUrls: ['./Lead_Config.component.css']
})
export class Lead_ConfigComponent implements OnInit {
  activeSection: string = 'Company Details';
  activeSubTab: string = 'Vertical';
  expandedSection: string = 'Company Details';
  isSidebarOpen: boolean = true;

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

  selectSection(section: string) {
    if (this.expandedSection === section) {
      this.expandedSection = '';
    } else {
      this.expandedSection = section;
    }

    if (this.activeSection !== section) {
      this.activeSection = section;
      if (this.subTabs[section] && this.subTabs[section].length > 0) {
        this.activeSubTab = this.subTabs[section][0];
      } else {
        this.activeSubTab = '';
      }
    }
  }

  selectSubTab(tab: string) {
    this.activeSubTab = tab;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
