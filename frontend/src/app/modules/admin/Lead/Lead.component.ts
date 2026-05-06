import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Lead_Service } from '../../../services/Lead.Service';
import { Lead } from '../../../models/Lead';
import { MatDialog } from '@angular/material';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { User_Details_Service } from '../../../services/User_Details.Service';
import { Requirement_Master_Service } from '../../../services/Requirement_Master.Service';

@Component({
  selector: 'app-Lead',
  templateUrl: './Lead.component.html',
  styleUrls: ['./Lead.component.css']
})
export class LeadComponent implements OnInit {
  Lead_: Lead = new Lead();
  Lead_Data: Lead[] = [];
  Entry_View: boolean = false;
  issLoading: boolean = false;


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

  Selected_Verticals: number[] = [];
  Selected_Enquiry_For: number[] = [];
  Enquiry_For_Data: any[] = [];

  Reprocess_Drawer_Visible: boolean = false;
  Requirement_Details_Input: string = '';

  constructor(
    public Lead_Service_: Lead_Service,
    public User_Details_Service_: User_Details_Service,
    public Requirement_Master_Service_: Requirement_Master_Service,
    public dialogBox: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.Page_Load();
  }

  Page_Load() {
    this.Get_Leads();
    this.Get_Dropdowns_Lead();
  }

  Get_Leads() {
    this.issLoading = true;
    this.Lead_Service_.Get_Leads().subscribe(Rows => {
      console.log('API RESPONSE:', Rows); // DEBUG
      // Support both mysql2 stored-procedure shape: [ [rows], ... ]
      // and direct array shape: [ {..}, {..} ]
      const leadRows =
        (Rows && Array.isArray(Rows) && Rows.length > 0 && Array.isArray(Rows[0])) ? Rows[0]
        : (Array.isArray(Rows) ? Rows : []);

      if (Array.isArray(leadRows)) {
        this.Lead_Data = leadRows as any;
        this.Lead_Data.forEach(element => {
          element.Is_FollowUp = (element.Is_FollowUp as any) == 1 ? true : false;
          // Normalize Contact_Number for display and cross-module use
          if (!(element as any).Contact_Number && (element as any).Contact_No) {
            (element as any).Contact_Number = (element as any).Contact_No;
          }
        });
        // Fix: Map staff names immediately after fetching leads
        this.Map_Staff_Names();
      } else {
        // Fallback or handle unexpected structure
        this.Lead_Data = [];
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
        
        // Only assign if Rows[8] has data, otherwise we fetch it separately below
        if (Array.isArray(Rows[8]) && Rows[8].length > 0) {
          this.Staff_Data = Rows[8];
        }
        
        // Fetching staff data separately because Rows[8] might be empty in some versions of the SP
        this.User_Details_Service_.Search_User_Details('', 1, 1).subscribe(StaffRows => {
          if (StaffRows != null) {
            // Handle both array of arrays (direct SP result) and single array formats
            this.Staff_Data = Array.isArray(StaffRows[0]) ? StaffRows[0] : (Array.isArray(StaffRows) ? StaffRows : []);
            console.log('Staff_Data populated:', this.Staff_Data.length, 'items');

            // Apply patch to already loaded Lead_Data if needed
            this.Map_Staff_Names();
          }
        }, err => {
          console.error('Error loading staff details:', err);
        });
      }
    }, err => {
      console.error('Error loading dropdowns:', err);
    });
  }

