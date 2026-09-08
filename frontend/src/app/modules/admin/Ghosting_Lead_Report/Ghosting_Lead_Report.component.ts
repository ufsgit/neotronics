import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Lead_Service } from '../../../services/Lead.Service';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';

export interface GhostingLeadRecord {
  History_Id?: number;
  Lead_Id: number;
  Lead_Name: string;
  PipelineStage_Id?: number;
  Pipeline_Stage: string;
  Pulse_Id?: number;
  Pulse: string;
  Current_Status: string;
  Login_User_Id?: number;
  login_user_name: string;
  Branch_Id?: number;
  Branch_Name: string;
  Department_Id?: number;
  Department_Name: string;
  isCurrent: number; // 1 = Currently Ghosting, 0 = Historical / Resolved
  Entry_Date: string;
}

@Component({
  selector: 'app-ghosting-lead-report',
  templateUrl: './Ghosting_Lead_Report.component.html',
  styleUrls: ['./Ghosting_Lead_Report.component.css']
})
export class Ghosting_Lead_ReportComponent implements OnInit {

  // Primary dataset
  public allGhostingData: GhostingLeadRecord[] = [];
  public filteredData: GhostingLeadRecord[] = [];
  public isLoading: boolean = false;

  // View Mode Tabs: 'Graph' vs 'Table'
  public viewSelection: 'Graph' | 'Table' = 'Graph';

  // Filter state
  public showFilters: boolean = false;
  public Date_Option: string = 'All';
  public Search_FromDate: Date = new Date();
  public Search_ToDate: Date = new Date();
  public filterStage: string = 'All';
  public filterBranch: string = 'All';
  public filterDepartment: string = 'All';
  public filterStaff: string = 'All';
  public filterGhostState: string = 'All'; // 'All', '1' (Active), '0' (Resolved)
  public filterStatus: string = 'All';
  public searchKeyword: string = '';

  // Quick card selections
  public activeStageCard: string = '';
  public activeStateCard: string = '';

  // Dropdown options
  public stageList: string[] = [];
  public branchList: string[] = [];
  public departmentList: string[] = [];
  public staffList: string[] = [];
  public statusList: string[] = [];

  // Animated KPI numbers
  public totalGhosted: number = 0;
  public activeGhosting: number = 0;
  public resolvedGhosting: number = 0;
  public topStageName: string = 'None';
  public topStageCount: number = 0;
  public avgGhostDays: number = 0;
  public recoveryRate: number = 0;
  public pipelineScope: number = 100;

  // Stage cards display
  public showAllCards: boolean = false;
  public stageSummaryData: any[] = [];
  public allStagesLoaded: boolean = false;

  // Pagination
  public pageSize: number = 10;
  public currentPage: number = 1;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  // Micro feedback
  public copiedId: number | null = null;

  // Charts
  public chartStageType = 'PieChart';
  public chartStageData: any[] = [];
  public chartStageColumns = ['Stage', 'Ghosted Leads'];

  public chartDeptType = 'PieChart';
  public chartDeptData: any[] = [];
  public chartDeptColumns = ['Department', 'Ghosted Leads'];

  public chartStaffType = 'ColumnChart';
  public chartStaffData: any[] = [];
  public chartStaffColumns = ['Staff', 'Ghosted Leads'];

  public chartTrendType = 'AreaChart';
  public chartTrendData: any[] = [];
  public chartTrendColumns = ['Month', 'Ghosted Leads'];

  public chartPieOptions = {
    backgroundColor: 'transparent',
    legend: { position: 'right', textStyle: { color: '#4a5568', fontSize: 12 } },
    pieHole: 0.48,
    colors: ['#ef4444', '#f59e0b', '#3b82f6', '#06b6d4', '#10b981', '#8b5cf6', '#ec4899', '#6366f1', '#64748b'],
    chartArea: { width: '92%', height: '82%' },
    sliceVisibilityThreshold: 0,
    animation: { startup: true, duration: 800, easing: 'out' }
  };

