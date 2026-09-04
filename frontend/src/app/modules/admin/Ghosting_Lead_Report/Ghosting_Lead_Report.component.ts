import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ghosting-lead-report',
  templateUrl: './Ghosting_Lead_Report.component.html',
  styleUrls: ['./Ghosting_Lead_Report.component.css']
})
export class Ghosting_Lead_ReportComponent implements OnInit {

  // Dummy data for design preview
  Ghosting_Data: any[] = [
    { Lead_Name: 'Acme Corp', Pipeline_Stage: 'Negotiation', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'John Doe', Entry_Date: '2026-09-01' },
    { Lead_Name: 'Acme Corp 2', Pipeline_Stage: 'Negotiation', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'John Doe', Entry_Date: '2026-09-01' },
    { Lead_Name: 'Acme Corp 3', Pipeline_Stage: 'Negotiation', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'John Doe', Entry_Date: '2026-09-01' },
    { Lead_Name: 'Acme Corp 4', Pipeline_Stage: 'Negotiation', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'John Doe', Entry_Date: '2026-09-01' },
    { Lead_Name: 'Acme Corp 5', Pipeline_Stage: 'Negotiation', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'John Doe', Entry_Date: '2026-09-01' },
    { Lead_Name: 'Stark Industries', Pipeline_Stage: 'Initial Contact', Pulse: 'Ghosting', Current_Status: 'Closed Lost', login_user_name: 'Jane Smith', Entry_Date: '2026-08-25' },
    { Lead_Name: 'Stark Industries 2', Pipeline_Stage: 'Initial Contact', Pulse: 'Ghosting', Current_Status: 'Closed Lost', login_user_name: 'Jane Smith', Entry_Date: '2026-08-25' },
    { Lead_Name: 'Stark Industries 3', Pipeline_Stage: 'Initial Contact', Pulse: 'Ghosting', Current_Status: 'Closed Lost', login_user_name: 'Jane Smith', Entry_Date: '2026-08-25' },
    { Lead_Name: 'Stark Industries 4', Pipeline_Stage: 'Initial Contact', Pulse: 'Ghosting', Current_Status: 'Closed Lost', login_user_name: 'Jane Smith', Entry_Date: '2026-08-25' },
    { Lead_Name: 'Wayne Enterprises', Pipeline_Stage: 'Quotation Sent', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'Bruce W.', Entry_Date: '2026-09-03' },
    { Lead_Name: 'Wayne Enterprises 2', Pipeline_Stage: 'Quotation Sent', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'Bruce W.', Entry_Date: '2026-09-03' },
    { Lead_Name: 'Wayne Enterprises 3', Pipeline_Stage: 'Quotation Sent', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'Bruce W.', Entry_Date: '2026-09-03' },
    { Lead_Name: 'LexCorp', Pipeline_Stage: 'Demo Scheduled', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'Clark K.', Entry_Date: '2026-09-02' },
    { Lead_Name: 'LexCorp 2', Pipeline_Stage: 'Demo Scheduled', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'Clark K.', Entry_Date: '2026-09-02' },
    { Lead_Name: 'Oscorp', Pipeline_Stage: 'Technical Review', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'Peter P.', Entry_Date: '2026-09-01' },
    { Lead_Name: 'Daily Bugle', Pipeline_Stage: 'Proposal Sent', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'Jonah J.', Entry_Date: '2026-08-30' },
    { Lead_Name: 'Umbrella Corp', Pipeline_Stage: 'Contract Review', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'Alice', Entry_Date: '2026-08-29' },
    { Lead_Name: 'Cyberdyne', Pipeline_Stage: 'Security Review', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'Sarah C.', Entry_Date: '2026-08-28' },
    { Lead_Name: 'InGen', Pipeline_Stage: 'Legal Review', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'John H.', Entry_Date: '2026-08-27' },
    { Lead_Name: 'Massive Dynamic', Pipeline_Stage: 'Verbal Approval', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'Olivia D.', Entry_Date: '2026-08-26' },
    { Lead_Name: 'Tyrell Corp', Pipeline_Stage: 'Onboarding', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'Rick D.', Entry_Date: '2026-08-25' },
    { Lead_Name: 'Weyland-Yutani', Pipeline_Stage: 'Implementation', Pulse: 'Ghosting', Current_Status: 'Active', login_user_name: 'Ellen R.', Entry_Date: '2026-08-24' }
  ];

  Search_FromDate: Date = new Date();
  Search_ToDate: Date = new Date();
  myInnerHeight: number = 600;

  get Stage_Summary(): { stage: string, count: number, bgColor: string, textColor: string, titleColor: string }[] {
    const counts = this.Ghosting_Data.reduce((acc, curr) => {
      acc[curr.Pipeline_Stage] = (acc[curr.Pipeline_Stage] || 0) + 1;
      return acc;
    }, {});
    
    let summary = Object.keys(counts).map(key => ({
      stage: key,
      count: counts[key]
    })).filter(x => x.count >= 1);

    // Sort descending by count
    summary.sort((a, b) => b.count - a.count);

    const total = summary.length;

    return summary.map((item, index) => {
      // Interpolate colors based on index to smoothly transition no matter how many items
      const ratio = total > 1 ? index / (total - 1) : 0;
      
      const bgL = 85 + (ratio * 13); // 85% to 98% lightness (vibrant to very light)
      const textL = 40 + (ratio * 20); // 40% to 60% lightness
      const titleL = 25 + (ratio * 20); // 25% to 45% lightness

      return {
        ...item,
        bgColor: `hsl(43, 100%, ${bgL}%)`,
        textColor: `hsl(35, 100%, ${textL}%)`,
        titleColor: `hsl(25, 100%, ${titleL}%)`
      };
    });
  }

  showAllCards: boolean = false;
  Date_Option: string = 'Custom';

  constructor() { }

  ngOnInit() {
    this.onDateOptionChange();
  }

  onDateOptionChange() {
    const today = new Date();
    
    if (this.Date_Option === 'Custom') {
      // Default to today
      this.Search_FromDate = new Date();
      this.Search_ToDate = new Date();
    } else if (this.Date_Option === 'This Month') {
      this.Search_FromDate = new Date(today.getFullYear(), today.getMonth(), 1);
      this.Search_ToDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (this.Date_Option === 'This Year') {
      this.Search_FromDate = new Date(today.getFullYear(), 0, 1);
      this.Search_ToDate = new Date(today.getFullYear(), 11, 31);
    } else if (this.Date_Option === 'Previous Year') {
      this.Search_FromDate = new Date(today.getFullYear() - 1, 0, 1);
      this.Search_ToDate = new Date(today.getFullYear() - 1, 11, 31);
    }
  }

  Search_Leads() {
    // Dummy function for UI
  }

  Export() {
    // Dummy function for UI
  }

}