  Map_Staff_Names() {
    if (this.Lead_Data && this.Lead_Data.length > 0 && this.Staff_Data && this.Staff_Data.length > 0) {
      this.Lead_Data.forEach(element => {
        // Map Staff_Name if missing or just to be sure
        if (element.Staff_Id > 0) {
          const staff = this.Staff_Data.find(s => s.User_Details_Id == element.Staff_Id);
          if (staff) element.Staff_Name = staff.User_Details_Name;
        }
      });
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
    this.Selected_Verticals = [];
    this.Selected_Enquiry_For = [];
    this.Enquiry_For_Data = [];
    // Initialize FollowUp_Date to current local time formatted for datetime-local input
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    this.Lead_.FollowUp_Date = now.toISOString().slice(0, 16);
    this.FollowUp_History = [];
  }

  Close_Click() {
    this.Entry_View = false;
    this.Lead_ = new Lead();
    this.Selected_Verticals = [];
    this.Selected_Enquiry_For = [];
    this.Enquiry_For_Data = [];
    this.FollowUp_History = [];
  }

  Open_Requirement(lead: Lead) {
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

  Open_Requirement_List() {
    localStorage.removeItem('Lead_For_Requirement');
    this.router.navigateByUrl('/Requirement');
  }

  getVerticalName(id: number): string {
    const v = this.Vertical_Data.find(x => x.Vertical_Id === id);
    return v ? v.Vertical_Name : '';
  }

  onVerticalChange() {
    // Enquiry For mirrors exactly the selected verticals from Vertical_Data
    this.Enquiry_For_Data = this.Vertical_Data.filter(v =>
      this.Selected_Verticals.includes(v.Vertical_Id)
    );
    // Reset enquiry selections that are no longer valid
    this.Selected_Enquiry_For = this.Selected_Enquiry_For.filter(id =>
      this.Enquiry_For_Data.find(v => v.Vertical_Id === id)
    );
    this.Lead_.Enquiry_For = this.Selected_Enquiry_For.join(',');
    this.Lead_.Vertical = this.Selected_Verticals.join(',');
  }

  onEnquiryForChange() {
    this.Lead_.Enquiry_For = this.Selected_Enquiry_For.join(',');
  }

  Save_Lead() {
    if (!this.Lead_.Lead_Name) {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Lead Name', Type: "3" } });
      return;
    }
    if (!this.Lead_.Phone) {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Phone Number', Type: "3" } });
      return;
    }

    let Lead_Copy = Object.assign({}, this.Lead_);
    (Lead_Copy as any).Is_FollowUp = Lead_Copy.Is_FollowUp ? 1 : 0;

    // Backward compatibility: some DBs still have Lead.Vertical as INT.
    // If multi-select produced a comma-separated string, send the first selected ID to avoid SQL WARN_DATA_TRUNCATED.
    if (Lead_Copy.Vertical && String(Lead_Copy.Vertical).includes(',')) {
      const first = String(Lead_Copy.Vertical).split(',').map(v => Number(v.trim())).find(v => v > 0);
      if (first) Lead_Copy.Vertical = String(first);
    }
    // Same for Enquiry_For if saved as INT in some DB versions
    if (Lead_Copy.Enquiry_For && String(Lead_Copy.Enquiry_For).includes(',')) {
      const firstE = String(Lead_Copy.Enquiry_For).split(',').map(v => Number(v.trim())).find(v => v > 0);
      if (firstE) Lead_Copy.Enquiry_For = String(firstE);
    }
    
    // Mapping follow-up details to basic fields if follow-up is enabled
    // This ensures both the Lead and its first Follow-up entry have the same data
    if (this.Lead_.Is_FollowUp) {
      Lead_Copy.Department_Id = this.Lead_.FollowUp_Department_Id;
      Lead_Copy.Status_Id = this.Lead_.FollowUp_Status_Id;
      Lead_Copy.Staff_Id = this.Lead_.FollowUp_Staff_Id;
      Lead_Copy.Location_Id = this.Lead_.FollowUp_Location_Id;
      Lead_Copy.Next_FollowUp_Date = this.Lead_.FollowUp_Next_Date;
    } else {
      // If not follow-up, ensure these have default valid values (0 or null)
      Lead_Copy.Department_Id = 0;
      Lead_Copy.Status_Id = 0;
      Lead_Copy.Staff_Id = 0;
      Lead_Copy.Location_Id = 0;
      Lead_Copy.Next_FollowUp_Date = null;
    }

    if (Lead_Copy.Entry_Date) Lead_Copy.Entry_Date = this.New_Date(new Date(Lead_Copy.Entry_Date));
    if (Lead_Copy.Next_FollowUp_Date) Lead_Copy.Next_FollowUp_Date = this.New_Date(new Date(Lead_Copy.Next_FollowUp_Date));
    if (Lead_Copy.FollowUp_Next_Date) Lead_Copy.FollowUp_Next_Date = this.New_Date(new Date(Lead_Copy.FollowUp_Next_Date));
    
    // BACKEND MAPPING: The backend expects 'Next_FollowUp_Date' for the new column.
    // In our logic, 'FollowUp_Next_Date' is what's bound to the input.
    // We must ensure 'Next_FollowUp_Date' is set to this value.
    Lead_Copy.Next_FollowUp_Date = Lead_Copy.FollowUp_Next_Date;

    // Get Login User Id
    const loginUser = localStorage.getItem('Login_User');
    if (loginUser) {
      Lead_Copy.Login_User_Id = Number(loginUser);
    }

    // Format FollowUp_Date (DateTime)
    if (Lead_Copy.FollowUp_Date) {
      Lead_Copy.FollowUp_Date = Lead_Copy.FollowUp_Date.replace('T', ' ');
    }


    console.log("Before Lead Save API call");
    this.issLoading = true;

    this.Lead_Service_.Save_Lead(Lead_Copy)
    .pipe(
      finalize(() => {
        console.log("Lead Save Finalize executed");
        this.issLoading = false;
        // Buttons in this component don't use [hidden], but reset loader is key
      })
    )
    .subscribe({
      next: (Save_status) => {
        console.log("Lead Save API Response:", Save_status);
        
        if (Save_status && Save_status[0] && Save_status[0][0] && 
           (Save_status[0][0].Key_Id > 0 || Save_status[0][0].Lead_Id_ > 0 || Save_status[0][0].Lead_Id > 0)) {
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved Successfully', Type: "false" } });
          this.Close_Click();
          this.Get_Leads();
        } else {
          console.warn('Save Lead failed result validation:', Save_status);
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured (Validation)', Type: "2" } });
        }
      },
      error: (err) => {
        console.error("Lead Save API ERROR:", err);
        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Server Error: ' + (err.message || 'Connection failed'), Type: "2" } });
      }
    });
  }

  Edit_Lead(lead_e: Lead) {
    this.Lead_ = Object.assign({}, lead_e);
    this.Lead_.Is_FollowUp = (this.Lead_.Is_FollowUp as any) == 1 ? true : false;

    // Deserialize comma-separated Vertical string back to number array
    if (this.Lead_.Vertical && String(this.Lead_.Vertical).trim() !== '') {
      this.Selected_Verticals = String(this.Lead_.Vertical).split(',').map(v => Number(v.trim())).filter(v => v > 0);
    } else {
      this.Selected_Verticals = [];
    }
    this.onVerticalChange();

    // Deserialize Enquiry_For string back to number array
    if (this.Lead_.Enquiry_For && String(this.Lead_.Enquiry_For).trim() !== '') {
      this.Selected_Enquiry_For = String(this.Lead_.Enquiry_For).split(',').map(v => Number(v.trim())).filter(v => v > 0);
    } else {
      this.Selected_Enquiry_For = [];
    }

    // Fix: Pre-populate FollowUp fields for Edit mode to ensure they are sent back correctly
    if (this.Lead_.Staff_Id > 0) this.Lead_.FollowUp_Staff_Id = this.Lead_.Staff_Id;
    if (this.Lead_.Department_Id > 0) this.Lead_.FollowUp_Department_Id = this.Lead_.Department_Id;
    if (this.Lead_.Status_Id > 0) this.Lead_.FollowUp_Status_Id = this.Lead_.Status_Id;
    if (this.Lead_.Location_Id > 0) this.Lead_.FollowUp_Location_Id = this.Lead_.Location_Id;
    
    this.Get_Lead_FollowUp_History(this.Lead_.Lead_Id);
    this.Entry_View = true;
  }

  Get_Lead_FollowUp_History(Lead_Id) {
    this.Lead_Service_.Get_Lead_FollowUp_History(Lead_Id).subscribe(Rows => {
      if (Rows && Rows[0]) {
         this.FollowUp_History = Rows[0];
      } else {
         this.FollowUp_History = [];
      }
    }, err => {
    });
  }

  Delete_Lead(Lead_Id, index) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Do you want to delete ?', Type: "true", Heading: 'Confirm' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Yes') {
        this.issLoading = true;
        this.Lead_Service_.Delete_Lead(Lead_Id).subscribe(Delete_status => {
          this.issLoading = false;
          this.Lead_Data.splice(index, 1);
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted Successfully', Type: "false" } });
        }, err => {
          this.issLoading = false;
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
      }
    });
  }

