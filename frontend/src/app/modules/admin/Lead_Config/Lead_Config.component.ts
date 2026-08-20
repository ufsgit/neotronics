import { Component, OnInit } from '@angular/core';
import { Lead_Service } from '../../../services/Lead.Service';

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
  issLoading: boolean = false;
  Dropdown_Data: any[] = [];
  
  pageIndex: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  searchText: string = '';
  
  columns = [
    { key: 'name', label: 'Name' }
  ];

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

  constructor(private Lead_Service_: Lead_Service) { }

  ngOnInit() {
    this.Load_Data();
  }

  getApiTypeForSubTab(tab: string): string {
    const map: { [key: string]: string } = {
      'Vertical': 'Vertical',
      'State': 'State',
      'District': 'District',
      'Company Size': 'CompanySize',
      'Source': 'Source',
      'Designation': 'Designation',
      'Service/Product': 'ServiceInterest',
      'Market System': 'MarketSystem',
      'Pipeline Stage': 'PipelineStage',
      'Pulse': 'Pulse',
      'Target Stage': 'TargetStage',
      'Branch': 'Branch',
      'Department': 'Department',
      'Workflow': 'Workflow'
    };
    return map[tab] || '';
  }

  Load_Data() {
    const type = this.getApiTypeForSubTab(this.activeSubTab);
    if (!type) {
        this.Dropdown_Data = [];
        this.totalCount = 0;
        return;
    }
    this.issLoading = true;
    this.Lead_Service_.Search_Lead_Dropdowns(type, this.searchText, this.pageIndex).subscribe(
      (Rows) => {
        this.issLoading = false;
        if (Rows && Array.isArray(Rows)) {
          this.Dropdown_Data = Rows;
          this.totalCount = Rows.length > 0 ? (Rows[0].TotalCount || Rows.length) : 0;
        } else if (Rows && Array.isArray(Rows[0])) {
          this.Dropdown_Data = Rows[0];
          this.totalCount = Rows[0].length > 0 ? (Rows[0][0].TotalCount || Rows[0].length) : 0;
        } else {
          this.Dropdown_Data = [];
          this.totalCount = 0;
        }
      },
      (error) => {
        this.issLoading = false;
        console.error('Error fetching data:', error);
        this.Dropdown_Data = [];
        this.totalCount = 0;
      }
    );
  }

  onSearch(term: string) {
    this.searchText = term;
    this.pageIndex = 1;
    this.Load_Data();
  }

  onPageChange(page: number) {
    this.pageIndex = page;
    this.Load_Data();
  }

  onAdd() {
    console.log('Add clicked for', this.activeSubTab);
    // TODO: implement add dialog
  }

  onEdit(item: any) {
    console.log('Edit clicked for', item);
    // TODO: implement edit dialog
  }

  onDelete(item: any) {
    console.log('Delete clicked for', item);
    // TODO: implement delete action
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
        this.Load_Data();
      } else {
        this.activeSubTab = '';
        this.Dropdown_Data = [];
      }
    }
  }

  selectSubTab(tab: string) {
    if (this.activeSubTab !== tab) {
      this.activeSubTab = tab;
      this.Load_Data();
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
