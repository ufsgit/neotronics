import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
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
import { LeadFilterDropdownComponent } from '../../../components/lead-filter-dropdown/lead-filter-dropdown/lead-filter-dropdown.component';

@Component({
  selector: 'app-Lead',
  templateUrl: './Lead.component.html',
  styleUrls: ['./Lead.component.css']
})
export class LeadComponent implements OnInit {
  @ViewChildren(LeadFilterDropdownComponent) filterDropdowns!: QueryList<LeadFilterDropdownComponent>;
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
  readonly Raw_Lead_Stage_Name: string = 'RAW Lead';
  readonly Lost_Stage_Name: string = 'Lost';

  Selected_Lead_Type: string = 'All';

  Requirement_Note: string = '';
  
  Available_Interests: string[] = ['Web Development', 'Mobile App Development', 'SEO Optimization', 'Digital Marketing', 'Cloud Hosting', 'UI/UX Design', 'IT Consulting'];
  Selected_Interest: string = '';
  Added_Interests: string[] = [];
  Interest_Already_Exists: boolean = false;
  Clear_Interests_Popup_Open: boolean = false;

  Available_Market_Systems: string[] = ['CRM', 'MCRS', 'WhatsApp (WA)', 'Mail box', 'Cloud services', 'PBX', 'Call center'];
  Added_Market_Systems: string[] = [];

  Available_Pipeline_Stages: string[] = ['New', 'Need to call', 'In Progress', 'Negotiation', 'Closed Won', 'Closed Lost'];
  Selected_Pipeline_Stage: string = '';
  
  Available_Pulses: string[] = ['Interested', 'Not interested', 'Very excited', 'Ghosting'];
  Selected_Pulse: string = '';

  Available_Workflows: string[] = [
    'Asked us to send data via Email/WABA → no reply',
    'Meeting completed → no response',
    'Proposal sent → no response'
  ];
  Selected_Workflow: string = '';
  Show_History: boolean = false;
  Show_Pipeline_History: boolean = false;

  Toggle_Market_System(system: string) {
    const index = this.Added_Market_Systems.indexOf(system);
    if (index > -1) {
      this.Added_Market_Systems.splice(index, 1);
    } else {
      this.Added_Market_Systems.push(system);
    }
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
    { key: 'Lead Priority', label: 'Lead Priority', visible: true },
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

  // Dropdown state tracking
  DropdownData: { [key: string]: any[] } = {};
  DropdownPage: { [key: string]: number } = {};
  DropdownSearch: { [key: string]: string } = {};
  DropdownLoading: { [key: string]: boolean } = {};
  DropdownEnd: { [key: string]: boolean } = {};

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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.issLoading = true;
      this.Lead_Service_.Get_NewLeadByID(id).subscribe(data => {
        this.issLoading = false;
        if (data && data.length > 0 && data[0].length > 0) {
           // data[0] is main lead, data[1] is contacts, data[2] is pipeline history
           // Note: Edit_Lead and contact populating logic may need to be updated to use data[1] and data[2]
           this.Edit_Lead(data[0][0]);
        } else {
           this.snackBar.open("Record Not Found", "Close", { duration: 3000 });
           this.router.navigate(['/LeadDashboard']);
        }
      }, err => {
         this.issLoading = false;
         this.snackBar.open("Error fetching lead", "Close", { duration: 3000 });
      });
    } else {
      this.Page_Load();
    }

    this.route.queryParams.subscribe(params => {
      this.Query_Status = params['status'] || null;
      this.Query_Assigned = params['assigned'] || null;
      this.Query_Followup = params['followup'] || null;
      if (this.Lead_Data && this.Lead_Data.length > 0) {
        this.Apply_Lead_Filters();
      }
    });