  // SIDE DRAWER LOGIC
  FollowUp_Drawer_Visible: boolean = false;

  Open_FollowUp_Drawer(lead) {
    console.log('Opening Follow-up Drawer for lead:', lead);
    // Initialize a proper new Lead instance to get all default properties
    this.Lead_ = new Lead();
    // Copy data from the selected lead
    Object.assign(this.Lead_, lead);
    
    // Specifically set the follow-up fields from current lead values
    this.Lead_.Is_FollowUp = true; 
    this.Lead_.FollowUp_Remark = '';
    this.Lead_.FollowUp_Next_Date = this.New_Date(new Date());

    // Initialize FollowUp_Date/Time
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    this.Lead_.FollowUp_Date = now.toISOString().slice(0, 16);
    
    
    // Explicitly map current IDs to Follow-up fields for the dropdowns to pre-select
    this.Lead_.FollowUp_Location_Id = lead.Location_Id;
    this.Lead_.FollowUp_Department_Id = lead.Department_Id;
    this.Lead_.FollowUp_Status_Id = lead.Status_Id;
    this.Lead_.FollowUp_Staff_Id = lead.Staff_Id;

    console.log('Lead object prepared for Drawer:', this.Lead_);
    console.log('Dropdown Data available:', {
      Location_Data: this.Location_Data.length,
      Department_Data: this.Department_Data.length,
      Status_Data: this.Status_Data.length,
      Staff_Data: this.Staff_Data.length
    });

    this.Get_Lead_FollowUp_History(lead.Lead_Id);
    this.FollowUp_Drawer_Visible = true;
  }

