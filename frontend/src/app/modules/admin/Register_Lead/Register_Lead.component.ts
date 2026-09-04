import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { Lead_Service } from '../../../services/Lead.Service';
import { Lead } from '../../../models/Lead';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { User_Details_Service } from '../../../services/User_Details.Service';
import { Requirement_Master_Service } from '../../../services/Requirement_Master.Service';
import { Company_Size_Service } from '../../../services/Company_Size.Service';
import { Vertical_Service } from '../../../services/Vertical.Service';
import { Custom_Field_Service } from '../../../services/Custom_Field.Service';
import { Lead_Custom_Value_Service } from '../../../services/Lead_Custom_Value.Service';
import { Master_Refresh_Service } from '../../../services/Master_Refresh.Service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-Register_Lead',
  templateUrl: './Register_Lead.component.html',
  styleUrls: ['./Register_Lead.component.css']
})
export class Register_LeadComponent implements OnInit {
  companyNameSubject: Subject<string> = new Subject<string>();
  Expanded_Sections: { [key: string]: boolean } = {
    'Company Details': true,
    'Decision Makers & Contacts': true,
    'Requirement Profile': true,
    'Market Study': true,
    'Lead Priority': true,
    'Pipeline Stage & Pulse': true,
    'Assignment': true,
    'Follow-up Automation': true,
    'Interaction History': true
  };

  Toggle_Section(section: string) {
    this.Expanded_Sections[section] = !this.Expanded_Sections[section];
  }

  get Are_All_Expanded(): boolean {
    return Object.values(this.Expanded_Sections).every(val => val === true);
  }

  Toggle_All_Sections() {
    const expand = !this.Are_All_Expanded;
    for (let key in this.Expanded_Sections) {
      this.Expanded_Sections[key] = expand;
    }
  }

  Lead_: Lead = new Lead();
  Lead_Data: Lead[] = [];
  Filtered_Lead_Data: Lead[] = [];
  Paged_Lead_Data: Lead[] = [];
  Entry_View: boolean = false;
  issLoading: boolean = false;
  contactForm: FormGroup;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;


  Department_Data: any[] = [];
  Status_Data: any[] = [];
  Source_Data: any[] = [];
  Vertical_Data: any[] = [];
  Designation_Data: any[] = [];
  State_Data: any[] = [];
  District_Data: any[] = [];
  Location_Data: any[] = [];
  Staff_Data: any[] = [];
  Filtered_Staff_Data: any[] = [];
  FollowUp_History: any[] = [];
  Activity_Log: any[] = [];
  Meeting_Data: any[] = [];
  Quote_Tracking_Data: any[] = [];
  Meeting_Input: any = {};
  Quote_Tracking_Input: any = {};
  Show_Meeting_Form: boolean = false;
  Show_Quote_Form: boolean = false;
  Selected_Meeting_Type: string = 'OFFLINE';
  Company_Size_Data: any[] = [];
  Filtered_Department_Data: any[] = [];
  readonly Raw_Lead_Stage_Name: string = 'RAW Lead';
  readonly Lost_Stage_Name: string = 'Lost';

  Selected_Lead_Type: string = 'All';

  Available_Priorities: string[] = [];
  Requirement_Note: string = '';
  
  Available_Interests: string[] = [];
  Selected_Interest: string = '';
  Added_Interests: string[] = [];
  Interest_Already_Exists: boolean = false;
  Clear_Interests_Popup_Open: boolean = false;

  Available_Market_Systems: any[] = [];
  Added_Market_Systems: any[] = [];

  Available_Pipeline_Stages: string[] = [];
  Selected_Pipeline_Stage: string = '';
  
  Available_Pulses: string[] = [];
  Selected_Pulse: string = '';

  Available_Target_Stages: string[] = [];


  Selected_Workflow: string = '';
  Show_History: boolean = false;
  Show_Pipeline_History: boolean = false;
  History_Loaded: boolean = false;
  History_Page_Index: number = 1;
  History_Loading: boolean = false;
  History_Has_More: boolean = true;
  Remark_Popup_Open: boolean = false;
  Remark_Popup_Text: string = '';

  Toggle_Workflow_Start() {
    if (this.Selected_Workflow) {
      (this.Lead_ as any).Workflow_Start_Status = (this.Lead_ as any).Workflow_Start_Status ? 0 : 1;
    }
  }

  Toggle_History() {
    this.Show_History = !this.Show_History;
    if (this.Show_History && this.Lead_.Lead_Id) {
      // Caching: don't load again if already loaded
      if (this.History_Loaded) {
        return;
      }
      this.History_Loaded = true;
      this.FollowUp_History = []; // Clear old pre-loaded data
      this.History_Page_Index = 1;
      this.History_Has_More = true;
      this.Load_History_Page();
    }
  }

  Load_History_Page() {
    if (this.History_Loading || !this.History_Has_More) return;
    this.History_Loading = true;
    this.Lead_Service_.Get_Lead_Interaction_History(this.Lead_.Lead_Id, this.History_Page_Index, 10).subscribe(
      (data: any) => {
        this.History_Loading = false;
        let newRecords = [];
        if (data && data.length > 0 && Array.isArray(data[0])) {
          newRecords = data[0];
        } else if (Array.isArray(data)) {
          newRecords = data;
        }

        if (this.History_Page_Index === 1) {
          this.FollowUp_History = newRecords;
        } else {
          this.FollowUp_History = [...this.FollowUp_History, ...newRecords];
        }

        if (newRecords.length < 10) {
          this.History_Has_More = false;
        }
      },
      (error: any) => {
        this.History_Loading = false;
        console.error("Error fetching interaction history", error);
      }
    );
  }