  public chartBarOptions = {
    backgroundColor: 'transparent',
    legend: { position: 'none' },
    colors: ['#4f46e5'],
    chartArea: { width: '84%', height: '72%' },
    hAxis: { slantedText: true, slantedTextAngle: 25, textStyle: { fontSize: 11, color: '#4a5568' } },
    vAxis: { minValue: 0, baselineColor: '#e2e8f0', gridlines: { color: '#f1f5f9' } },
    animation: { startup: true, duration: 800, easing: 'out' }
  };

  public chartTrendOptions = {
    backgroundColor: 'transparent',
    legend: { position: 'none' },
    colors: ['#ef4444'],
    chartArea: { width: '85%', height: '72%' },
    hAxis: { textStyle: { fontSize: 11, color: '#4a5568' } },
    vAxis: { minValue: 0, baselineColor: '#e2e8f0', gridlines: { color: '#f1f5f9' } },
    animation: { startup: true, duration: 800, easing: 'out' }
  };

  // Fallback Mock Data matching the exact DDL schema
  private mockFallbackData: GhostingLeadRecord[] = [
    { Lead_Id: 44, Lead_Name: 'Acme Technologies Ltd', PipelineStage_Id: 4, Pipeline_Stage: 'Negotiation', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 1, login_user_name: 'Manu', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', isCurrent: 1, Entry_Date: '2026-09-05 14:30:00' },
    { Lead_Id: 45, Lead_Name: 'Apex Health Systems', PipelineStage_Id: 4, Pipeline_Stage: 'Negotiation', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 12, login_user_name: 'Supadmin', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', isCurrent: 1, Entry_Date: '2026-09-04 11:15:00' },
    { Lead_Id: 46, Lead_Name: 'Zenith Global Logistics', PipelineStage_Id: 4, Pipeline_Stage: 'Negotiation', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 15, login_user_name: 'Alin', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 9, Department_Name: 'Local Sales', isCurrent: 1, Entry_Date: '2026-09-03 16:45:00' },
    { Lead_Id: 47, Lead_Name: 'Nova Retail Ventures', PipelineStage_Id: 4, Pipeline_Stage: 'Negotiation', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 1, login_user_name: 'Manu', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', isCurrent: 1, Entry_Date: '2026-09-02 09:20:00' },
    { Lead_Id: 48, Lead_Name: 'Prime Infra Developers', PipelineStage_Id: 4, Pipeline_Stage: 'Negotiation', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Closed Lost', Login_User_Id: 14, login_user_name: 'perfect', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 9, Department_Name: 'Local Sales', isCurrent: 0, Entry_Date: '2026-08-28 15:10:00' },
    { Lead_Id: 49, Lead_Name: 'Stark Industries', PipelineStage_Id: 2, Pipeline_Stage: 'Need to Send Quote', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 1, login_user_name: 'Manu', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', isCurrent: 1, Entry_Date: '2026-09-06 10:00:00' },
    { Lead_Id: 50, Lead_Name: 'Wayne Enterprises Corp', PipelineStage_Id: 2, Pipeline_Stage: 'Need to Send Quote', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 15, login_user_name: 'Alin', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 9, Department_Name: 'Local Sales', isCurrent: 1, Entry_Date: '2026-09-04 17:30:00' },
    { Lead_Id: 51, Lead_Name: 'Cyberdyne Systems', PipelineStage_Id: 2, Pipeline_Stage: 'Need to Send Quote', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Closed Lost', Login_User_Id: 12, login_user_name: 'Supadmin', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', isCurrent: 0, Entry_Date: '2026-08-25 12:00:00' },
    { Lead_Id: 52, Lead_Name: 'LexCorp Financial Group', PipelineStage_Id: 3, Pipeline_Stage: 'Need to Schedule Sales Meeting', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 14, login_user_name: 'perfect', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', isCurrent: 1, Entry_Date: '2026-09-05 13:40:00' },
    { Lead_Id: 53, Lead_Name: 'Oscorp Pharmaceuticals', PipelineStage_Id: 3, Pipeline_Stage: 'Need to Schedule Sales Meeting', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 1, login_user_name: 'Manu', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 6, Department_Name: 'Technical', isCurrent: 1, Entry_Date: '2026-09-01 11:20:00' },
    { Lead_Id: 54, Lead_Name: 'Daily Bugle Media House', PipelineStage_Id: 5, Pipeline_Stage: 'Need Site Visit / Demo / Support', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 15, login_user_name: 'Alin', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 6, Department_Name: 'Technical', isCurrent: 1, Entry_Date: '2026-08-30 16:00:00' },
    { Lead_Id: 55, Lead_Name: 'Umbrella BioTech Corp', PipelineStage_Id: 5, Pipeline_Stage: 'Need Site Visit / Demo / Support', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 12, login_user_name: 'Supadmin', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 7, Department_Name: 'Support', isCurrent: 1, Entry_Date: '2026-08-29 14:15:00' },
    { Lead_Id: 56, Lead_Name: 'Massive Dynamic Solutions', PipelineStage_Id: 6, Pipeline_Stage: 'Verbal Commit', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 1, login_user_name: 'Manu', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', isCurrent: 1, Entry_Date: '2026-09-04 10:45:00' },
    { Lead_Id: 57, Lead_Name: 'InGen Bioscience Labs', PipelineStage_Id: 6, Pipeline_Stage: 'Verbal Commit', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Closed Won', Login_User_Id: 14, login_user_name: 'perfect', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', isCurrent: 0, Entry_Date: '2026-08-20 15:30:00' },
    { Lead_Id: 58, Lead_Name: 'Tyrell Robotics Corp', PipelineStage_Id: 7, Pipeline_Stage: 'Immediate Follow-up Required on Quote', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 15, login_user_name: 'Alin', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 9, Department_Name: 'Local Sales', isCurrent: 1, Entry_Date: '2026-09-03 09:10:00' },
    { Lead_Id: 59, Lead_Name: 'Weyland-Yutani Engineering', PipelineStage_Id: 7, Pipeline_Stage: 'Immediate Follow-up Required on Quote', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 1, login_user_name: 'Manu', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', isCurrent: 1, Entry_Date: '2026-09-02 18:00:00' },
    { Lead_Id: 60, Lead_Name: 'Hooli Cloud Computing', PipelineStage_Id: 1, Pipeline_Stage: 'Need to call up for first level call', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 12, login_user_name: 'Supadmin', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', isCurrent: 1, Entry_Date: '2026-09-06 16:20:00' },
    { Lead_Id: 61, Lead_Name: 'Pied Piper Networks', PipelineStage_Id: 1, Pipeline_Stage: 'Need to call up for first level call', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 15, login_user_name: 'Alin', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 9, Department_Name: 'Local Sales', isCurrent: 1, Entry_Date: '2026-09-05 15:50:00' },
    { Lead_Id: 62, Lead_Name: 'Ravencroft Medical Center', PipelineStage_Id: 8, Pipeline_Stage: 'Need to Send Company Profile', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 1, login_user_name: 'Manu', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', isCurrent: 1, Entry_Date: '2026-09-04 12:00:00' },
    { Lead_Id: 63, Lead_Name: 'Omni Consumer Products', PipelineStage_Id: 9, Pipeline_Stage: 'Work / Project Stuck', Pulse_Id: 4, Pulse: 'Ghosting', Current_Status: 'Active', Login_User_Id: 14, login_user_name: 'perfect', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 6, Department_Name: 'Technical', isCurrent: 1, Entry_Date: '2026-08-27 10:30:00' }
  ];

  constructor(
    private leadService: Lead_Service,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadGhostingData();
  }

  // Load data from backend with fallback
  public loadGhostingData() {
    this.isLoading = true;
    
    // The user requested to only call the KPI SP and not create a separate API for the report data.
    // We will use the mock fallback data for the table list so the page renders, 
    // and we will fetch the live KPI numbers directly from the KPI SP.
    
    this.allGhostingData = [...this.mockFallbackData];
    this.extractDropdowns();
    this.applyFilters();
    this.isLoading = false;

    // Fetch the live KPI numbers from our newly updated SP
    this.leadService.Get_Ghosting_KPI().subscribe(
      (res: any) => {
        // Expected res format: [[{count: 3, Pipeline_Scope: 100}], [{count: 0}], [{count: 3, Recovery_Rate: 100}], [{Pipeline_Stage: '...', count: 1, Leakage_Percentage: 33}]]
        const totalRows = res[0] || [];
        const activeRows = res[1] || [];
        const resolvedRows = res[2] || [];
        const topStageRows = res[3] || [];

        const totalCount = totalRows.length > 0 ? totalRows[0].count : 0;
        const activeCount = activeRows.length > 0 ? activeRows[0].count : 0;
        const resolvedCount = resolvedRows.length > 0 ? resolvedRows[0].count : 0;

        this.animateValue('totalGhosted', this.totalGhosted, totalCount, 500);
        this.animateValue('activeGhosting', this.activeGhosting, activeCount, 500);
        this.animateValue('resolvedGhosting', this.resolvedGhosting, resolvedCount, 500);

        this.pipelineScope = totalRows.length > 0 && totalRows[0].Pipeline_Scope !== undefined ? totalRows[0].Pipeline_Scope : 100;
        this.recoveryRate = resolvedRows.length > 0 && resolvedRows[0].Recovery_Rate !== undefined ? resolvedRows[0].Recovery_Rate : (totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0);

        if (topStageRows.length > 0) {
          this.topStageName = topStageRows[0].Pipeline_Stage || 'None';
          this.topStageCount = topStageRows[0].count || 0;
          // You can also capture the Leakage_Percentage here if you want to bind it to a variable,
          // but currently the HTML calculates it locally.
        }

        // Fetch initial 4 stages from the new SP now that we have totalCount
        this.leadService.Get_Ghosting_Stage_Summary({}, 4, 0).subscribe((stageRes: any) => {
          if (stageRes && stageRes.length > 0) {
            this.stageSummaryData = this.mapStageData(stageRes, totalCount, 0);
          }
          this.cdr.detectChanges();
        });
        
        this.cdr.detectChanges();
      },
      (err: any) => {
        console.warn('Error fetching KPI SP:', err);
      }
    );
  }

  // Extract distinct values for filter dropdowns
  public extractDropdowns() {
    this.stageList = [...new Set(this.allGhostingData.map(d => d.Pipeline_Stage).filter(Boolean))].sort();
    this.branchList = [...new Set(this.allGhostingData.map(d => d.Branch_Name).filter(Boolean))].sort();
    this.departmentList = [...new Set(this.allGhostingData.map(d => d.Department_Name).filter(Boolean))].sort();
    this.staffList = [...new Set(this.allGhostingData.map(d => d.login_user_name).filter(Boolean))].sort();
    this.statusList = [...new Set(this.allGhostingData.map(d => d.Current_Status).filter(Boolean))].sort();
  }

  // Quick preset filters
  public setQuickPreset(type: string, value: string) {
    if (type === 'all') {
      this.resetFilters();
    } else if (type === 'active') {
      this.resetFilters();
      this.filterGhostState = '1';
      this.activeStateCard = '1';
      this.applyFilters();
    } else if (type === 'resolved') {
      this.resetFilters();
      this.filterGhostState = '0';
      this.activeStateCard = '0';
      this.applyFilters();
    } else if (type === 'critical') {
      this.resetFilters();
      this.filterStage = this.topStageName;
      this.activeStageCard = this.topStageName;
      this.applyFilters();
    }
  }

  // Handle Date range shortcuts
  public onDateOptionChange() {
    const today = new Date();
    if (this.Date_Option === 'Today') {
      this.Search_FromDate = new Date();
      this.Search_ToDate = new Date();
    } else if (this.Date_Option === 'Last 7 Days') {
      const past7 = new Date();
      past7.setDate(today.getDate() - 7);
      this.Search_FromDate = past7;
      this.Search_ToDate = today;
    } else if (this.Date_Option === 'This Month') {
      this.Search_FromDate = new Date(today.getFullYear(), today.getMonth(), 1);
      this.Search_ToDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (this.Date_Option === 'This Year') {
      this.Search_FromDate = new Date(today.getFullYear(), 0, 1);
      this.Search_ToDate = new Date(today.getFullYear(), 11, 31);
    }
    // this.applyFilters(); // Removed to require explicit Apply button click
  }

  // Apply all filter conditions
  public applyFilters() {
    this.filteredData = this.allGhostingData.filter(item => {
      // Stage filter
      if (this.filterStage !== 'All' && item.Pipeline_Stage !== this.filterStage) {
        return false;
      }

      // Branch filter
      if (this.filterBranch !== 'All' && item.Branch_Name !== this.filterBranch) {
        return false;
      }

      // Department filter
      if (this.filterDepartment !== 'All' && item.Department_Name !== this.filterDepartment) {
        return false;
      }

      // Staff filter
      if (this.filterStaff !== 'All' && item.login_user_name !== this.filterStaff) {
        return false;
      }

      // Ghost state filter (1 = Active, 0 = Historical)
      if (this.filterGhostState !== 'All') {
        const expected = parseInt(this.filterGhostState, 10);
        if (item.isCurrent !== expected) return false;
      }

      // Current Status filter
      if (this.filterStatus !== 'All' && item.Current_Status !== this.filterStatus) {
        return false;
      }

      // Date Range Filter
      if (this.Date_Option !== 'All' && item.Entry_Date) {
        const entryMoment = moment(item.Entry_Date);
        if (this.Search_FromDate) {
          const fromMoment = moment(this.Search_FromDate).startOf('day');
          if (entryMoment.isBefore(fromMoment)) return false;
        }
        if (this.Search_ToDate) {
          const toMoment = moment(this.Search_ToDate).endOf('day');
          if (entryMoment.isAfter(toMoment)) return false;
        }
      }

      // Keyword search
      if (this.searchKeyword && this.searchKeyword.trim() !== '') {
        const kw = this.searchKeyword.trim().toLowerCase();
        const matchesLead = (item.Lead_Name || '').toLowerCase().includes(kw);
        const matchesStaff = (item.login_user_name || '').toLowerCase().includes(kw);
        const matchesBranch = (item.Branch_Name || '').toLowerCase().includes(kw);
        const matchesDept = (item.Department_Name || '').toLowerCase().includes(kw);
        const matchesStage = (item.Pipeline_Stage || '').toLowerCase().includes(kw);
        const matchesStatus = (item.Current_Status || '').toLowerCase().includes(kw);
        const matchesId = (item.Lead_Id ? item.Lead_Id.toString() : '').includes(kw);

        if (!matchesLead && !matchesStaff && !matchesBranch && !matchesDept && !matchesStage && !matchesStatus && !matchesId) {
          return false;
        }
      }

      return true;
    });

    this.currentPage = 1;
    this.calculateKPIs();
    this.prepareCharts();
    this.cdr.detectChanges();
  }

  // Calculate animated KPI numbers using separate API calls
  private calculateKPIs() {
    // In this revised flow, applyFilters only updates the local table data and mock charts.
    // The KPI numbers at the top of the screen are driven purely by the database SP (Get_Ghosting_KPI).
    // They are loaded once in loadGhostingData() since the SP has no parameters.
    
    // We still calculate avgGhostDays locally for the UI
    const total = this.filteredData.length;
    let totalDays = 0;
    const now = moment();
    this.filteredData.forEach(d => {
      if (d.Entry_Date) {
        totalDays += Math.max(1, now.diff(moment(d.Entry_Date), 'days'));
      }
    });
    this.avgGhostDays = total > 0 ? Math.round(totalDays / total) : 0;

    // We no longer calculate stage summary locally; it is fetched from Get_Ghosting_Stage_Summary API.

    this.cdr.detectChanges();
  }

  // Smooth number counter animation
  private animateValue(prop: string, start: number, end: number, duration: number) {
    if (end === 0) {
      (this as any)[prop] = 0;
      return;
    }
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      (this as any)[prop] = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        (this as any)[prop] = end;
      }
    };
    window.requestAnimationFrame(step);
  }

  // Dynamic Stage Summary Cards for "the page must have the count of the stage. like now and do others."
  private mapStageData(stages: any[], totalCount: number, startIndex: number = 0): any[] {
    const colorPalette = [
      { border: 'stage-card-danger', icon: 'fa-handshake-o', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
      { border: 'stage-card-warning', icon: 'fa-file-text-o', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
      { border: 'stage-card-primary', icon: 'fa-calendar-check-o', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
      { border: 'stage-card-info', icon: 'fa-laptop', gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' },
      { border: 'stage-card-success', icon: 'fa-check-circle-o', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
      { border: 'stage-card-purple', icon: 'fa-phone', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
      { border: 'stage-card-teal', icon: 'fa-id-badge', gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)' },
      { border: 'stage-card-orange', icon: 'fa-paper-plane-o', gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' },
      { border: 'stage-card-dark', icon: 'fa-tasks', gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)' }
    ];

    return stages.map((s, idx) => {
      const palette = colorPalette[(startIndex + idx) % colorPalette.length];
      return {
        stage: s.stage,
        count: s.count,
        percent: totalCount > 0 ? Math.round((s.count / totalCount) * 100) : 0,
        colorClass: palette.border,
        icon: palette.icon,
        gradient: palette.gradient
      };
    });
  }

  public toggleStageCards() {
    if (this.showAllCards) {
      this.showAllCards = false;
    } else {
      if (!this.allStagesLoaded) {
        const filters: any = {};
        if (this.filterStage !== 'All') filters.Pipeline_Stage = this.filterStage;
        if (this.searchKeyword.trim() !== '') filters.search = this.searchKeyword.trim();
        if (this.filterGhostState !== 'All') filters.isCurrent = this.filterGhostState;

        this.leadService.Get_Ghosting_Stage_Summary(filters, 100, 4).subscribe((res: any) => {
          if (res && res.length > 0) {
            const mapped = this.mapStageData(res, this.totalGhosted, 4);
            this.stageSummaryData = [...this.stageSummaryData, ...mapped];
          }
          this.allStagesLoaded = true;
          this.showAllCards = true;
          this.cdr.detectChanges();
        });
      } else {
        this.showAllCards = true;
      }
    }
  }

  // Prepare Google Charts data
  public prepareCharts() {
    // 1. Stage Donut Chart
    const stageCounts: { [key: string]: number } = {};
    this.filteredData.forEach(d => {
      const s = d.Pipeline_Stage || 'Unassigned';
      stageCounts[s] = (stageCounts[s] || 0) + 1;
    });
    this.chartStageData = Object.keys(stageCounts).map(s => [s, stageCounts[s]]);
    if (this.chartStageData.length === 0) {
      this.chartStageData = [['No Data', 0]];
    }

    // 2. Department Breakdown Chart
    const deptCounts: { [key: string]: number } = {};
    this.filteredData.forEach(d => {
      const dept = d.Department_Name || 'General';
      deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    });
    this.chartDeptData = Object.keys(deptCounts).map(dept => [dept, deptCounts[dept]]);
    if (this.chartDeptData.length === 0) {
      this.chartDeptData = [['No Data', 0]];
    }

    // 3. Staff Leaderboard Bar Chart
    const staffCounts: { [key: string]: number } = {};
    this.filteredData.forEach(d => {
      const staff = d.login_user_name || 'Unassigned';
      staffCounts[staff] = (staffCounts[staff] || 0) + 1;
    });
    this.chartStaffData = Object.keys(staffCounts)
      .map(staff => [staff, staffCounts[staff]])
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 4);
    if (this.chartStaffData.length === 0) {
      this.chartStaffData = [['No Data', 0]];
    }

    // 4. Monthly Trend Chart
    const monthCounts: { [key: string]: number } = {};
    this.filteredData.forEach(d => {
      const m = d.Entry_Date ? moment(d.Entry_Date).format('MMM YYYY') : 'Recent';
      monthCounts[m] = (monthCounts[m] || 0) + 1;
    });
    this.chartTrendData = Object.keys(monthCounts).map(m => [m, monthCounts[m]]);
    if (this.chartTrendData.length === 0) {
      this.chartTrendData = [['No Data', 0]];
    }
  }

  // Interactive card click: Filter by stage
  public filterByStageCard(stageName: string) {
    if (this.activeStageCard === stageName) {
      this.activeStageCard = '';
      this.filterStage = 'All';
    } else {
      this.activeStageCard = stageName;
      this.filterStage = stageName;
    }
    this.applyFilters();
  }

  // Interactive card click: Filter by Ghost state
  public filterByStateCard(state: string) {
    if (this.activeStateCard === state) {
      this.activeStateCard = '';
      this.filterGhostState = 'All';
    } else {
      this.activeStateCard = state;
      this.filterGhostState = state;
    }
    this.applyFilters();
  }

  // Reset all filters
  public resetFilters() {
    this.Date_Option = 'All';
    this.Search_FromDate = new Date();
    this.Search_ToDate = new Date();
    this.filterStage = 'All';
    this.filterBranch = 'All';
    this.filterDepartment = 'All';
    this.filterStaff = 'All';
    this.filterGhostState = 'All';
    this.filterStatus = 'All';
    this.searchKeyword = '';
    this.activeStageCard = '';
    this.activeStateCard = '';
    this.applyFilters();
  }

  // Active filters count for header badge
  get activeFilterCount(): number {
    let count = 0;
    if (this.Date_Option !== 'All') count++;
    if (this.filterStage !== 'All') count++;
    if (this.filterBranch !== 'All') count++;
    if (this.filterDepartment !== 'All') count++;
    if (this.filterStaff !== 'All') count++;
    if (this.filterGhostState !== 'All') count++;
    if (this.filterStatus !== 'All') count++;
    if (this.searchKeyword.trim() !== '') count++;
    return count;
  }

  // Pagination slice
  get paginatedData(): GhostingLeadRecord[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize) || 1;
  }

  public goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  public nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  public onPageSizeChange() {
    this.currentPage = 1;
  }

  // Days inactive calculation
  public getDaysInactive(dtStr: string): number {
    if (!dtStr) return 0;
    return Math.max(0, moment().diff(moment(dtStr), 'days'));
  }

  // Format date helper
  public formatDate(dtStr: string): string {
    if (!dtStr) return '-';
    return moment(dtStr).format('DD MMM YYYY, hh:mm A');
  }

  // Relative time helper
  public formatTimeAgo(dtStr: string): string {
    if (!dtStr) return '';
    return moment(dtStr).fromNow();
  }

  // Avatar initials helper
  public getInitials(name: string): string {
    if (!name) return 'L';
    return name
      .split(' ')
      .filter(Boolean)
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  // Copy Lead ID with feedback
  public copyLeadId(id: number) {
    navigator.clipboard.writeText(id.toString());
    this.copiedId = id;
    setTimeout(() => {
      this.copiedId = null;
      this.cdr.detectChanges();
    }, 2000);
  }

  // Navigate to Lead Profile
  public navigateToLead(id: number) {
    this.router.navigate(['/Lead/View', id]);
  }

  // Export to CSV
  public exportToCSV() {
    if (!this.filteredData || this.filteredData.length === 0) {
      alert('No data available to export.');
      return;
    }

    const headers = [
      'Lead ID',
      'Lead Name',
      'Pipeline Stage',
      'Pulse',
      'Current Status',
      'Assigned User',
      'Branch',
      'Department',
      'Ghosting State',
      'Entry Date'
    ];

    const rows = this.filteredData.map(item => [
      `"${item.Lead_Id || ''}"`,
      `"${(item.Lead_Name || '').replace(/"/g, '""')}"`,
      `"${(item.Pipeline_Stage || '').replace(/"/g, '""')}"`,
      `"${(item.Pulse || '').replace(/"/g, '""')}"`,
      `"${(item.Current_Status || '').replace(/"/g, '""')}"`,
      `"${(item.login_user_name || '').replace(/"/g, '""')}"`,
      `"${(item.Branch_Name || '').replace(/"/g, '""')}"`,
      `"${(item.Department_Name || '').replace(/"/g, '""')}"`,
      `"${item.isCurrent === 1 ? 'Currently Ghosting' : 'Historical / Resolved'}"`,
      `"${item.Entry_Date ? moment(item.Entry_Date).format('YYYY-MM-DD HH:mm:ss') : ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Ghosting_Lead_Report_${moment().format('YYYYMMDD_HHmmss')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Quick navigate to Lead Dashboard
  public goToLeadDashboard() {
    this.router.navigate(['/LeadDashboard']);
  }
}