  Close_Drawer() {
    this.FollowUp_Drawer_Visible = false;
  }

  Save_FollowUp_Quick() {
    if (!this.Lead_.FollowUp_Status_Id) {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please select Status', Type: "2" } });
      return;
    }

    let Lead_Copy = Object.assign({}, this.Lead_);
    (Lead_Copy as any).Is_FollowUp = 1;

    // Sync current follow-up data to Lead master record
    Lead_Copy.Status_Id = this.Lead_.FollowUp_Status_Id;
    Lead_Copy.Department_Id = this.Lead_.FollowUp_Department_Id;
    Lead_Copy.Staff_Id = this.Lead_.FollowUp_Staff_Id;
    Lead_Copy.Next_FollowUp_Date = this.Lead_.FollowUp_Next_Date;

    // Sync Staff Name for immediate list update
    if (this.Staff_Data) {
      const selectedStaff = this.Staff_Data.find(s => s.User_Details_Id == Lead_Copy.Staff_Id);
      if (selectedStaff) {
        Lead_Copy.Staff_Name = selectedStaff.User_Details_Name;
        console.log('Synced Staff Name locally:', Lead_Copy.Staff_Name);
      }
    }

    console.log('Saving Lead Follow-up with payload:', Lead_Copy);

    // Format dates
    if (Lead_Copy.Entry_Date) Lead_Copy.Entry_Date = this.New_Date(new Date(Lead_Copy.Entry_Date));
    if (Lead_Copy.Next_FollowUp_Date) Lead_Copy.Next_FollowUp_Date = this.New_Date(new Date(Lead_Copy.Next_FollowUp_Date));
    if (Lead_Copy.FollowUp_Next_Date) Lead_Copy.FollowUp_Next_Date = this.New_Date(new Date(Lead_Copy.FollowUp_Next_Date));
    
    // BACKEND MAPPING: Ensure Next_FollowUp_Date is set for the new column
    Lead_Copy.Next_FollowUp_Date = Lead_Copy.FollowUp_Next_Date;

    // Get Login User Id
    const loginUser = localStorage.getItem('Login_User');
    if (loginUser) {
      Lead_Copy.Login_User_Id = Number(loginUser);
    }

    // Format FollowUp_Date (DateTime)
    if (Lead_Copy.FollowUp_Date) {
      Lead_Copy.FollowUp_Date = Lead_Copy.FollowUp_Date.replace('T', ' ');
    }





    console.log("Before Quick Follow-up Save API call");
    this.issLoading = true;

    this.Lead_Service_.Save_Lead(Lead_Copy)
    .pipe(
      finalize(() => {
        console.log("Quick Follow-up Save Finalize executed");
        this.issLoading = false;
      })
    )
    .subscribe({
      next: (Save_status) => {
        console.log("Quick Follow-up Save API Response:", Save_status);

        if (Save_status && Save_status[0] && Save_status[0][0] && (Save_status[0][0].Key_Id > 0 || Save_status[0][0].Lead_Id_ > 0)) {
          
          // Immediate local update for better UX
          const index = this.Lead_Data.findIndex(l => l.Lead_Id == Lead_Copy.Lead_Id);
          if (index > -1) {
            // Sync names for display
            const statusObj = this.Status_Data.find(s => s.Status_Id == Lead_Copy.Status_Id);
            if (statusObj) Lead_Copy.Status_Name = statusObj.Status_Name;
            
            const deptObj = this.Department_Data.find(d => d.Department_Id == Lead_Copy.Department_Id);
            if (deptObj) Lead_Copy.Department_Name = deptObj.Department_Name;

            this.Lead_Data[index] = Object.assign({}, Lead_Copy);
          }

          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Follow-up Updated', Type: "false" } });
          this.Close_Drawer();
          this.Get_Leads();
        } else {
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error updating follow-up', Type: "2" } });
        }
      },
      error: (err) => {
        console.error("Quick Follow-up Save API ERROR:", err);
        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Server Error: ' + (err.message || 'Connection failed'), Type: "2" } });
      }
    });
  }

