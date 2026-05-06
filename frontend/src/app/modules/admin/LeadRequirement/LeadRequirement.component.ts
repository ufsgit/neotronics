import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lead } from '../../../models/Lead';
import { Lead_Service } from '../../../services/Lead.Service';
import { LeadRequirementService } from '../../../services/LeadRequirement.Service';
import { MatDialog } from '@angular/material';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';

type LeadRequirementDetailRow = {
  Item: string;
  Quantity: number;
  Remarks: string;
};

@Component({
  selector: 'app-LeadRequirement',
  templateUrl: './LeadRequirement.component.html',
  styleUrls: ['./LeadRequirement.component.css']
})
export class LeadRequirementComponent implements OnInit {
  issLoading = false;
  Entry_View = false;

  Lead_Data: Lead[] = [];
  Lead_Search_Text: any = '';
  Selected_Lead: Lead | null = null;
  private preselectLeadId = 0;

  Quotation_List: any[] = [];

  Requirement_Date: Date = new Date();
  Requirement_Notes = '';

  Requirement_Details: LeadRequirementDetailRow[] = [
    { Item: '', Quantity: 1, Remarks: '' }
  ];

  constructor(
    private leadService: Lead_Service,
    private leadRequirementService: LeadRequirementService,
    private router: Router,
    public dialogBox: MatDialog
  ) {}

  ngOnInit() {
    const leadFromLeadPage = localStorage.getItem('Lead_For_Requirement');
    if (leadFromLeadPage) {
      try {
        const parsed = JSON.parse(leadFromLeadPage);
        if (parsed && parsed.Lead_Id) {
          this.preselectLeadId = Number(parsed.Lead_Id || 0);
          this.Entry_View = true;
        }
      } catch (e) {}
    }

    this.loadLeads();
    this.loadQuotationList();
  }

  loadLeads() {
    this.leadService.Get_Leads().subscribe(rows => {
      if (rows && Array.isArray(rows) && rows[0] && Array.isArray(rows[0])) {
        this.Lead_Data = rows[0];
      } else {
        this.Lead_Data = [];
      }

      if (this.preselectLeadId > 0) {
        const found = this.Lead_Data.find(l => Number(l.Lead_Id) === Number(this.preselectLeadId));
        if (found) {
          this.Selected_Lead = found;
          // Keep the autocomplete input in sync (displayWith uses object)
          this.Lead_Search_Text = found;
        }
      }
    }, _err => {
      this.Lead_Data = [];
    });
  }

  loadQuotationList() {
    this.issLoading = true;
    const leadId = this.Selected_Lead ? this.Selected_Lead.Lead_Id : 0;
    this.leadRequirementService.List(leadId).subscribe(rows => {
      this.Quotation_List = rows && rows[0] ? rows[0] : (Array.isArray(rows) ? rows : []);
      this.issLoading = false;
    }, _err => {
      this.Quotation_List = [];
      this.issLoading = false;
    });
  }

  displayLead(lead?: Lead): string {
    return lead ? lead.Lead_Name : '';
  }

  onLeadSelected(lead: Lead) {
    this.Selected_Lead = lead;
    this.Lead_Search_Text = lead;
  }

  Create_New() {
    this.Entry_View = true;
    this.Selected_Lead = null;
    this.Lead_Search_Text = '';
    this.preselectLeadId = 0;
    this.Requirement_Date = new Date();
    this.Requirement_Notes = '';
    this.Requirement_Details = [{ Item: '', Quantity: 1, Remarks: '' }];
    localStorage.removeItem('Lead_For_Requirement');
  }

  Close_Click() {
    this.Entry_View = false;
    this.Selected_Lead = null;
    this.Lead_Search_Text = '';
    this.preselectLeadId = 0;
    this.loadQuotationList();
  }

  Open_Transaction(masterId: number) {
    if (!masterId) return;
    this.router.navigateByUrl('/LeadRequirementTransaction/' + masterId);
  }

  addDetailRow() {
    this.Requirement_Details.push({ Item: '', Quantity: 1, Remarks: '' });
  }

  removeDetailRow(i: number) {
    if (this.Requirement_Details.length <= 1) return;
    this.Requirement_Details.splice(i, 1);
  }

  Add_Requirement() {
    if (!this.Selected_Lead || !this.Selected_Lead.Lead_Id) {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Lead Name', Type: '3' } });
      return;
    }
    const hasAtLeastOneItem = this.Requirement_Details.some(d => String(d.Item || '').trim() !== '');
    if (!hasAtLeastOneItem) {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Add at least one Requirement Detail item', Type: '3' } });
      return;
    }

    const payload = {
      Lead_Id: this.Selected_Lead.Lead_Id,
      Lead_Name: this.Selected_Lead.Lead_Name,
      Phone: this.Selected_Lead.Phone,
      Contact_Person: this.Selected_Lead.Contact_Person,
      Contact_Number: (this.Selected_Lead as any).Contact_Number || '',
      Email: this.Selected_Lead.Email,
      Address: this.Selected_Lead.Address,
      Requirement_Date: this.Requirement_Date,
      Notes: this.Requirement_Notes,
      Details: this.Requirement_Details
        .filter(d => String(d.Item || '').trim() !== '')
        .map(d => ({ ...d, Quantity: Number(d.Quantity || 0) }))
    };

    this.issLoading = true;
    this.leadRequirementService.Save(payload).subscribe(saveStatus => {
      this.issLoading = false;
      const id = (saveStatus && saveStatus[0] && saveStatus[0].LeadRequirementMaster_Id_)
        ? Number(saveStatus[0].LeadRequirementMaster_Id_)
        : (saveStatus && saveStatus.LeadRequirementMaster_Id_ ? Number(saveStatus.LeadRequirementMaster_Id_) : 0);
      if (id > 0) {
        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved', Type: 'false' } });
        this.router.navigateByUrl('/LeadRequirementTransaction/' + id);
      } else {
        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: '2' } });
      }
    }, _err => {
      this.issLoading = false;
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Connection Error', Type: '2' } });
    });
  }
}