  On_History_Scroll(event: any) {
    const target = event.target;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
      if (!this.History_Loading && this.History_Has_More) {
        this.History_Page_Index++;
        this.Load_History_Page();
      }
    }
  }

  Open_Remark_Popup(remark: string) {
    if (remark && remark.length > 10) {
      this.Remark_Popup_Open = true;
      this.Remark_Popup_Text = remark;
    }
  }

  Add_Market_System(sys: any) {
    let newSys = JSON.parse(JSON.stringify(sys)); // Deep clone so duplicates have independent fields
    
    if (!newSys.fields) {
      this.Lead_Service_.Search_Lead_Dropdowns('MarketStudyFields', '', 1, newSys.id).subscribe(Rows => {
        const data = Array.isArray(Rows) ? Rows : (Rows && Rows.data ? Rows.data : []);
        newSys.fields = data;
        this.Added_Market_Systems.push(newSys);
        // Cache on the original so next time it's instant
        sys.fields = JSON.parse(JSON.stringify(data));
      });
    } else {
      this.Added_Market_Systems.push(newSys);
    }
  }

  Remove_Market_System(index: number) {
    this.Added_Market_Systems.splice(index, 1);
  }

  isSystemAdded(sys: any): boolean {
    return this.Added_Market_Systems.some(a => a.id === sys.id);
  }

  Clear_All_Interests() {
    this.Added_Interests = [];
    this.Interest_Already_Exists = false;
    this.Clear_Interests_Popup_Open = false;
  }

  Add_Interest() {
    if (this.Selected_Interest) {
      if (this.Added_Interests.includes(this.Selected_Interest)) {
        this.Interest_Already_Exists = true;
      } else {
        this.Added_Interests.push(this.Selected_Interest);
        this.Selected_Interest = '';
        this.Interest_Already_Exists = false;
      }
    }
  }

  Remove_Interest(index: number) {
    this.Added_Interests.splice(index, 1);
  }

  // Custom Fields popup
  CF_Popup_Open: boolean = false;
  CF_Popup_Loading: boolean = false;
  CF_Popup_Lead: any = null;
  CF_Popup_Values: any = {};
  Lost_Reason_Data: string[] = [
    'Price Too High',
    'Competitor Offered Better Price',
    'Took Quote for Price Comparison',
    'Budget Issue',
    'No Budget Approval',
    'Chose Competitor',
    'Existing Vendor Continued',
    'Solution Mismatch',
    'Feature Missing',
    'Integration Not Possible',
    'Technical Issue',
    'Poor Call Quality Concern',
    'Support Concern',
    'SLA Concern',
    'Implementation Delay',
    'Timeline Issue',
    'Requirement Cancelled',
    'Project On Hold',
    'No Response from Customer',
    'Not Interested',
    'Decision Delayed',
    'Decision Maker Changed',
    'Management Rejected',
    'Internal Discussion Pending',
    'Existing Contract Active'
  ];
  Lost_Primary_Issue_Data: string[] = [
    'Price',
    'Solution',
    'Support',
    'Timeline'
  ];
  Lead_List_Columns: any[] = [
    { key: 'SL', label: 'SL', visible: true },
    { key: 'Name', label: 'Name', visible: true },
    { key: 'Address', label: 'Address', visible: true },
    { key: 'Contact', label: 'Contact', visible: true },
    { key: 'Enquiry_for', label: 'Enquiry for', visible: true },
    { key: 'Status', label: 'Status', visible: true },
    { key: 'Remark', label: 'Remark', visible: true },
    { key: 'Action', label: 'Action', visible: true }
  ];
  Column_Customizer_Open: boolean = false;
  private Lead_Column_Prefs_Key: string = 'Lead_List_Column_Preferences';
  Search_Text: string = '';
  Lead_Filter: any = {
    Industry: 0,
    Stage: 0,
    Priority: '',
    Date: '',
    Assigned_Staff: 0,
    District: 0,
    State: 0
  };
  Query_Status: string = null;
  Query_Assigned: string = null;
  Query_Followup: string = null;
  Page_Index: number = 1;
  Page_Size: number = 10;
  Page_Size_Options: number[] = [10, 25, 50, 100];
  Total_Pages: number = 1;

  Selected_Vertical: number = 0;
  Dynamic_Field_Values: any = {};
  Selected_Enquiry_For: number[] = [];
  Custom_Field_Data: any[] = [];
  Enquiry_For_Data: any[] = [];
  Filtered_Company_Names: string[] = [];

  Reprocess_Drawer_Visible: boolean = false;
  Requirement_Details_Input: string = '';
  Is_View_Mode: boolean = false;

  // Dropdown state tracking
  DropdownOriginalData: { [key: string]: any[] } = {};
  DropdownOriginalPage: { [key: string]: number } = {};
  DropdownOriginalEnd: { [key: string]: boolean } = {};
  DropdownData: { [key: string]: any[] } = {};
  DropdownPage: { [key: string]: number } = {};
  DropdownSearch: { [key: string]: string } = {};
  DropdownLoading: { [key: string]: boolean } = {};
  DropdownEnd: { [key: string]: boolean } = {};

  PreselectedDistrictNames: { [id: number]: string } = {};

  constructor(
    public Lead_Service_: Lead_Service,
    public User_Details_Service_: User_Details_Service,
    public Requirement_Master_Service_: Requirement_Master_Service,
    public Company_Size_Service_: Company_Size_Service,
    public Vertical_Service_: Vertical_Service,
    public Custom_Field_Service_: Custom_Field_Service,
    public Lead_Custom_Value_Service_: Lead_Custom_Value_Service,
    public dialogBox: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private Master_Refresh_Service_: Master_Refresh_Service,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) { 
    this.Initialize_Contact_Form();
  }

  ngOnInit() {
    this.companyNameSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      if (!value || value.length < 2) {
        this.Filtered_Company_Names = [];
        return;
      }
      this.Lead_Service_.Search_Company_Name(value).subscribe(names => {
        this.Filtered_Company_Names = names || [];
      }, err => {
        console.error('Error fetching company names:', err);
        this.Filtered_Company_Names = [];
      });
    });

    this.Is_View_Mode = this.route.snapshot.url.some(segment => segment.path === 'View');
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.Load_Column_Preferences();
      this.issLoading = true;
      this.Lead_Service_.Get_NewLeadByID(id).subscribe(data => {
        this.issLoading = false;
        if (data && data.length > 0 && data[0].length > 0) {
           let leadData = data[0][0];
           if (data[1] && Array.isArray(data[1])) {
             // Sort so that Is_Primary == 1 is first
             const sortedContacts = data[1].sort((a: any, b: any) => {
               if (a.Is_Primary == 1 && b.Is_Primary != 1) return -1;
               if (b.Is_Primary == 1 && a.Is_Primary != 1) return 1;
               return 0;
             });
             leadData.Contact_Person_Details = sortedContacts.map((c: any) => ({
                POC_Full_Name: c.Full_Name,
                POC_Designation_Id: c.Designation_Id,
                Designation_Name: c.Designation_Name, // Keep name for dropdown init
                POC_Direct_Mobile: c.Direct_Mobile,
                POC_Email: c.Email_Address,
                POC_Work_Phone: c.Work_Phone,
                POC_State_Id: c.State_Id,
                State_Name: c.State_Name, // Keep name for dropdown init
                POC_Location_Id: c.Sitting_Location_Id,
                Location_Name: c.Sitting_Location, // Keep name for dropdown init
                POC_Office_Type: c.Office_Type,
                Name_Captured: c.Name_Captured,
                Number_Captured: c.Number_Captured,
                Email_Captured: c.Email_Captured,
                Next_Call_Action: false
             }));
           }
           this.FollowUp_History = (data[2] && Array.isArray(data[2])) ? data[2] : [];
           if (data[3] && Array.isArray(data[3])) {
             leadData.Market_Study_Fields_Data = data[3];
           }
           this.Edit_Lead(leadData);
        } else {

           this.snackBar.open("Record Not Found", "Close", { duration: 3000 });
           this.router.navigate(['/LeadDashboard']);
        }
      }, err => {
         this.issLoading = false;
         this.snackBar.open("Error fetching lead", "Close", { duration: 3000 });
      });
    } else {
      // Add one default contact row for new leads
      this.addContact();
    }

    this.route.queryParams.subscribe(params => {
      this.Query_Status = params['status'] || null;
      this.Query_Assigned = params['assigned'] || null;
      this.Query_Followup = params['followup'] || null;
      if (this.Lead_Data && this.Lead_Data.length > 0) {
        this.Apply_Lead_Filters();
      }
    });

    // Subscribe to master data updates
    this.Master_Refresh_Service_.masterUpdated$.subscribe(masterName => {
      // Get_Dropdowns_Lead removed per request
    });

    this.Entry_View = true;

    if (!id) {
      ['Vertical', 'State', 'CompanySize', 'Source', 'Designation', 'ServiceInterest', 'LeadPriority', 'PipelineStage', 'Pulse', 'TargetStage'].forEach(type => {
        this.DropdownPage[type] = 1;
        this.DropdownSearch[type] = '';
        this.DropdownEnd[type] = false;
        this.loadDropdownData(type);
      });
    }

    // Universally fetch Market Study Categories (for both create and edit)
    this.Lead_Service_.Search_Lead_Dropdowns('MarketStudyCategory', '', 1, 0).subscribe(Rows => {
      const data = Array.isArray(Rows) ? Rows : (Rows && Rows.data ? Rows.data : []);
      this.Available_Market_Systems = data; // Keep full object {id, name}
    });

  }
  
  onStateSelected(stateItem: any) {
    if (stateItem && stateItem.id) {
      this.loadDropdownData('District', false, stateItem.id);
    }
  }
  
  getDistrictData(stateId: number): any[] {
    if (!stateId) return [];
    const data = this.DropdownData[`District_${stateId}`] || [];
    // console.log(`getDistrictData called for state ${stateId}, returning array of length:`, data.length, data);
    return data;
  }

  loadDropdownData(type: string, append: boolean = false, filterId: number = 0) {
    const cacheKey = ((type === 'District' || type === 'Department' || type === 'Staff') && filterId) ? `${type}_${filterId}` : type;
    
    if (this.DropdownLoading[cacheKey]) return;
    if (append && this.DropdownEnd[cacheKey]) return;
    
    const search = this.DropdownSearch[cacheKey] || '';
    
    // Check if we already have the initial data cached
    if (!append && search === '' && this.DropdownOriginalData[cacheKey]) {
      this.DropdownData[cacheKey] = [...this.DropdownOriginalData[cacheKey]];
      return;
    }

    this.DropdownLoading[cacheKey] = true;
    const page = this.DropdownPage[cacheKey] || 1;
    
    this.Lead_Service_.Search_Lead_Dropdowns(type, search, page, filterId).subscribe(Rows => {
      this.DropdownLoading[cacheKey] = false;
      const data = Array.isArray(Rows) ? Rows : [];
      if (data.length < 20) {
        this.DropdownEnd[cacheKey] = true;
      }
      if (append) {
        this.DropdownData[cacheKey] = [...(this.DropdownData[cacheKey] || []), ...data];
        if (search === '') {
          this.DropdownOriginalData[cacheKey] = [...this.DropdownData[cacheKey]];
          this.DropdownOriginalPage[cacheKey] = this.DropdownPage[cacheKey] || 1;
          this.DropdownOriginalEnd[cacheKey] = this.DropdownEnd[cacheKey] || false;
        }
      } else {
        this.DropdownData[cacheKey] = data;
        if (search === '') {
          this.DropdownOriginalData[cacheKey] = [...data];
          this.DropdownOriginalPage[cacheKey] = this.DropdownPage[cacheKey] || 1;
          this.DropdownOriginalEnd[cacheKey] = this.DropdownEnd[cacheKey] || false;
        }
      }
    }, err => {
      console.error(`Error loading dropdown for ${type}`, err);
      this.DropdownLoading[cacheKey] = false;
    });
  }

  onSearchDropdown(type: string, searchText: string, filterId: number = 0) {
    const cacheKey = ((type === 'District' || type === 'Department' || type === 'Staff') && filterId) ? `${type}_${filterId}` : type;
    
    this.DropdownSearch[cacheKey] = searchText;
    this.DropdownEnd[cacheKey] = false;

    if (searchText === '' && this.DropdownOriginalData[cacheKey]) {
      this.DropdownData[cacheKey] = [...this.DropdownOriginalData[cacheKey]];
      this.DropdownPage[cacheKey] = this.DropdownOriginalPage[cacheKey] || 1;
      this.DropdownEnd[cacheKey] = this.DropdownOriginalEnd[cacheKey] || false;
      return;
    }

    this.DropdownPage[cacheKey] = 1;

    this.loadDropdownData(type, false, filterId);
  }

  onLoadMoreDropdown(type: string, filterId: number = 0) {
    const cacheKey = ((type === 'District' || type === 'Department' || type === 'Staff') && filterId) ? `${type}_${filterId}` : type;
    if (this.DropdownLoading[cacheKey] || this.DropdownEnd[cacheKey]) return;
    this.DropdownPage[cacheKey] = (this.DropdownPage[cacheKey] || 1) + 1;
    this.loadDropdownData(type, true, filterId);
  }

  onCompanyNameChange(value: string) {
    this.companyNameSubject.next(value);
  }

  Get_Custom_Fields() {
    this.Custom_Field_Service_.Search_Custom_Field('Enquiry_For').subscribe(Rows => {
      this.Custom_Field_Data = (Rows && Rows[0]) ? Rows[0] : [];
    });
  }

  getCustomFieldName(id: number): string {
    if (!this.Custom_Field_Data || !this.Custom_Field_Data.length) return '';
    const field = this.Custom_Field_Data.find(f => f.Custom_Field_Id == id);
    return field ? field.Field_Name : '';
  }

  getCustomFieldNamesString(idsString: string): string {
    if (!idsString) return '';
    const ids = idsString.toString().split(',');
    const names = ids.map(id => this.getCustomFieldName(Number(id))).filter(n => n);
    return names.join(', ');
  }

  getCFIcon(type: string): string {
    const map = { 'Text': 'text_fields', 'Number': 'pin', 'Date': 'event', 'Dropdown': 'arrow_drop_down_circle', 'Checkbox': 'check_box', 'Radio': 'radio_button_checked', 'File Upload': 'attach_file' };
    return map[type] || 'extension';
  }

  Open_Custom_Fields_Popup(lead: any) {
    this.CF_Popup_Lead = lead;
    this.CF_Popup_Values = {};
    this.CF_Popup_Open = true;
    this.CF_Popup_Loading = true;
    this.Lead_Custom_Value_Service_.Get_Lead_Custom_Values(lead.Lead_Id).subscribe({
      next: (Rows) => {
        const values = (Rows && Rows[0]) ? Rows[0] : [];
        values.forEach(val => { this.CF_Popup_Values[val.Custom_Field_Id] = val.Field_Value; });
        this.CF_Popup_Loading = false;
      },
      error: () => { this.CF_Popup_Loading = false; }
    });
  }

  ParseFieldList(fieldList: string): string[] {
      if (!fieldList || String(fieldList).trim() === '') return [];
      return String(fieldList).split(',').map(s => s.trim()).filter(s => s);
  }

  isCheckboxChecked(fieldId: number, option: string): boolean {
    const val = this.Dynamic_Field_Values[fieldId];
    if (!val) return false;
    const parts = String(val).split(',').map(s => s.trim());
    return parts.includes(option);
  }

  toggleCheckbox(fieldId: number, option: string, checked: boolean) {
    const val = this.Dynamic_Field_Values[fieldId] || '';
    let parts = val ? String(val).split(',').map(s => s.trim()).filter(s => s) : [];
    if (checked) {
      if (!parts.includes(option)) parts.push(option);
    } else {
      parts = parts.filter(p => p !== option);
    }
    this.Dynamic_Field_Values[fieldId] = parts.join(', ');
  }

  onDynamicFileUpload(event: Event, customFieldId: number) {
      const file = (event.target as HTMLInputElement).files[0];
      if (file) {
          if (file.size > 5 * 1024 * 1024) {
              this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'File size exceeds 5 MB. Please select a smaller file.', Type: "3" } });
              return;
          }
          this.issLoading = true;
          this.Lead_Custom_Value_Service_.uploadFile(file).then(res => {
              this.Dynamic_Field_Values[customFieldId] = res['Location'] || '';
              this.issLoading = false;
              this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'File Uploaded Successfully', Type: "false" } });
          }).catch(err => {
              this.issLoading = false;
              this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'File upload failed.', Type: "3" } });
          });
      }
  }

  Location_Change() {
    if (this.Lead_.FollowUp_Location_Id && this.Lead_.FollowUp_Location_Id != 0) {
      this.Filtered_Department_Data = this.Department_Data.filter(d => d.Branch_Id == this.Lead_.FollowUp_Location_Id);
    } else {
      this.Filtered_Department_Data = [...this.Department_Data];
    }
    const validDept = this.Filtered_Department_Data.find(d => d.Department_Id == this.Lead_.FollowUp_Department_Id);
    if (!validDept) {
      this.Lead_.FollowUp_Department_Id = 0;
    }
    this.Filter_Staff();
  }

  Department_Change() {
    this.Filter_Staff();
  }

  Filter_Staff() {
    let staff = [...(this.Staff_Data || [])];
    if (this.Lead_.FollowUp_Location_Id && this.Lead_.FollowUp_Location_Id != 0) {
      staff = staff.filter(s => s.Branch_Id == this.Lead_.FollowUp_Location_Id);
    }
    if (this.Lead_.FollowUp_Department_Id && this.Lead_.FollowUp_Department_Id != 0) {
      staff = staff.filter(s => s.Department_Id == this.Lead_.FollowUp_Department_Id);
    }
    this.Filtered_Staff_Data = staff;

    const validStaff = this.Filtered_Staff_Data.find(s => s.User_Details_Id == this.Lead_.FollowUp_Staff_Id);
    if (!validStaff) {
      this.Lead_.FollowUp_Staff_Id = 0;
    }
  }

  private normalizeRows(response: any): any[] {
    const rows = response && response.success !== undefined ? response.data : response;
    if (Array.isArray(rows) && rows.length > 0 && Array.isArray(rows[0])) return rows[0];
    if (Array.isArray(rows)) return rows;
    return [];
  }

  Get_Industries() {
    this.Vertical_Service_.Get_All_Industries().subscribe(Rows => {
      this.Vertical_Data = this.normalizeRows(Rows);
      this.Apply_Lead_Filters();
    }, err => {
      console.error('Error loading Industries:', err);
    });
  }

  Get_Leads() {
    this.issLoading = true;
    this.Lead_Service_.Get_Leads().subscribe(Rows => {
      const leadRows =
        (Rows && Array.isArray(Rows) && Rows.length > 0 && Array.isArray(Rows[0])) ? Rows[0]
        : (Array.isArray(Rows) ? Rows : []);

      if (Array.isArray(leadRows)) {
        this.Lead_Data = leadRows as any;
        this.Lead_Data.forEach(element => {
          element.Is_FollowUp = (element.Is_FollowUp as any) == 1 ? true : false;
          if (!(element as any).Contact_Number && (element as any).Contact_No) {
            (element as any).Contact_Number = (element as any).Contact_No;
          }
        });
        this.Map_Staff_Names();
        this.Apply_Lead_Filters();
      } else {
        this.Filtered_Lead_Data = this.Lead_Data;
        this.Apply_Lead_Filters();
      }
      this.issLoading = false;
    }, err => {
      this.Lead_Data = [];
      this.issLoading = false;
    });
  }

  Get_Dropdowns_Lead() {
      this.Lead_Service_.Get_Dropdowns_Lead().subscribe(Rows => {
        if (Rows != null) {
          this.Department_Data = Array.isArray(Rows[0]) ? Rows[0] : [];
          this.Filtered_Department_Data = [...this.Department_Data];
          this.Status_Data = Array.isArray(Rows[1]) ? Rows[1] : [];
        this.Source_Data = Array.isArray(Rows[2]) ? Rows[2] : [];
        this.Vertical_Data = Array.isArray(Rows[3]) ? Rows[3] : [];
        this.Designation_Data = Array.isArray(Rows[4]) ? Rows[4] : [];
        this.State_Data = Array.isArray(Rows[5]) ? Rows[5] : [];
        this.District_Data = Array.isArray(Rows[6]) ? Rows[6] : [];
        this.Location_Data = Array.isArray(Rows[7]) ? Rows[7] : [];
        if (Array.isArray(Rows[8]) && Rows[8].length > 0) {
          this.Staff_Data = Rows[8];
        }
        this.Set_Default_Raw_Lead_Stage();
        this.Get_Industries();
        this.User_Details_Service_.Search_User_Details('', 1, 1).subscribe(StaffRows => {
          if (StaffRows != null) {
            this.Staff_Data = Array.isArray(StaffRows[0]) ? StaffRows[0] : (Array.isArray(StaffRows) ? StaffRows : []);
            this.Filter_Staff();
            this.Map_Staff_Names();
          }
        });
      }
    });
  }

  Map_Staff_Names() {
    if (this.Lead_Data && this.Lead_Data.length > 0 && this.Staff_Data && this.Staff_Data.length > 0) {
      this.Lead_Data.forEach(element => {
        if (element.Staff_Id > 0) {
          const staff = this.Staff_Data.find(s => s.User_Details_Id == element.Staff_Id);
          if (staff) element.Staff_Name = staff.User_Details_Name;
        }
      });
    }
  }

  Apply_Lead_Filters() {
    const filters = this.Lead_Filter;
    const searchText = (this.Search_Text || '').toLowerCase();

    this.Filtered_Lead_Data = (this.Lead_Data || []).filter((lead: any) => {
      const entryDate = lead.Entry_Date ? this.New_Date(new Date(lead.Entry_Date)) : '';
      const industry = this.Vertical_Data.find(v => Number(v.Vertical_Id) === Number(filters.Industry));
      
      const searchMatch = !searchText || 
        (lead.Lead_Name || '').toLowerCase().includes(searchText) ||
        (lead.POC_Full_Name || '').toLowerCase().includes(searchText) ||
        (lead.Contact_Number || lead.Phone || '').toLowerCase().includes(searchText) ||
        (lead.Address || '').toLowerCase().includes(searchText) ||
        (lead.Status_Name || '').toLowerCase().includes(searchText) ||
        (lead.Lead_Id || '').toString().includes(searchText);

      let statusMatch = true;
      if (this.Query_Status) {
        const sName = (lead.Status_Name || '').toLowerCase();
        const qStatus = this.Query_Status.toLowerCase();
        if (qStatus === 'in progress') {
          statusMatch = !sName.includes('new') && !sName.includes('lost') && !sName.includes('close') && !sName.includes('reject');
        } else if (qStatus === 'converted') {
          statusMatch = sName.includes('won') || sName.includes('converted');
        } else {
          statusMatch = sName.includes(qStatus);
        }
      }

      let assignedMatch = true;
      if (this.Query_Assigned === 'true') assignedMatch = lead.Staff_Id > 0;
      if (this.Query_Assigned === 'false') assignedMatch = !lead.Staff_Id || lead.Staff_Id == 0;

      let followupMatch = true;
      if (this.Query_Followup) {
         if (this.Query_Followup === 'Today') {
            followupMatch = lead.Next_FollowUp_Date && (new Date(lead.Next_FollowUp_Date).setHours(0,0,0,0) === new Date().setHours(0,0,0,0));
         } else if (this.Query_Followup === 'Pending') {
            followupMatch = lead.Next_FollowUp_Date && (new Date(lead.Next_FollowUp_Date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0));
         }
      }

      let typeMatch = true;
      if (this.Selected_Lead_Type && this.Selected_Lead_Type !== 'All') {
        const typeL = this.Selected_Lead_Type.toLowerCase();
        const statusStr = (lead.Status_Name || '').toLowerCase();
        const priorityStr = (lead.Lead_Priority || '').toLowerCase();
        typeMatch = statusStr.includes(typeL) || priorityStr.includes(typeL);
      }

      return searchMatch
        && statusMatch
        && assignedMatch
        && followupMatch
        && typeMatch
        && (!filters.Industry || Number(lead.Vertical) === Number(filters.Industry) || Number(lead.Vertical_Id) === Number(filters.Industry) || (industry && lead.Vertical_Name === industry.Vertical_Name))
        && (!filters.Designation || Number(lead.Designation) === Number(filters.Designation))
        && (!filters.Stage || Number(lead.Status_Id) === Number(filters.Stage))
        && (!filters.District || Number(lead.District) === Number(filters.District))
        && (!filters.Priority || lead.Lead_Priority === filters.Priority)
        && (!filters.Date || entryDate === filters.Date);
    });
    this.Page_Index = 1;
    this.Update_Paged_Leads();
  }

  Clear_Lead_Filters() {
    this.Lead_Filter = { Industry: 0, Stage: 0, Priority: '', Date: '', Assigned_Staff: 0, District: 0, State: 0 };
    this.Apply_Lead_Filters();
  }

  Update_Paged_Leads() {
    this.Total_Pages = Math.max(1, Math.ceil((this.Filtered_Lead_Data || []).length / this.Page_Size));
    if (this.Page_Index > this.Total_Pages) this.Page_Index = this.Total_Pages;
    const start = (this.Page_Index - 1) * this.Page_Size;
    this.Paged_Lead_Data = (this.Filtered_Lead_Data || []).slice(start, start + this.Page_Size);
  }

  Change_Page(delta: number) {
    const nextPage = this.Page_Index + delta;
    if (nextPage < 1 || nextPage > this.Total_Pages) return;
    this.Page_Index = nextPage;
    this.Update_Paged_Leads();
  }

  Change_Page_Size() {
    this.Page_Index = 1;
    this.Update_Paged_Leads();
  }

  Get_Export_Rows() {
    return (this.Filtered_Lead_Data || []).map((lead: any) => ({
      'Company Name': lead.Lead_Name || '',
      'Contact Person': lead.POC_Full_Name || '',
      'Number': lead.Contact_Number || lead.Phone || '',
      'Industry': lead.Vertical_Name || '',
      'Lead Stage': lead.Status_Name || '',
      'Priority': lead.Lead_Priority || '',
      'Last Follow-up': lead.Last_FollowUp_Date ? this.New_Date(new Date(lead.Last_FollowUp_Date)) : '',
      'Next Follow-up': lead.Next_FollowUp_Date ? this.New_Date(new Date(lead.Next_FollowUp_Date)) : '',
      'Created Date': lead.Entry_Date ? this.New_Date(new Date(lead.Entry_Date)) : '',
      'Assigned Staff': lead.Staff_Name || '',
      'Remarks': lead.Remark || ''
    }));
  }

  Download_Text_File(filename: string, content: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }

  Export_CSV() {
    const rows = this.Get_Export_Rows();
    if (rows.length === 0) return;
    const headers = Object.keys(rows[0]);
    const escapeCell = (value) => '"' + String(value === undefined || value === null ? '' : value).replace(/"/g, '""') + '"';
    const csv = [headers.map(escapeCell).join(',')]
      .concat(rows.map(row => headers.map(header => escapeCell(row[header])).join(',')))
      .join('\r\n');
    this.Download_Text_File('lead-list.csv', csv, 'text/csv;charset=utf-8;');
  }

  Export_Excel() {
    const rows = this.Get_Export_Rows();
    if (rows.length === 0) return;
    const headers = Object.keys(rows[0]);
    const html = '<table><thead><tr>' + headers.map(h => '<th>' + h + '</th>').join('') +
      '</tr></thead><tbody>' + rows.map(row => '<tr>' + headers.map(h => '<td>' + String(row[h] || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</td>').join('') + '</tr>').join('') +
      '</tbody></table>';
    this.Download_Text_File('lead-list.xls', html, 'application/vnd.ms-excel;charset=utf-8;');
  }

  Load_Column_Preferences() {
    const saved = localStorage.getItem(this.Lead_Column_Prefs_Key);
    if (!saved) return;
    try {
      const preferences = JSON.parse(saved);
      this.Lead_List_Columns.forEach(column => {
        if (preferences[column.key] !== undefined) column.visible = preferences[column.key];
      });
    } catch (e) { }
  }

  Save_Column_Preferences() {
    const preferences = {};
    this.Lead_List_Columns.forEach(column => preferences[column.key] = column.visible);
    localStorage.setItem(this.Lead_Column_Prefs_Key, JSON.stringify(preferences));
    this.Column_Customizer_Open = false;
  }

  Reset_Column_Preferences() {
    this.Lead_List_Columns.forEach(column => column.visible = true);
    localStorage.removeItem(this.Lead_Column_Prefs_Key);
  }

  Is_Column_Visible(key: string): boolean {
    const column = this.Lead_List_Columns.find(c => c.key === key);
    return column ? column.visible : true;
  }

  Set_Default_Raw_Lead_Stage() {
    if (!this.Lead_ || this.Lead_.Status_Id > 0 || !this.Status_Data || this.Status_Data.length === 0) return;
    const rawStage = this.Status_Data.find(s => s.Status_Name === this.Raw_Lead_Stage_Name);
    if (rawStage) {
      this.Lead_.Status_Id = rawStage.Status_Id;
      this.Lead_.Status_Name = rawStage.Status_Name;
      this.Lead_.FollowUp_Status_Id = rawStage.Status_Id;
    }
  }

  New_Date(Date_) {
    let date = new Date(Date_);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  Create_New() {
    this.Entry_View = true;
    this.Lead_ = new Lead();
    this.Set_Default_Raw_Lead_Stage();
    this.Selected_Vertical = 0;
    this.Selected_Enquiry_For = [];
    this.Enquiry_For_Data = [];
    if (this.State_Data && this.State_Data.length > 0) {
      const kerala = this.State_Data.find(s => s.State_Name && s.State_Name.toLowerCase() === 'kerala');
      if (kerala) this.Lead_.State = kerala.State_Id;
    }
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    this.Lead_.FollowUp_Date = now.toISOString().slice(0, 16);
    this.FollowUp_History = [];
    this.Activity_Log = [];
    this.Meeting_Data = [];
    this.Quote_Tracking_Data = [];
    this.Selected_Pipeline_Stage = '';
    this.Selected_Pulse = '';
    this.Initialize_Contact_Form();
    this.addContact();
    
    ['State', 'District', 'Vertical', 'CompanySize', 'Source', 'Designation'].forEach(type => {
      this.DropdownPage[type] = 1;
      this.DropdownSearch[type] = '';
      this.loadDropdownData(type);
    });
  }

  Initialize_Contact_Form() {
    this.contactForm = this.fb.group({
      contactPersons: this.fb.array([])
    });
  }

  get contactPersons(): FormArray {
    return this.contactForm.get('contactPersons') as FormArray;
  }

  createContactRow(contact?: any): FormGroup {
    const stateId = contact ? contact.POC_State_Id : 0;
    const group = this.fb.group({
      POC_Full_Name: [contact ? contact.POC_Full_Name : '', Validators.required],
      POC_Direct_Mobile: [contact ? contact.POC_Direct_Mobile : '', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
      POC_Work_Phone: [contact ? contact.POC_Work_Phone : '', [Validators.pattern('^[0-9]*$')]],
      POC_Designation_Id: [contact ? contact.POC_Designation_Id : 0],
      POC_Email: [contact ? contact.POC_Email : '', [Validators.email]],
      Next_Call_Action: [contact ? !!contact.Next_Call_Action : false],
      POC_State_Id: [stateId],
      POC_Location_Id: [{ value: contact ? contact.POC_Location_Id : 0, disabled: !stateId }],
      POC_Office_Type: [contact && contact.POC_Office_Type ? contact.POC_Office_Type : 'Head office'],
      Name_Captured: [contact ? !!contact.Name_Captured : false],
      Number_Captured: [contact ? !!contact.Number_Captured : false],
      Email_Captured: [contact ? !!contact.Email_Captured : false]
    });

    group.get('POC_State_Id').valueChanges.subscribe(val => {
      const locationControl = group.get('POC_Location_Id');
      if (val && val !== 0) {
        locationControl.enable({ emitEvent: false });
      } else {
        locationControl.disable({ emitEvent: false });
        locationControl.setValue(0, { emitEvent: false });
      }
    });

    return group;
  }

  addContact() {
    this.contactPersons.push(this.createContactRow());
  }

  Set_Next_Call_Contact(index: number) {
    const selected = this.contactPersons.at(index).get('Next_Call_Action').value;
    this.contactPersons.controls.forEach((control, controlIndex) => {
      if (controlIndex !== index) control.get('Next_Call_Action').setValue(false, { emitEvent: false });
    });
    this.Lead_.Next_Call_Action = !!selected;
  }

  removeContact(index: number) {
    if (this.contactPersons.length > 1) {
      this.contactPersons.removeAt(index);
      this.Lead_.Next_Call_Action = this.contactPersons.controls.some(control => !!control.get('Next_Call_Action').value);
    } else {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'At least one contact person must remain.', Type: "3" } });
    }
  }

  Close_Click() {
    this.router.navigate(['/Lead']);
    this.Entry_View = false;
    this.Lead_ = new Lead();
    this.Selected_Vertical = 0;
    this.Selected_Enquiry_For = [];
    this.Enquiry_For_Data = [];
    this.FollowUp_History = [];
    this.Activity_Log = [];
    this.Meeting_Data = [];
    this.Quote_Tracking_Data = [];
    this.Selected_Pipeline_Stage = '';
    this.Selected_Pulse = '';
  }

  Open_Requirement(lead: Lead) {
    this.issLoading = true;
    this.Requirement_Master_Service_.Check_Requirement_By_Lead(lead.Lead_Id).subscribe({
      next: (response: any) => {
        this.issLoading = false;
        if (response && response[0] && response[0].length > 0) {
          // If a requirement exists, navigate to the listing page filtered by this lead
          localStorage.removeItem('RequirementMaster_Id');
          localStorage.setItem('Requirement_Filter_Lead_Id', lead.Lead_Id.toString());
          localStorage.setItem('Requirement_Filter_Lead_Name', lead.Lead_Name);
          this.router.navigateByUrl('/Requirement');
        } else {
          localStorage.setItem('Lead_For_Requirement', JSON.stringify({
            Lead_Id: lead.Lead_Id,
            Lead_Name: lead.Lead_Name,
            Phone: lead.Phone,
            POC_Full_Name: lead.POC_Full_Name,
            POC_Direct_Mobile: lead.POC_Direct_Mobile || '',
            POC_Email: lead.POC_Email,
            Address: lead.Address,
            State_Name: lead.State_Name,
            District_Name: lead.District_Name
          }));
          this.router.navigateByUrl('/Requirement');
        }
      },
      error: () => {
        this.issLoading = false;
        localStorage.setItem('Lead_For_Requirement', JSON.stringify({
          Lead_Id: lead.Lead_Id,
          Lead_Name: lead.Lead_Name,
          Phone: lead.Phone,
          POC_Full_Name: lead.POC_Full_Name,
          POC_Direct_Mobile: lead.POC_Direct_Mobile || '',
          POC_Email: lead.POC_Email,
          Address: lead.Address,
          State_Name: lead.State_Name,
          District_Name: lead.District_Name
        }));
        this.router.navigateByUrl('/Requirement');
      }
    });
  }

  Open_Requirement_List() {
    localStorage.removeItem('Lead_For_Requirement');
    this.router.navigateByUrl('/Requirement');
  }

  getVerticalName(id: number): string {
    const v = this.Vertical_Data.find(x => x.Vertical_Id === id);
    return v ? v.Vertical_Name : '';
  }

  onEnquiryForChange() {
    this.Lead_.Enquiry_For = this.Selected_Enquiry_For.join(',');
  }

  Is_Lost_Stage(): boolean {
    const selectedStatus = this.Status_Data.find(s => s.Status_Id == this.Lead_.FollowUp_Status_Id || s.Status_Id == this.Lead_.Status_Id);
    const statusName = selectedStatus ? selectedStatus.Status_Name : this.Lead_.Status_Name;
    return statusName === this.Lost_Stage_Name;
  }

  Save_Lead() {
    if (!this.Lead_.Lead_Name) {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Lead Name', Type: "3" } });
      return;
    }
    
    // Validate Market Study Required Fields
    for (const sys of this.Added_Market_Systems) {
      if (sys.fields && sys.fields.length > 0) {
        for (const field of sys.fields) {
          // Check if IsRequired is true or 1, and the value is completely empty
          if ((field.IsRequired === true || field.IsRequired == 1) && (!field.Field_Value || String(field.Field_Value).trim() === '')) {
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: `Please enter a value for "${field.Field_Name}" in ${sys.name}`, Type: "3" } });
            return;
          }
        }
      }
    }
    const contactPersonValues = this.contactForm && this.contactForm.value && this.contactForm.value.contactPersons ? this.contactForm.value.contactPersons : [];
    const selectedContactValue = contactPersonValues.find(c => !!c.Next_Call_Action) || contactPersonValues[0] || null;
    if (!this.Lead_.Phone && selectedContactValue && selectedContactValue.POC_Direct_Mobile) this.Lead_.Phone = selectedContactValue.POC_Direct_Mobile;

    let Lead_Copy = Object.assign({}, this.Lead_);

    // Map Enquiry_For and Enquiry_For_Note
    Lead_Copy.Enquiry_For = this.Added_Interests.join('*');
    Lead_Copy.Enquiry_For_Note = this.Requirement_Note;
    
    // Map Market Study Fields
    (Lead_Copy as any).Market_Study_Systems = this.Added_Market_Systems.map(sys => sys.name).join('*');
    let allMarketFields = [];
    for (const sys of this.Added_Market_Systems) {
      if (sys.fields && sys.fields.length > 0) {
        for (const field of sys.fields) {
           allMarketFields.push({
              Category_Id: sys.id,
              Category_Name: sys.name,
              Field_Id: field.Field_Id || field.id,
              Field_Name: field.Field_Name,
              Field_Type: field.Field_Type,
              Field_Value: field.Field_Value ? String(field.Field_Value) : '',
              IsRequired: field.IsRequired ? 1 : 0
           });
        }
      }
    }
    (Lead_Copy as any).Market_Study_Fields_JSON = JSON.stringify(allMarketFields);
    
    Lead_Copy.Next_FollowUp_Date = this.Lead_.FollowUp_Next_Date;
    Lead_Copy.Remarks = this.Lead_.FollowUp_Remark;
    (Lead_Copy as any).Current_Pipeline_Stage = this.Selected_Pipeline_Stage || null;
    (Lead_Copy as any).Pulse = this.Selected_Pulse || null;
    
    const pipelineStageObj = (this.DropdownData['PipelineStage'] || []).find(x => x.name === this.Selected_Pipeline_Stage);
    (Lead_Copy as any).Current_PipelineStage_Id = pipelineStageObj ? pipelineStageObj.id : 0;
    
    const pulseObj = (this.DropdownData['Pulse'] || []).find(x => x.name === this.Selected_Pulse);
    (Lead_Copy as any).Pulse_Id = pulseObj ? pulseObj.id : 0;
    
    const workflowObj = (this.DropdownData['Workflow'] || []).find(x => x.name === this.Selected_Workflow);
    (Lead_Copy as any).Workflow_Id = workflowObj ? workflowObj.id : 0;
    (Lead_Copy as any).Workflow = this.Selected_Workflow;
    (Lead_Copy as any).Workflow_Start_Status = (this.Lead_ as any).Workflow_Start_Status ? 1 : 0;

    // Map Name fields from IDs
    Lead_Copy.Vertical_Name = this.DropdownData['Vertical'] ? (this.DropdownData['Vertical'].find(x => x.id == Lead_Copy.Vertical) || {}).name || '' : '';
    Lead_Copy.State_Name = this.DropdownData['State'] ? (this.DropdownData['State'].find(x => x.id == Lead_Copy.State) || {}).name || '' : '';
    Lead_Copy.District_Name = this.DropdownData['District'] ? (this.DropdownData['District'].find(x => x.id == Lead_Copy.District) || {}).name || '' : '';
    Lead_Copy.Company_Size_Name = this.DropdownData['CompanySize'] ? (this.DropdownData['CompanySize'].find(x => x.id == Lead_Copy.Company_Size_Id) || {}).name || '' : '';
    Lead_Copy.Source_Name = this.DropdownData['Source'] ? (this.DropdownData['Source'].find(x => x.id == Lead_Copy.Source) || {}).name || '' : '';

    // Process Contacts
    let serializedContacts = contactPersonValues.map((c, i) => ({
      Full_Name: c.POC_Full_Name,
      Designation_Id: c.POC_Designation_Id,
      Designation_Name: this.DropdownData['Designation'] ? (this.DropdownData['Designation'].find(d => d.id == c.POC_Designation_Id) || {}).name || '' : '',
      Direct_Mobile: c.POC_Direct_Mobile,
      Email_Address: c.POC_Email,
      Work_Phone: c.POC_Work_Phone,
      State_Id: c.POC_State_Id,
      State_Name: this.DropdownData['State'] ? (this.DropdownData['State'].find(s => s.id == c.POC_State_Id) || {}).name || '' : '',
      Sitting_Location_Id: c.POC_Location_Id,
      Sitting_Location: this.DropdownData['District'] ? (this.DropdownData['District'].find(d => d.id == c.POC_Location_Id) || {}).name || '' : '',
      Office_Type: c.POC_Office_Type,
      Name_Captured: (c.POC_Full_Name && c.POC_Full_Name.trim() !== '') ? 1 : 0,
      Number_Captured: (c.POC_Direct_Mobile && String(c.POC_Direct_Mobile).trim() !== '') ? 1 : 0,
      Email_Captured: (c.POC_Email && c.POC_Email.trim() !== '') ? 1 : 0,
      Is_Primary: (!!c.Next_Call_Action || (i === 0 && !contactPersonValues.some(cp => cp.Next_Call_Action))) ? 1 : 0
    }));

    (Lead_Copy as any).Contact_Person_Details = JSON.stringify(serializedContacts);
    Lead_Copy.Next_Call_Action = contactPersonValues.some(c => !!c.Next_Call_Action);

    // Map Primary Contact to Lead fields
    if (contactPersonValues.length > 0) {
      const firstContact = selectedContactValue || contactPersonValues[0];
      Lead_Copy.POC_Full_Name = firstContact.POC_Full_Name;
      Lead_Copy.POC_Direct_Mobile = firstContact.POC_Direct_Mobile;
      Lead_Copy.POC_Work_Phone = firstContact.POC_Work_Phone || firstContact.POC_Direct_Mobile || Lead_Copy.POC_Work_Phone;
      Lead_Copy.POC_Designation_Id = firstContact.POC_Designation_Id;
      Lead_Copy.POC_Designation = this.DropdownData['Designation'] ? (this.DropdownData['Designation'].find(d => d.id == firstContact.POC_Designation_Id) || {}).name || '' : '';
      Lead_Copy.POC_Email = firstContact.POC_Email;
      
      Lead_Copy.POC_State_Id = firstContact.POC_State_Id;
      Lead_Copy.POC_State = this.DropdownData['State'] ? (this.DropdownData['State'].find(s => s.id == firstContact.POC_State_Id) || {}).name || '' : '';
      Lead_Copy.POC_Location_Id = firstContact.POC_Location_Id;
      Lead_Copy.POC_Loc = this.DropdownData['District'] ? (this.DropdownData['District'].find(l => l.id == firstContact.POC_Location_Id) || {}).name || '' : '';
      Lead_Copy.POC_Office_Type = firstContact.POC_Office_Type;
      Lead_Copy.Name_Captured = firstContact.Name_Captured;
      Lead_Copy.Number_Captured = firstContact.Number_Captured;
      Lead_Copy.Email_Captured = firstContact.Email_Captured;
    }

    (Lead_Copy as any).Is_FollowUp = Lead_Copy.Is_FollowUp ? 1 : 0;
    if (this.Lead_.Is_FollowUp) {
      Lead_Copy.Department_Id = this.Lead_.FollowUp_Department_Id;
      Lead_Copy.Department_Name = this.DropdownData['Department_' + this.Lead_.FollowUp_Location_Id] ? (this.DropdownData['Department_' + this.Lead_.FollowUp_Location_Id].find(x => x.id === this.Lead_.FollowUp_Department_Id) || {}).name || '' : '';
      Lead_Copy.Status_Id = this.Lead_.FollowUp_Status_Id;
      Lead_Copy.Status_Name = this.DropdownData['TargetStage'] ? (this.DropdownData['TargetStage'].find(x => x.id === this.Lead_.FollowUp_Status_Id) || {}).name || '' : '';
      Lead_Copy.Staff_Id = this.Lead_.FollowUp_Staff_Id;
      Lead_Copy.Staff_Name = this.DropdownData['Staff_' + this.Lead_.FollowUp_Department_Id] ? (this.DropdownData['Staff_' + this.Lead_.FollowUp_Department_Id].find(x => x.id === this.Lead_.FollowUp_Staff_Id) || {}).name || '' : '';
      Lead_Copy.Branch_Id = this.Lead_.FollowUp_Location_Id;
      Lead_Copy.Branch_Name = this.DropdownData['Branch'] ? (this.DropdownData['Branch'].find(x => x.id === this.Lead_.FollowUp_Location_Id) || {}).name || '' : '';

      // Also set the FollowUp specific fields for the follow_up table
      Lead_Copy.FollowUp_Branch_Id = Lead_Copy.Branch_Id;
      Lead_Copy.FollowUp_Branch_Name = Lead_Copy.Branch_Name;
      Lead_Copy.FollowUp_Dept_Name = Lead_Copy.Department_Name;
      Lead_Copy.FollowUp_Status_Name = Lead_Copy.Status_Name;
      Lead_Copy.FollowUp_Staff_Name = Lead_Copy.Staff_Name;

    } else {
      Lead_Copy.Department_Id = 0;
      Lead_Copy.Department_Name = '';
      Lead_Copy.Status_Id = this.Lead_.Status_Id;
      Lead_Copy.Status_Name = this.Lead_.Status_Name;
      Lead_Copy.Staff_Id = 0;
      Lead_Copy.Staff_Name = '';
      Lead_Copy.Branch_Id = 0;
      Lead_Copy.Branch_Name = '';
    }
    
    Lead_Copy.Next_FollowUp_Date = this.Lead_.FollowUp_Next_Date;
    Lead_Copy.Remarks = this.Lead_.FollowUp_Remark;

    if (Lead_Copy.Entry_Date) Lead_Copy.Entry_Date = this.New_Date(new Date(Lead_Copy.Entry_Date));
    if (Lead_Copy.Next_FollowUp_Date) Lead_Copy.Next_FollowUp_Date = this.New_Date(new Date(Lead_Copy.Next_FollowUp_Date));
    
    const loginUser = localStorage.getItem('Login_User');
    if (loginUser) Lead_Copy.Login_User_Id = Number(loginUser);

    this.issLoading = true;
    this.Lead_Service_.Save_NewLead(Lead_Copy).pipe(finalize(() => this.issLoading = false)).subscribe({
      next: (res: any) => {
        if (res && res.success) {
          if (res.data && res.data.notified) {
            this.snackBar.open('Staff assigned and notified successfully.', 'Close', { duration: 3000 });
            this.notificationService.refresh();
          }
          let leadId = res.data.Key_Id || this.Lead_.Lead_Id;
          if (leadId && leadId > 0) {
              this.Save_Dynamic_Fields(leadId);
          } else {
              this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved Successfully', Type: "false" } });
              this.Close_Click();
              this.Get_Leads();
          }
        } else {
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: (res && res.message) || 'Error Occurred during Save', Type: "2" } });
        }
      },
      error: (err) => {
        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Server Error: ' + (err.message || 'Connection failed'), Type: "2" } });
      }
    });
  }

  Save_FollowUp() {
    this.Lead_.Is_FollowUp = true;
    this.Save_Lead();
  }

  Edit_Lead(lead_e: Lead) {
    this.Lead_ = Object.assign({}, lead_e);
    if (this.Is_View_Mode) {
      this.Lead_.Is_FollowUp = true;
    } else {
      this.Lead_.Is_FollowUp = (this.Lead_.Is_FollowUp as any) == 1 ? true : false;
    }
    this.Lead_.Next_Call_Action = (this.Lead_.Next_Call_Action as any) == 1 ? true : false;
    if (this.Lead_.Vertical && String(this.Lead_.Vertical).trim() !== '') {
      this.Lead_.Vertical = String(this.Lead_.Vertical).split(',')[0].trim();
    }
    if (this.Lead_.Enquiry_For && String(this.Lead_.Enquiry_For).trim() !== '') {
      this.Added_Interests = String(this.Lead_.Enquiry_For).split('*').map(v => v.trim()).filter(v => v !== '');
    } else {
      this.Added_Interests = [];
    }

    if ((this.Lead_ as any).Market_Study_Systems && String((this.Lead_ as any).Market_Study_Systems).trim() !== '') {
      const savedSystems = String((this.Lead_ as any).Market_Study_Systems).split('*').map(v => v.trim()).filter(v => v !== '');
      this.Added_Market_Systems = [];
      const fieldsData = (this.Lead_ as any).Market_Study_Fields_Data || [];
      
      for (const sysName of savedSystems) {
        const matchingFields = fieldsData.filter(f => f.Category_Name === sysName);
        const sysFields = matchingFields.map(f => ({
           id: f.Field_Id,
           Field_Id: f.Field_Id,
           Field_Name: f.Field_Name,
           Field_Type: f.Field_Type,
           Field_Value: f.Field_Value,
           IsRequired: f.IsRequired == 1
        }));
        
        const firstField = matchingFields[0];
        this.Added_Market_Systems.push({
           id: firstField ? firstField.Category_Id : 0,
           name: sysName,
           fields: sysFields
        });
      }
    } else {
      this.Added_Market_Systems = [];
    }

    if (this.Lead_.Branch_Id > 0) {
      this.Lead_.FollowUp_Location_Id = this.Lead_.Branch_Id;
      this.DropdownData['Branch'] = [{ id: this.Lead_.Branch_Id, name: this.Lead_.Branch_Name }];
    }
    if (this.Lead_.Department_Id > 0) {
      this.Lead_.FollowUp_Department_Id = this.Lead_.Department_Id;
      this.DropdownData['Department_' + this.Lead_.Branch_Id] = [{ id: this.Lead_.Department_Id, name: this.Lead_.Department_Name }];
    }
    if (this.Lead_.Staff_Id > 0) {
      this.Lead_.FollowUp_Staff_Id = this.Lead_.Staff_Id;
      this.DropdownData['Staff_' + this.Lead_.Department_Id] = [{ id: this.Lead_.Staff_Id, name: this.Lead_.Staff_Name }];
    }
    if (this.Lead_.Status_Id > 0) {
      this.Lead_.FollowUp_Status_Id = this.Lead_.Status_Id;
      this.DropdownData['TargetStage'] = [{ id: this.Lead_.Status_Id, name: this.Lead_.Status_Name }];
    }

    this.Lead_.FollowUp_Next_Date = this.Lead_.Next_FollowUp_Date ? this.New_Date(this.Lead_.Next_FollowUp_Date) : null;
    this.Lead_.FollowUp_Remark = this.Lead_.Remarks || '';
    this.Initialize_Contact_Form();
    let contacts = (this.Lead_ as any).Contact_Person_Details;
    if (typeof contacts === 'string' && contacts.trim() !== '') {
      try { contacts = JSON.parse(contacts); } catch (e) { contacts = []; }
    }
    if (contacts && Array.isArray(contacts) && contacts.length > 0) {
      contacts.forEach(c => this.contactPersons.push(this.createContactRow(c)));
      if (!contacts.some(c => !!c.Next_Call_Action) && this.Lead_.Next_Call_Action && this.contactPersons.length > 0) this.contactPersons.at(0).get('Next_Call_Action').setValue(true);
    } else {
      this.contactPersons.push(this.createContactRow({
        POC_Full_Name: this.Lead_.POC_Full_Name,
        POC_Direct_Mobile: this.Lead_.POC_Direct_Mobile,
        POC_Work_Phone: this.Lead_.POC_Work_Phone,
        POC_Designation_Id: this.Lead_.POC_Designation_Id,
        POC_Email: this.Lead_.POC_Email,
        Next_Call_Action: this.Lead_.Next_Call_Action
      }));
    }
    // The following API calls have been removed as per user request to optimize the edit page load:
    // this.Get_Lead_FollowUp_History(this.Lead_.Lead_Id);
    // this.Get_Lead_Activity_Log(this.Lead_.Lead_Id);
    // this.Get_Lead_Meetings(this.Lead_.Lead_Id);
    // this.Get_Lead_Quote_Tracking(this.Lead_.Lead_Id);
    // this.Get_Lead_Dynamic_Fields(this.Lead_.Lead_Id); // this triggers Get_Lead_Custom_Values
    
    if (this.Lead_.State) {
      this.loadDropdownData('District', false, this.Lead_.State);
    }
    if (contacts && Array.isArray(contacts)) {
      contacts.forEach(c => {
        if (c.POC_State_Id) {
          this.loadDropdownData('District', false, c.POC_State_Id);
          if (c.POC_Location_Id) {
            this.PreselectedDistrictNames[c.POC_Location_Id] = c.Location_Name || c.Sitting_Location || '';
          }
        }
      });
    }
    // Pre-populate dropdown data so they can display the selected text without an API call
    this.DropdownData['Vertical'] = this.Lead_.Vertical ? [{ id: this.Lead_.Vertical, name: this.Lead_.Vertical_Name }] : [];
    this.DropdownData['State'] = this.Lead_.State ? [{ id: this.Lead_.State, name: this.Lead_.State_Name }] : [];
    if (this.Lead_.State) {
      if (this.Lead_.District) {
        this.PreselectedDistrictNames[this.Lead_.District] = this.Lead_.District_Name || '';
      }
    }
    this.DropdownData['CompanySize'] = this.Lead_.Company_Size_Id ? [{ id: this.Lead_.Company_Size_Id, name: this.Lead_.Company_Size_Name }] : [];
    this.DropdownData['Source'] = this.Lead_.Source ? [{ id: this.Lead_.Source, name: this.Lead_.Source_Name }] : [];
    this.DropdownData['LeadPriority'] = this.Lead_.Lead_Priority ? [{ name: this.Lead_.Lead_Priority }] : [];
    
    this.Selected_Pipeline_Stage = '';
    this.DropdownData['PipelineStage'] = [];
    this.Selected_Pulse = '';
    this.DropdownData['Pulse'] = [];
    
    this.Selected_Workflow = (this.Lead_ as any).Workflow || '';
    this.DropdownData['Workflow'] = (this.Lead_ as any).Workflow ? [{ name: (this.Lead_ as any).Workflow }] : [];
    
    // Bind the remark to the text area model
    this.Requirement_Note = this.Lead_.Enquiry_For_Note || '';
    
    let designations = [];
    let states = [...(this.DropdownData['State'] || [])];
    let districts = [...(this.DropdownData['District'] || [])];
    if (contacts && Array.isArray(contacts)) {
       contacts.forEach((c: any) => {
          if (c.POC_Designation_Id && !designations.find(d => d.id === c.POC_Designation_Id)) {
             designations.push({ id: c.POC_Designation_Id, name: c.Designation_Name || c.POC_Designation || '' });
          }
          if (c.POC_State_Id && !states.find(s => s.id === c.POC_State_Id)) {
             states.push({ id: c.POC_State_Id, name: c.State_Name || c.POC_State || '' });
          }
          if (c.POC_Location_Id && !districts.find(d => d.id === c.POC_Location_Id)) {
             districts.push({ id: c.POC_Location_Id, name: c.Location_Name || '' });
          }
       });
    }
    this.DropdownData['Designation'] = designations;
    this.DropdownData['State'] = states;
    this.DropdownData['District'] = districts;

    this.Entry_View = true;
  }

  Get_Lead_Dynamic_Fields(Lead_Id: number) {
    this.Lead_Custom_Value_Service_.Get_Lead_Custom_Values(Lead_Id).subscribe(Rows => {
        const values = (Rows && Rows[0]) ? Rows[0] : [];
        this.Dynamic_Field_Values = {};
        values.forEach(val => {
            this.Dynamic_Field_Values[val.Custom_Field_Id] = val.Field_Value;
        });
    });
  }

  Save_Dynamic_Fields(Lead_Id: number) {
      const finish = () => {
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved Successfully', Type: "false" } });
          this.Close_Click();
          this.Get_Leads();
      };

      const keys = Object.keys(this.Dynamic_Field_Values);
      if (keys.length === 0) {
          finish();
          return;
      }
      
      let pending = keys.length;
      keys.forEach(key => {
          const valueObj = {
              Lead_Id: Lead_Id,
              Custom_Field_Id: Number(key),
              Field_Value: this.Dynamic_Field_Values[key]
          };
          this.Lead_Custom_Value_Service_.Save_Lead_Custom_Value(valueObj).subscribe({
              next: () => { if (--pending === 0) finish(); },
              error: () => { if (--pending === 0) finish(); }
          });
      });
  }

  Get_Lead_FollowUp_History(Lead_Id) {
    this.Lead_Service_.Get_Lead_FollowUp_History(Lead_Id).subscribe(Rows => { this.FollowUp_History = Rows && Rows[0] ? Rows[0] : []; });
  }

  Get_Lead_Activity_Log(Lead_Id) {
    if (!Lead_Id) { this.Activity_Log = []; return; }
    this.Lead_Service_.Get_Lead_Activity_Log(Lead_Id).subscribe(Rows => { this.Activity_Log = Rows && Rows[0] ? Rows[0] : []; });
  }

  Get_Lead_Meetings(Lead_Id) {
    if (!Lead_Id) { this.Meeting_Data = []; return; }
    this.Lead_Service_.Get_Lead_Meetings(Lead_Id).subscribe(Rows => { this.Meeting_Data = Rows && Rows[0] ? Rows[0] : []; });
  }

  Get_Lead_Quote_Tracking(Lead_Id) {
    if (!Lead_Id) { this.Quote_Tracking_Data = []; return; }
    this.Lead_Service_.Get_Lead_Quote_Tracking(Lead_Id).subscribe(Rows => { this.Quote_Tracking_Data = Rows && Rows[0] ? Rows[0] : []; });
  }

  Get_Meeting_Count(type: string): number {
    return (this.Meeting_Data || []).filter(m => String(m.Meeting_Type).toUpperCase() === type).length;
  }

  Open_Meeting_Form(type: string) {
    this.Selected_Meeting_Type = type;
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    this.Meeting_Input = { Meeting_Date: now.toISOString().slice(0, 16), Meeting_Type: type, Notes: '', Outcome: '' };
    this.Show_Meeting_Form = true;
  }

  Save_Lead_Meeting() {
    if (!this.Lead_.Lead_Id) return;
    if (!this.Meeting_Input.Meeting_Date) {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Meeting Date', Type: "3" } });
      return;
    }
    const Data = Object.assign({}, this.Meeting_Input, { Lead_Id: this.Lead_.Lead_Id, Meeting_Type: this.Selected_Meeting_Type, User_Id: Number(localStorage.getItem('Login_User') || 0) });
    this.Lead_Service_.Save_Lead_Meeting(Data).subscribe((res: any) => {
      if (res && res.success) {
        this.Show_Meeting_Form = false;
        this.Get_Lead_Meetings(this.Lead_.Lead_Id);
        this.Get_Lead_Activity_Log(this.Lead_.Lead_Id);
      }
    });
  }

  Open_Quote_Form() {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    this.Quote_Tracking_Input = { Requirement_Id: 0, Requirement_Name: '', Quote_Sent_Date: today.toISOString().slice(0, 10), Quote_Amount: 0, FollowUp_Status_After_Quote: '' };
    this.Show_Quote_Form = true;
  }

  Save_Lead_Quote_Tracking() {
    if (!this.Lead_.Lead_Id) return;
    if (!this.Quote_Tracking_Input.Requirement_Name) {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Requirement', Type: "3" } });
      return;
    }
    const Data = Object.assign({}, this.Quote_Tracking_Input, { Lead_Id: this.Lead_.Lead_Id, User_Id: Number(localStorage.getItem('Login_User') || 0) });
    this.Lead_Service_.Save_Lead_Quote_Tracking(Data).subscribe((res: any) => {
      if (res && res.success) {
        this.Show_Quote_Form = false;
        this.Get_Lead_Quote_Tracking(this.Lead_.Lead_Id);
        this.Get_Lead_Activity_Log(this.Lead_.Lead_Id);
      }
    });
  }

  Delete_Lead(Lead_Id: number, index: number) {
    this.Lead_Service_.Delete_Lead(Lead_Id).subscribe((res: any) => {
      if (res && res.success) {
        this.Get_Leads();
      }
    });
  }
}