    // Subscriptions to master data updates removed as they triggered unwanted API calls on the list page
  }

  splitEnquiry(enquiry: string): string[] {
    if (!enquiry) return [];
    return enquiry.split('*').map(s => s.trim()).filter(s => s.length > 0);
  }

  Page_Load() {
    this.Load_Column_Preferences();
    this.Get_Leads();
  }

  loadDropdownData(type: string, append: boolean = false) {
    if (this.DropdownLoading[type]) return;
    if (append && this.DropdownEnd[type]) return;
    
    this.DropdownLoading[type] = true;
    const search = this.DropdownSearch[type] || '';
    const page = this.DropdownPage[type] || 1;
    
    this.Lead_Service_.Search_Lead_Dropdowns(type, search, page).subscribe(Rows => {
      this.DropdownLoading[type] = false;
      const data = Array.isArray(Rows) ? Rows : [];
      if (data.length === 0) {
        this.DropdownEnd[type] = true;
      }
      if (append) {
        this.DropdownData[type] = [...(this.DropdownData[type] || []), ...data];
      } else {
        this.DropdownData[type] = data;
      }
    }, err => {
      console.error(`Error loading dropdown for ${type}`, err);
      this.DropdownLoading[type] = false;
    });
  }

  onSearchDropdown(type: string, searchText: string) {
    this.DropdownSearch[type] = searchText;
    this.DropdownPage[type] = 1;
    this.DropdownEnd[type] = false;
    this.loadDropdownData(type, false);
  }

  onLoadMoreDropdown(type: string) {
    this.DropdownPage[type] = (this.DropdownPage[type] || 1) + 1;
    this.loadDropdownData(type, true);
  }

  onCompanyNameChange(value: string) {
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

  Get_Company_Sizes() {
    this.Company_Size_Service_.Get_All_Company_Sizes().subscribe(Rows => {
      if (Rows && Array.isArray(Rows)) {
        this.Company_Size_Data = Rows;
      } else {
        this.Company_Size_Data = [];
      }
    }, err => {
      console.error('Error loading Company Sizes:', err);
    });
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
    this.Lead_Service_.Get_NewLeads(
      this.Search_Text || '',
      this.Lead_Filter.Industry || 0,
      this.Lead_Filter.Designation || 0,
      this.Lead_Filter.District || 0,
      this.Lead_Filter.Priority || '',
      this.Page_Index,
      this.Page_Size
    ).subscribe(Rows => {
      const leadRows = (Rows && Array.isArray(Rows) && Rows.length > 0 && Array.isArray(Rows[0])) ? Rows[0] : (Array.isArray(Rows) ? Rows : []);
      const countRows = (Rows && Array.isArray(Rows) && Rows.length > 1 && Array.isArray(Rows[1])) ? Rows[1] : [];
      let totalCount = countRows.length > 0 && countRows[0].Total_Count !== undefined ? countRows[0].Total_Count : leadRows.length;
      
      this.Total_Pages = Math.max(1, Math.ceil(totalCount / this.Page_Size));

      if (Array.isArray(leadRows)) {
        this.Lead_Data = leadRows as any;
        this.Lead_Data.forEach(element => {
          element.Is_FollowUp = (element.Is_FollowUp as any) == 1 ? true : false;
          if (!(element as any).Contact_Number && (element as any).Contact_No) {
            (element as any).Contact_Number = (element as any).Contact_No;
          }
        });
        this.Map_Staff_Names();
        this.Paged_Lead_Data = this.Lead_Data;
        this.Filtered_Lead_Data = this.Lead_Data;
      } else {
        this.Lead_Data = [];
        this.Paged_Lead_Data = [];
        this.Filtered_Lead_Data = [];
      }
      this.issLoading = false;
    }, err => {
      this.Lead_Data = [];
      this.Paged_Lead_Data = [];
      this.Filtered_Lead_Data = [];
      this.issLoading = false;
    });
  }

  Get_Dropdowns_Lead() {
    this.Lead_Service_.Get_Dropdowns_Lead().subscribe(Rows => {
      if (Rows != null) {
        this.Department_Data = Array.isArray(Rows[0]) ? Rows[0] : [];
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
    this.Page_Index = 1;
    this.Get_Leads();
  }

  Clear_Lead_Filters() {
    this.Lead_Filter = { Industry: 0, Stage: 0, Priority: '', Date: '', Assigned_Staff: 0, District: 0, State: 0 };
    this.Apply_Lead_Filters();
  }

  Update_Paged_Leads() {
    // Pagination is now handled by the backend
  }

  Change_Page(delta: number) {
    const nextPage = this.Page_Index + delta;
    if (nextPage < 1 || nextPage > this.Total_Pages) return;
    this.Page_Index = nextPage;
    this.Get_Leads();
  }

  Change_Page_Size() {
    this.Page_Index = 1;
    this.Get_Leads();
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
    // Clear all filters
    this.Lead_Filter = {
      Industry: 0,
      Stage: 0,
      Priority: '',
      Date: '',
      Assigned_Staff: 0,
      District: 0,
      State: 0
    };
    
    // Clear dropdown UI components
    if (this.filterDropdowns) {
      this.filterDropdowns.forEach(dropdown => dropdown.clear());
    }

    // Revert all columns to true (default state)
    this.Lead_List_Columns.forEach(column => column.visible = true);
    localStorage.removeItem(this.Lead_Column_Prefs_Key);

    // Apply the cleared filters to update the table
    this.Apply_Lead_Filters();
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
    this.router.navigate(['/Lead/New']);
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
    return this.fb.group({
      POC_Full_Name: [contact ? contact.POC_Full_Name : '', Validators.required],
      POC_Direct_Mobile: [contact ? contact.POC_Direct_Mobile : '', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
      POC_Work_Phone: [contact ? contact.POC_Work_Phone : '', [Validators.pattern('^[0-9]*$')]],
      POC_Designation_Id: [contact ? contact.POC_Designation_Id : 0],
      POC_Email: [contact ? contact.POC_Email : '', [Validators.email]],
      Next_Call_Action: [contact ? !!contact.Next_Call_Action : false],
      POC_State_Id: [contact ? contact.POC_State_Id : 0],
      POC_Location_Id: [contact ? contact.POC_Location_Id : 0],
      POC_Office_Type: [contact ? contact.POC_Office_Type : 'Head office'],
      Name_Captured: [contact ? !!contact.Name_Captured : false],
      Number_Captured: [contact ? !!contact.Number_Captured : false],
      Email_Captured: [contact ? !!contact.Email_Captured : false]
    });
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
    this.Entry_View = false;
    this.Lead_ = new Lead();
    this.Selected_Vertical = 0;
    this.Selected_Enquiry_For = [];
    this.Enquiry_For_Data = [];
    this.FollowUp_History = [];
    this.Activity_Log = [];
    this.Meeting_Data = [];
    this.Quote_Tracking_Data = [];
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
    const contactPersonValues = this.contactForm && this.contactForm.value && this.contactForm.value.contactPersons ? this.contactForm.value.contactPersons : [];
    const selectedContactValue = contactPersonValues.find(c => !!c.Next_Call_Action) || contactPersonValues[0] || null;
    if (!this.Lead_.Phone && selectedContactValue && selectedContactValue.Contact_Number) this.Lead_.Phone = selectedContactValue.Contact_Number;
    if (!this.Lead_.Phone) {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Phone Number', Type: "3" } });
      return;
    }
    let Lead_Copy = Object.assign({}, this.Lead_);
    (Lead_Copy as any).Contact_Person_Details = contactPersonValues;
    Lead_Copy.Next_Call_Action = contactPersonValues.some(c => !!c.Next_Call_Action);
    if (contactPersonValues.length > 0) {
      const firstContact = selectedContactValue || contactPersonValues[0];
      Lead_Copy.POC_Full_Name = firstContact.POC_Full_Name;
      Lead_Copy.POC_Direct_Mobile = firstContact.POC_Direct_Mobile;
      Lead_Copy.POC_Work_Phone = firstContact.POC_Work_Phone || firstContact.POC_Direct_Mobile || Lead_Copy.POC_Work_Phone;
      Lead_Copy.POC_Designation_Id = firstContact.POC_Designation_Id;
      Lead_Copy.POC_Email = firstContact.POC_Email;
    }
    (Lead_Copy as any).Is_FollowUp = Lead_Copy.Is_FollowUp ? 1 : 0;
    if (this.Lead_.Is_FollowUp) {
      Lead_Copy.Department_Id = this.Lead_.FollowUp_Department_Id;
      Lead_Copy.Status_Id = this.Lead_.FollowUp_Status_Id;
      Lead_Copy.Staff_Id = this.Lead_.FollowUp_Staff_Id;
      Lead_Copy.Location_Id = this.Lead_.FollowUp_Location_Id;
    } else {
      Lead_Copy.Department_Id = 0;
      Lead_Copy.Status_Id = this.Lead_.Status_Id;
      Lead_Copy.Staff_Id = 0;
      Lead_Copy.Location_Id = 0;
    }
    if (Lead_Copy.Entry_Date) Lead_Copy.Entry_Date = this.New_Date(new Date(Lead_Copy.Entry_Date));
    if (Lead_Copy.FollowUp_Next_Date) Lead_Copy.FollowUp_Next_Date = this.New_Date(new Date(Lead_Copy.FollowUp_Next_Date));
    const loginUser = localStorage.getItem('Login_User');
    if (loginUser) Lead_Copy.Login_User_Id = Number(loginUser);
    if (Lead_Copy.FollowUp_Date) Lead_Copy.FollowUp_Date = Lead_Copy.FollowUp_Date.replace('T', ' ');
    this.issLoading = true;
    this.Lead_Service_.Save_Lead(Lead_Copy).pipe(finalize(() => this.issLoading = false)).subscribe({
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
    this.router.navigate(['/Lead/Edit', lead_e.Lead_Id]);
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
