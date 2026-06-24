import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { Lead_Service } from '../../../services/Lead.Service';
import { Lead } from '../../../models/Lead';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { User_Details_Service } from '../../../services/User_Details.Service';
import { Requirement_Master_Service } from '../../../services/Requirement_Master.Service';
import { Company_Size_Service } from '../../../services/Company_Size.Service';
import { Master_Refresh_Service } from '../../../services/Master_Refresh.Service';

@Component({
  selector: 'app-Lead',
  templateUrl: './Lead.component.html',
  styleUrls: ['./Lead.component.css']
})
export class LeadComponent implements OnInit {
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
  Page_Index: number = 1;
  Page_Size: number = 10;
  Page_Size_Options: number[] = [10, 25, 50, 100];
  Total_Pages: number = 1;

  Selected_Vertical: number = 0;
  Selected_Enquiry_For: number[] = [];
  Enquiry_For_Data: any[] = [];

  Reprocess_Drawer_Visible: boolean = false;
  Requirement_Details_Input: string = '';

  constructor(
    public Lead_Service_: Lead_Service,
    public User_Details_Service_: User_Details_Service,
    public Requirement_Master_Service_: Requirement_Master_Service,
    public Company_Size_Service_: Company_Size_Service,
    public dialogBox: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private Master_Refresh_Service_: Master_Refresh_Service
  ) { 
    this.Initialize_Contact_Form();
  }

  ngOnInit() {
    this.Page_Load();

    // Subscribe to master data updates
    this.Master_Refresh_Service_.masterUpdated$.subscribe(masterName => {
      if (masterName === 'Vertical' || masterName === 'Industry' || masterName === 'Designation') {
        this.Get_Dropdowns_Lead();
      }
      if (masterName === 'Company_Size') {
        this.Get_Company_Sizes();
      }
    });
  }