  // REPROCESS LOGIC
  Reprocess_Click(lead) {
    if (!lead) {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please select a lead to reprocess.', Type: "2" } });
      return;
    }
    
    this.Lead_ = new Lead();
    Object.assign(this.Lead_, lead);
    
    this.Requirement_Details_Input = '';
    this.Reprocess_Drawer_Visible = true;
  }

  Close_Reprocess_Drawer() {
    this.Reprocess_Drawer_Visible = false;
    this.Requirement_Details_Input = '';
  }

  Save_Reprocess_Requirement() {
    if (!this.Requirement_Details_Input || this.Requirement_Details_Input.trim() === '') {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please enter Requirement Details.', Type: "3" } });
      return;
    }

    const Data = {
      Lead_Id: this.Lead_.Lead_Id,
      Lead_Name: this.Lead_.Lead_Name,
      Phone: this.Lead_.Phone,
      Email: this.Lead_.Email,
      Requirement_Details: this.Requirement_Details_Input,
      User_Id: Number(localStorage.getItem('Login_User') || 0)
    };

    console.log("Before Reprocess Requirement Save API call");
    this.issLoading = true;
    
    this.Requirement_Master_Service_.Save_Requirement(Data)
    .pipe(
      finalize(() => {
        console.log("Reprocess Requirement Save Finalize executed");
        this.issLoading = false;
      })
    )
    .subscribe({
      next: (Save_status) => {
        console.log("Reprocess Requirement Save API Response:", Save_status);
        if (Save_status && Save_status[0] && Save_status[0][0] && Save_status[0][0].RequirementMaster_Id > 0) {
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Reprocessed Successfully', Type: "false" } });
          this.Close_Reprocess_Drawer();
          
          // Navigate to Requirement List view (trigger)
          this.Open_Requirement_List();
        } else {
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        }
      },
      error: (err) => {
        console.error("Reprocess Requirement Save API ERROR:", err);
        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Server Error: ' + (err.message || 'Connection failed'), Type: "2" } });
      }
    });
  }

}
