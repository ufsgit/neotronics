import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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

  // Modal dialog state
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  isSaving: boolean = false;
  formData: { id: number; name: string; description: string } = { id: 0, name: '', description: '' };
  
  columns = [
    { key: 'name', label: 'Name' },
    { key: 'Description', label: 'Description' }
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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.Load_Data();
  }

  getRoutePathForSubTab(tab: string): string {
    const map: { [key: string]: string } = {
      'Vertical': 'Lead_Config/company_details/vertical',
      'State': 'Lead_Config/company_details/state',
      'District': 'Lead_Config/company_details/district',
      'Company Size': 'Lead_Config/company_details/company_size',
      'Source': 'Lead_Config/company_details/source',
      'Designation': 'Lead_Config/contacts/designation',
      'Service/Product': 'Lead_Config/requirement_profile/service_product',
      'Market System': 'Lead_Config/market_study/market_system',
      'Pipeline Stage': 'Lead_Config/pipeline_stage_pulse/pipeline_stage',
      'Pulse': 'Lead_Config/pipeline_stage_pulse/pulse',
      'Target Stage': 'Lead_Config/pipeline_stage_pulse/target_stage',
      'Branch': 'Lead_Config/assignment/assignment',
      'Department': 'Lead_Config/assignment/assignment',
      'Workflow': 'Lead_Config/followup_automation/followup_automation'
    };
    return map[tab] || '';
  }

  getPrimaryKeyField(tab: string): string {
    const map: { [key: string]: string } = {
      'Vertical': 'Vertical_Id',
      'State': 'State_Id',
      'District': 'District_Id',
      'Company Size': 'Company_Size_Id',
      'Source': 'Source_Id',
      'Designation': 'Designation_Id',
      'Service/Product': 'Service_Product_Id',
      'Market System': 'Market_System_Id',
      'Pipeline Stage': 'Pipeline_Stage_Id',
      'Pulse': 'Pulse_Id',
      'Target Stage': 'Target_Stage_Id',
      'Branch': 'Assignment_Id',
      'Department': 'Assignment_Id',
      'Workflow': 'Followup_Automation_Id'
    };
    return map[tab] || 'Id';
  }

  getNameField(tab: string): string {
    const map: { [key: string]: string } = {
      'Vertical': 'Vertical_Name',
      'State': 'State_Name',
      'District': 'District_Name',
      'Company Size': 'Company_Size_Name',
      'Source': 'Source_Name',
      'Designation': 'Designation_Name',
      'Service/Product': 'Service_Product_Name',
      'Market System': 'Market_System_Name',
      'Pipeline Stage': 'Pipeline_Stage_Name',
      'Pulse': 'Pulse_Name',
      'Target Stage': 'Target_Stage_Name',
      'Branch': 'Assignment_Name',
      'Department': 'Assignment_Name',
      'Workflow': 'Followup_Automation_Name'
    };
    return map[tab] || 'Name';
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
    if (token) {
      return { headers: { 'Authorization': 'Bearer ' + token } };
    }
    return {};
  }

  Load_Data() {
    const route = this.getRoutePathForSubTab(this.activeSubTab);
    if (!route) {
        this.Dropdown_Data = [];
        this.totalCount = 0;
        return;
    }
    this.issLoading = true;
    const url = environment.BasePath + route + '/Search';
    const options: any = {
      params: { search: this.searchText || '' },
      ...this.getAuthHeaders()
    };
    this.http.get(url, options).subscribe(
      (res: any) => {
        this.issLoading = false;
        let list: any[] = [];
        if (res && Array.isArray(res)) {
          list = res;
        } else if (res && Array.isArray(res[0])) {
          list = res[0];
        }
        
        const pk = this.getPrimaryKeyField(this.activeSubTab);
        const nameField = this.getNameField(this.activeSubTab);

        this.Dropdown_Data = list.map(item => ({
          ...item,
          id: item[pk] || item.id || 0,
          name: item[nameField] || item.name || item.Vertical_Name || item.Name || '',
          Description: item.Description || item.description || ''
        }));
        
        this.totalCount = this.Dropdown_Data.length;
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
    this.isEditMode = false;
    this.formData = { id: 0, name: '', description: '' };
    this.isModalOpen = true;
  }

  onEdit(item: any) {
    this.isEditMode = true;
    const pk = this.getPrimaryKeyField(this.activeSubTab);
    const nameField = this.getNameField(this.activeSubTab);
    this.formData = {
      id: item[pk] || item.id || 0,
      name: item[nameField] || item.name || '',
      description: item.Description || item.description || ''
    };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveItem() {
    if (!this.formData.name.trim()) return;
    this.isSaving = true;

    const route = this.getRoutePathForSubTab(this.activeSubTab);
    const pk = this.getPrimaryKeyField(this.activeSubTab);
    const nameField = this.getNameField(this.activeSubTab);

    const body: any = {};
    body[pk] = this.formData.id;
    body[nameField] = this.formData.name.trim();
    body.Description = this.formData.description;

    const url = environment.BasePath + route + '/Save';
    this.http.post(url, body, this.getAuthHeaders()).subscribe(
      (res: any) => {
        this.isSaving = false;
        this.closeModal();
        this.searchText = '';
        this.pageIndex = 1;
        this.Load_Data();
      },
      (error) => {
        this.isSaving = false;
        console.error('Error saving item:', error);
        alert('Error saving record');
      }
    );
  }

  onDelete(item: any) {
    const pk = this.getPrimaryKeyField(this.activeSubTab);
    const nameField = this.getNameField(this.activeSubTab);
    const id = item[pk] || item.id;
    const itemName = item[nameField] || item.name || 'this item';

    if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
      const route = this.getRoutePathForSubTab(this.activeSubTab);
      const url = environment.BasePath + route + '/Delete/' + id;
      this.http.get(url, this.getAuthHeaders()).subscribe(
        (res: any) => {
          this.Load_Data();
        },
        (error) => {
          console.error('Error deleting item:', error);
          alert('Error deleting record');
        }
      );
    }
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