  Page_Load() {
    this.Load_Column_Preferences();
    this.Get_Leads();
    this.Get_Dropdowns_Lead();
    this.Get_Company_Sizes();
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
        this.Lead_Data = [];
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
    const filters = this.Lead_Filter;
    const searchText = (this.Search_Text || '').toLowerCase();

    this.Filtered_Lead_Data = (this.Lead_Data || []).filter((lead: any) => {
      const entryDate = lead.Entry_Date ? this.New_Date(new Date(lead.Entry_Date)) : '';
      const industry = this.Vertical_Data.find(v => Number(v.Vertical_Id) === Number(filters.Industry));
      
      const searchMatch = !searchText || 
        (lead.Lead_Name || '').toLowerCase().includes(searchText) ||
        (lead.Contact_Person || '').toLowerCase().includes(searchText) ||
        (lead.Contact_Number || lead.Phone || '').toLowerCase().includes(searchText) ||
        (lead.Address || '').toLowerCase().includes(searchText) ||
        (lead.Status_Name || '').toLowerCase().includes(searchText) ||
        (lead.Lead_Id || '').toString().includes(searchText);

      return searchMatch
        && (!filters.Industry || Number(lead.Vertical) === Number(filters.Industry) || Number(lead.Vertical_Id) === Number(filters.Industry) || (industry && lead.Vertical_Name === industry.Vertical_Name))
        && (!filters.Stage || Number(lead.Status_Id) === Number(filters.Stage))
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
      'Contact Person': lead.Contact_Person || '',
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
    this.Initialize_Contact_Form();
    this.addContact();
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
      Contact_Person: [contact ? contact.Contact_Person : '', Validators.required],
      Contact_Number: [contact ? contact.Contact_Number : '', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
      Phone: [contact ? contact.Phone : '', [Validators.pattern('^[0-9]*$')]],
      Designation: [contact ? contact.Designation : 0],
      Email: [contact ? contact.Email : '', [Validators.email]],
      Next_Call_Action: [contact ? !!contact.Next_Call_Action : false]
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
            Contact_Person: lead.Contact_Person,
            Contact_Number: (lead as any).Contact_Number || '',
            Email: lead.Email,
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
          Contact_Person: lead.Contact_Person,
          Contact_Number: (lead as any).Contact_Number || '',
          Email: lead.Email,
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

  onVerticalChange() {
    this.Lead_.Vertical = this.Selected_Vertical ? this.Selected_Vertical.toString() : '';
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
      Lead_Copy.Contact_Person = firstContact.Contact_Person;
      Lead_Copy.Contact_Number = firstContact.Contact_Number;
      Lead_Copy.Phone = firstContact.Phone || firstContact.Contact_Number || Lead_Copy.Phone;
      Lead_Copy.Designation = firstContact.Designation;
      Lead_Copy.Email = firstContact.Email;
    }
    (Lead_Copy as any).Is_FollowUp = Lead_Copy.Is_FollowUp ? 1 : 0;
    if (this.Lead_.Is_FollowUp) {
      Lead_Copy.Department_Id = this.Lead_.FollowUp_Department_Id;
      Lead_Copy.Status_Id = this.Lead_.FollowUp_Status_Id;
      Lead_Copy.Staff_Id = this.Lead_.FollowUp_Staff_Id;
      Lead_Copy.Location_Id = this.Lead_.FollowUp_Location_Id;
      Lead_Copy.Next_FollowUp_Date = this.Lead_.FollowUp_Next_Date;
    } else {
      Lead_Copy.Department_Id = 0;
      Lead_Copy.Status_Id = this.Lead_.Status_Id;
      Lead_Copy.Staff_Id = 0;
      Lead_Copy.Location_Id = 0;
      Lead_Copy.Next_FollowUp_Date = null;
    }
    if (Lead_Copy.Entry_Date) Lead_Copy.Entry_Date = this.New_Date(new Date(Lead_Copy.Entry_Date));
    if (Lead_Copy.Next_FollowUp_Date) Lead_Copy.Next_FollowUp_Date = this.New_Date(new Date(Lead_Copy.Next_FollowUp_Date));
    if (Lead_Copy.FollowUp_Next_Date) Lead_Copy.FollowUp_Next_Date = this.New_Date(new Date(Lead_Copy.FollowUp_Next_Date));
    Lead_Copy.Next_FollowUp_Date = Lead_Copy.FollowUp_Next_Date;
    const loginUser = localStorage.getItem('Login_User');
    if (loginUser) Lead_Copy.Login_User_Id = Number(loginUser);
    if (Lead_Copy.FollowUp_Date) Lead_Copy.FollowUp_Date = Lead_Copy.FollowUp_Date.replace('T', ' ');
    this.issLoading = true;
    this.Lead_Service_.Save_Lead(Lead_Copy).pipe(finalize(() => this.issLoading = false)).subscribe({
      next: (res: any) => {
        if (res && res.success) {
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved Successfully', Type: "false" } });
          this.Close_Click();
          this.Get_Leads();
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
    this.Lead_.Is_FollowUp = (this.Lead_.Is_FollowUp as any) == 1 ? true : false;
    this.Lead_.Next_Call_Action = (this.Lead_.Next_Call_Action as any) == 1 ? true : false;
    if (this.Lead_.Vertical && String(this.Lead_.Vertical).trim() !== '') {
      this.Selected_Vertical = Number(String(this.Lead_.Vertical).split(',')[0].trim());
    } else this.Selected_Vertical = 0;
    this.onVerticalChange();
    if (this.Lead_.Enquiry_For && String(this.Lead_.Enquiry_For).trim() !== '') {
      this.Selected_Enquiry_For = String(this.Lead_.Enquiry_For).split(',').map(v => Number(v.trim())).filter(v => v > 0);
    } else this.Selected_Enquiry_For = [];
    if (this.Lead_.Staff_Id > 0) this.Lead_.FollowUp_Staff_Id = this.Lead_.Staff_Id;
    if (this.Lead_.Department_Id > 0) this.Lead_.FollowUp_Department_Id = this.Lead_.Department_Id;
    if (this.Lead_.Status_Id > 0) this.Lead_.FollowUp_Status_Id = this.Lead_.Status_Id;
    if (this.Lead_.Location_Id > 0) this.Lead_.FollowUp_Location_Id = this.Lead_.Location_Id;
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
        Contact_Person: this.Lead_.Contact_Person,
        Contact_Number: this.Lead_.Contact_Number,
        Phone: this.Lead_.Phone,
        Designation: this.Lead_.Designation,
        Email: this.Lead_.Email,
        Next_Call_Action: this.Lead_.Next_Call_Action
      }));
    }
    this.Get_Lead_FollowUp_History(this.Lead_.Lead_Id);
    this.Get_Lead_Activity_Log(this.Lead_.Lead_Id);
    this.Get_Lead_Meetings(this.Lead_.Lead_Id);
    this.Get_Lead_Quote_Tracking(this.Lead_.Lead_Id);
    this.Entry_View = true;
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
