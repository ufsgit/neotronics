import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-Lead_Config',
  templateUrl: './Lead_Config.component.html',
  styleUrls: ['./Lead_Config.component.css']
})
export class Lead_ConfigComponent implements OnInit {
  activeSection: string = sessionStorage.getItem('leadConfigSection') || 'Company Details';
  activeSubTab: string = sessionStorage.getItem('leadConfigSubTab') || 'Vertical';
  expandedSection: string = sessionStorage.getItem('leadConfigSection') || 'Company Details';
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
  
  // Delete Modal state
  isDeleteModalOpen: boolean = false;
  isDeleting: boolean = false;
  itemToDelete: any = null;
  itemToDeleteName: string = '';

  isErrorModalOpen: boolean = false;
  errorMessage: string = '';

  formData: { id: number; name: string; description: string; IsActive?: any } = { id: 0, name: '', description: '', IsActive: 1 };
  
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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.selectSubTab(this.activeSubTab);
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
      'Branch': 'Lead_Config/assignment/branch',
      'Department': 'Lead_Config/assignment/department',
      'Workflow': 'Lead_Config/followup_automation/workflow'
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
          Description: item.Description || item.description || '',
          IsActive: item.IsActive && typeof item.IsActive === 'object' && item.IsActive.data ? item.IsActive.data[0] : (item.IsActive ? 1 : 0)
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
    this.formData = { id: 0, name: '', description: '', IsActive: 1 };
    this.isModalOpen = true;
  }

  onEdit(item: any) {
    this.isEditMode = true;
    const pk = this.getPrimaryKeyField(this.activeSubTab);
    const nameField = this.getNameField(this.activeSubTab);
    this.formData = {
      id: item[pk] || item.id || 0,
      name: item[nameField] || item.name || '',
      description: item.Description || item.description || '',
      IsActive: item.IsActive
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
    
    if (this.activeSubTab === 'Market System') {
      body.IsActive = this.formData.IsActive ? 1 : 0;
    }

    const url = environment.BasePath + route + '/Save';
    this.http.post(url, body, this.getAuthHeaders()).subscribe(
      (res: any) => {
        this.isSaving = false;

        // Extract the actual database row from the auto-response wrapper
        let spData = res.data ? (Array.isArray(res.data) ? res.data[0] : res.data) : (Array.isArray(res) ? res[0] : res);
        
        // Check if the Stored Procedure returned ID 0 (which means duplicate)
        if (spData && (spData.Market_System_Id_ === 0 || spData.Id === 0 || (spData.Message && spData.Message.includes('already exists')))) {
          this.errorMessage = spData.Message || 'Name already exists';
          this.isErrorModalOpen = true;
          return;
        }

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
    const nameField = this.getNameField(this.activeSubTab);
    this.itemToDelete = item;
    this.itemToDeleteName = item[nameField] || item.name || 'this item';
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.itemToDelete = null;
    this.itemToDeleteName = '';
    this.isDeleting = false;
  }

  closeErrorModal() {
    this.isErrorModalOpen = false;
    this.errorMessage = '';
  }

  confirmDelete() {
    if (!this.itemToDelete) return;
    
    this.isDeleting = true;
    const pk = this.getPrimaryKeyField(this.activeSubTab);
    const id = this.itemToDelete[pk] || this.itemToDelete.id;
    
    const route = this.getRoutePathForSubTab(this.activeSubTab);
    const url = environment.BasePath + route + '/Delete/' + id;
    
    this.http.get(url, this.getAuthHeaders()).subscribe(
      (res: any) => {
        this.isDeleting = false;
        this.closeDeleteModal();
        this.Load_Data();
      },
      (error) => {
        this.isDeleting = false;
        console.error('Error deleting item:', error);
        alert('Error deleting record');
      }
    );
  }

  onSubItems(item: any) {
    const pk = this.getPrimaryKeyField(this.activeSubTab);
    const id = item[pk] || item.id;
    const nameField = this.getNameField(this.activeSubTab);
    const name = item[nameField] || item.name;
    this.router.navigate(['/Lead_Config/Market_Study/MarketSystem', id, 'Fields'], { queryParams: { categoryName: name } });
  }

  selectSection(section: string) {
    if (this.expandedSection === section) {
      this.expandedSection = '';
    } else {
      this.expandedSection = section;
    }

    if (this.activeSection !== section) {
      this.activeSection = section;
      sessionStorage.setItem('leadConfigSection', section);
      
      if (this.subTabs[section] && this.subTabs[section].length > 0) {
        this.selectSubTab(this.subTabs[section][0]);
      } else {
        this.activeSubTab = '';
        sessionStorage.removeItem('leadConfigSubTab');
        this.Dropdown_Data = [];
      }
    }
  }

  hasDescription(tab: string): boolean {
    const tabsWithDesc = ['Vertical', 'Company Size', 'Source', 'Designation', 'Department'];
    return tabsWithDesc.includes(tab);
  }

  selectSubTab(tab: string) {
    this.activeSubTab = tab;
    sessionStorage.setItem('leadConfigSubTab', tab);
    
    if (tab === 'Market System') {
      this.columns = [
        { key: 'name', label: 'Name' },
        { key: 'IsActive', label: 'Status' }
      ];
    } else if (this.hasDescription(tab)) {
      this.columns = [
        { key: 'name', label: 'Name' },
        { key: 'Description', label: 'Description' }
      ];
    } else {
      this.columns = [
        { key: 'name', label: 'Name' }
      ];
    }
    
    this.Load_Data();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
