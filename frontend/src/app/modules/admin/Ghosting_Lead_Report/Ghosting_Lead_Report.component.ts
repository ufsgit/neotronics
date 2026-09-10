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
  Lead_Type: any;
  Staff_Id?: number;
  Staff_Name: string;
  Branch_Id?: number;
  Branch_Name: string;
  Department_Id?: number;
  Department_Name: string;
  Current_Status: any; // 1 = Active, 0 = Inactive
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
  public filterLeadType: string = 'All';
  public tableActiveOnly: boolean = false;
  public searchKeyword: string = '';

  // Quick card selections
  public activeStageCard: string = '';
  public activeStateCard: string = '';

  // Dropdown options
  public stageList: string[] = [];
  public branchList: string[] = [];
  public departmentList: string[] = [];
  public staffList: string[] = [];
  public leadTypeList: any[] = [];

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
  public chartStageType: any = 'PieChart';
  // Server-side pagination state
  serverTotalCount: number = 0;
  serverPaginatedData: GhostingLeadRecord[] = [];

  public chartStageData: any[] = [];
  public chartStageColumns: string[] = ['Stage', 'Count'];

  public chartDeptType: any = 'PieChart';
  public chartDeptData: any[] = [];
  public chartDeptColumns: string[] = ['Department', 'Count'];

  public chartStaffType: any = 'ColumnChart';
  public chartStaffData: any[] = [];
  public chartStaffColumns: string[] = ['Staff', 'Count'];
  public allExecutiveWorkloads: any[] = [];

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
    vAxis: { minValue: 0, format: '#', baselineColor: '#e2e8f0', gridlines: { color: '#f1f5f9' } },
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
    { Lead_Id: 44, Lead_Name: 'Acme Technologies Ltd', PipelineStage_Id: 4, Pipeline_Stage: 'Negotiation', Lead_Type: 1, Staff_Id: 1, Staff_Name: 'Manu', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', Current_Status: '1', Entry_Date: '2026-09-05 14:30:00' },
    { Lead_Id: 45, Lead_Name: 'Apex Health Systems', PipelineStage_Id: 4, Pipeline_Stage: 'Negotiation', Lead_Type: 2, Staff_Id: 12, Staff_Name: 'Supadmin', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', Current_Status: '1', Entry_Date: '2026-09-04 11:15:00' },
    { Lead_Id: 46, Lead_Name: 'Zenith Global Logistics', PipelineStage_Id: 4, Pipeline_Stage: 'Negotiation', Lead_Type: 1, Staff_Id: 15, Staff_Name: 'Alin', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 9, Department_Name: 'Local Sales', Current_Status: '1', Entry_Date: '2026-09-03 16:45:00' },
    { Lead_Id: 47, Lead_Name: 'Nova Retail Ventures', PipelineStage_Id: 4, Pipeline_Stage: 'Negotiation', Lead_Type: 1, Staff_Id: 1, Staff_Name: 'Manu', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', Current_Status: '1', Entry_Date: '2026-09-02 09:20:00' },
    { Lead_Id: 48, Lead_Name: 'Prime Infra Developers', PipelineStage_Id: 4, Pipeline_Stage: 'Negotiation', Lead_Type: 2, Staff_Id: 14, Staff_Name: 'perfect', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 9, Department_Name: 'Local Sales', Current_Status: '0', Entry_Date: '2026-08-28 15:10:00' },
    { Lead_Id: 49, Lead_Name: 'Stark Industries', PipelineStage_Id: 2, Pipeline_Stage: 'Need to Send Quote', Lead_Type: 1, Staff_Id: 1, Staff_Name: 'Manu', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', Current_Status: '1', Entry_Date: '2026-09-06 10:00:00' },
    { Lead_Id: 50, Lead_Name: 'Wayne Enterprises Corp', PipelineStage_Id: 2, Pipeline_Stage: 'Need to Send Quote', Lead_Type: 1, Staff_Id: 15, Staff_Name: 'Alin', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 9, Department_Name: 'Local Sales', Current_Status: '1', Entry_Date: '2026-09-04 17:30:00' },
    { Lead_Id: 51, Lead_Name: 'Cyberdyne Systems', PipelineStage_Id: 2, Pipeline_Stage: 'Need to Send Quote', Lead_Type: 2, Staff_Id: 12, Staff_Name: 'Supadmin', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', Current_Status: '0', Entry_Date: '2026-08-25 12:00:00' },
    { Lead_Id: 52, Lead_Name: 'LexCorp Financial Group', PipelineStage_Id: 3, Pipeline_Stage: 'Need to Schedule Sales Meeting', Lead_Type: 1, Staff_Id: 14, Staff_Name: 'perfect', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', Current_Status: '1', Entry_Date: '2026-09-05 13:40:00' },
    { Lead_Id: 53, Lead_Name: 'Oscorp Pharmaceuticals', PipelineStage_Id: 3, Pipeline_Stage: 'Need to Schedule Sales Meeting', Lead_Type: 1, Staff_Id: 1, Staff_Name: 'Manu', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 6, Department_Name: 'Technical', Current_Status: '1', Entry_Date: '2026-09-01 11:20:00' },
    { Lead_Id: 54, Lead_Name: 'Daily Bugle Media House', PipelineStage_Id: 5, Pipeline_Stage: 'Need Site Visit / Demo / Support', Lead_Type: 1, Staff_Id: 15, Staff_Name: 'Alin', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 6, Department_Name: 'Technical', Current_Status: '1', Entry_Date: '2026-08-30 16:00:00' },
    { Lead_Id: 55, Lead_Name: 'Umbrella BioTech Corp', PipelineStage_Id: 5, Pipeline_Stage: 'Need Site Visit / Demo / Support', Lead_Type: 1, Staff_Id: 12, Staff_Name: 'Supadmin', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 7, Department_Name: 'Support', Current_Status: '1', Entry_Date: '2026-08-29 14:15:00' },
    { Lead_Id: 56, Lead_Name: 'Massive Dynamic Solutions', PipelineStage_Id: 6, Pipeline_Stage: 'Verbal Commit', Lead_Type: 1, Staff_Id: 1, Staff_Name: 'Manu', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', Current_Status: '1', Entry_Date: '2026-09-04 10:45:00' },
    { Lead_Id: 57, Lead_Name: 'InGen Bioscience Labs', PipelineStage_Id: 6, Pipeline_Stage: 'Verbal Commit', Lead_Type: 2, Staff_Id: 14, Staff_Name: 'perfect', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', Current_Status: '0', Entry_Date: '2026-08-20 15:30:00' },
    { Lead_Id: 58, Lead_Name: 'Tyrell Robotics Corp', PipelineStage_Id: 7, Pipeline_Stage: 'Immediate Follow-up Required on Quote', Lead_Type: 1, Staff_Id: 15, Staff_Name: 'Alin', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 9, Department_Name: 'Local Sales', Current_Status: '1', Entry_Date: '2026-09-03 09:10:00' },
    { Lead_Id: 59, Lead_Name: 'Weyland-Yutani Engineering', PipelineStage_Id: 7, Pipeline_Stage: 'Immediate Follow-up Required on Quote', Lead_Type: 1, Staff_Id: 1, Staff_Name: 'Manu', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', Current_Status: '1', Entry_Date: '2026-09-02 18:00:00' },
    { Lead_Id: 60, Lead_Name: 'Hooli Cloud Computing', PipelineStage_Id: 1, Pipeline_Stage: 'Need to call up for first level call', Lead_Type: 1, Staff_Id: 12, Staff_Name: 'Supadmin', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', Current_Status: '1', Entry_Date: '2026-09-06 16:20:00' },
    { Lead_Id: 61, Lead_Name: 'Pied Piper Networks', PipelineStage_Id: 1, Pipeline_Stage: 'Need to call up for first level call', Lead_Type: 1, Staff_Id: 15, Staff_Name: 'Alin', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 9, Department_Name: 'Local Sales', Current_Status: '1', Entry_Date: '2026-09-05 15:50:00' },
    { Lead_Id: 62, Lead_Name: 'Ravencroft Medical Center', PipelineStage_Id: 8, Pipeline_Stage: 'Need to Send Company Profile', Lead_Type: 1, Staff_Id: 1, Staff_Name: 'Manu', Branch_Id: 1, Branch_Name: 'Head Office', Department_Id: 5, Department_Name: 'Sales', Current_Status: '1', Entry_Date: '2026-09-04 12:00:00' },
    { Lead_Id: 63, Lead_Name: 'Omni Consumer Products', PipelineStage_Id: 9, Pipeline_Stage: 'Work / Project Stuck', Lead_Type: 1, Staff_Id: 14, Staff_Name: 'perfect', Branch_Id: 2, Branch_Name: 'Branch Office 1', Department_Id: 6, Department_Name: 'Technical', Current_Status: '1', Entry_Date: '2026-08-27 10:30:00' }
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
    this.allGhostingData = [...this.mockFallbackData];
    this.extractDropdowns();
    this.applyFilters(); // This will just filter mock data and prepare local KPIs
    
    // 1. Fetch the live KPI numbers (Cards)
    this.leadService.Get_Ghosting_KPI().subscribe(
      (res: any) => {
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
        }

        // 2. Fetch initial 4 stages (Pipeline counts)
        this.leadService.Get_Ghosting_Stage_Summary({}, 4, 0).subscribe((stageRes: any) => {
          if (stageRes && stageRes.length > 0) {
            this.stageSummaryData = this.mapStageData(stageRes, totalCount, 0);
          }
          this.cdr.detectChanges();
          
          // 3. Finally, prepare charts
          this.prepareCharts();
          this.isLoading = false;
        });
      },
      (err: any) => {
        console.warn('Error fetching KPI SP:', err);
        this.isLoading = false;
      }
    );
  }

  // Extract distinct values for filter dropdowns
  public extractDropdowns() {
    this.stageList = [...new Set(this.allGhostingData.map(d => d.Pipeline_Stage).filter(Boolean))].sort();
    this.branchList = [...new Set(this.allGhostingData.map(d => d.Branch_Name).filter(Boolean))].sort();
    this.departmentList = [...new Set(this.allGhostingData.map(d => d.Department_Name).filter(Boolean))].sort();
    this.staffList = [...new Set(this.allGhostingData.map(d => d.Staff_Name).filter(Boolean))].sort();
    this.leadTypeList = [...new Set(this.allGhostingData.map(d => d.Lead_Type))].sort();
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
      if (this.filterStaff !== 'All' && item.Staff_Name !== this.filterStaff) {
        return false;
      }

      // Ghost state filter (1 = Active, 0 = Inactive)
      if (this.filterGhostState !== 'All') {
        if (String(item.Current_Status) !== this.filterGhostState) return false;
      }

      // Lead Type filter
      if (this.filterLeadType !== 'All') {
        const itemType = item.Lead_Type != null ? item.Lead_Type.toString() : '';
        const filterType = this.filterLeadType != null ? this.filterLeadType.toString() : '';
        if (itemType !== filterType) {
          return false;
        }
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
        const matchesStaff = (item.Staff_Name || '').toLowerCase().includes(kw);

        if (!matchesLead && !matchesStaff) {
          return false;
        }
      }

      return true;
    });

    this.currentPage = 1;
    this.calculateKPIs();
    if (this.viewSelection === 'Table') {
      this.loadTableData();
    }
  }

  public switchToTable() {
    this.viewSelection = 'Table';
    if (this.serverPaginatedData.length === 0) {
      this.loadTableData();
    }
  }

  public loadTableData() {
    this.isLoading = true;
    const offset = (this.currentPage - 1) * this.pageSize;
    const search = this.searchKeyword.trim();
    const isCurrent = this.filterGhostState !== 'All' ? parseInt(this.filterGhostState, 10) : null;
    
    this.leadService.Get_Ghosting_Register(this.pageSize, offset, search, isCurrent).subscribe(
      (res: any) => {
        this.serverPaginatedData = res.data || [];
        this.serverTotalCount = res.totalCount || 0;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      (err: any) => {
        console.error('Error fetching table data:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    );
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
    this.leadService.Get_Ghosting_Charts_Data('stage_leakage').subscribe((res: any) => {
      this.chartStageData = res.map((r: any) => [r.Label || 'Unassigned', r.Count]);
      if (this.chartStageData.length === 0) {
        this.chartStageData = [['No Data', 0]];
      }
      this.cdr.detectChanges();
    });

    // 2. Department Breakdown Chart
    this.leadService.Get_Ghosting_Charts_Data('departmental').subscribe((res: any) => {
      this.chartDeptData = res.map((r: any) => [r.Label || 'General', r.Count]);
      if (this.chartDeptData.length === 0) {
        this.chartDeptData = [['No Data', 0]];
      }
      this.cdr.detectChanges();
    });

    // 3. Staff Leaderboard Bar Chart
    this.leadService.Get_Ghosting_Charts_Data('executive_workload').subscribe((res: any) => {
      this.chartStaffData = res.map((r: any) => [r.Label || 'Unassigned', r.Count]);
      if (this.chartStaffData.length === 0) {
        this.chartStaffData = [['No Data', 0]];
      }
      this.cdr.detectChanges();
    });

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
    this.filterLeadType = 'All';
    this.searchKeyword = '';
    this.activeStageCard = '';
    this.activeStateCard = '';
    this.applyFilters();
  }

  public applyTableFilters() {
    this.currentPage = 1;
    this.applyFilters();
  }

  public resetTableFilters() {
    this.searchKeyword = '';
    this.pageSize = 10;
    this.filterGhostState = 'All';
    this.applyTableFilters();
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
    if (this.filterLeadType !== 'All') count++;
    if (this.searchKeyword.trim() !== '') count++;
    return count;
  }

  // Pagination slice
  get paginatedData(): GhostingLeadRecord[] {
    return this.serverPaginatedData;
  }

  get totalPages(): number {
    return Math.ceil(this.serverTotalCount / this.pageSize) || 1;
  }

  get paginationPages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 1; // Shows 1 before and 1 after current page
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l != null) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

  public goToPage(page: any) {
    if (page === '...') return;
    const p = Number(page);
    if (p >= 1 && p <= this.totalPages && this.currentPage !== p) {
      this.currentPage = p;
      this.loadTableData();
    }
  }

  public nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadTableData();
    }
  }

  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTableData();
    }
  }

  public onPageSizeChange() {
    this.currentPage = 1;
    this.loadTableData();
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
  public navigateToLead(leadId: number) {
    if (!leadId) return;
    const url = this.router.serializeUrl(this.router.createUrlTree(['/New_Lead_Mgmt'], { queryParams: { Lead_Id: leadId } }));
    window.open(url, '_blank');
  }

  public viewAllExecutives() {
    this.leadService.Get_Ghosting_Charts_Data('executive_workload').subscribe((res: any) => {
      this.allExecutiveWorkloads = res;
      this.cdr.detectChanges();
    });
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
      'Lead Type',
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
      `"${item.Lead_Type || ''}"`,
      `"${(item.Staff_Name || '').replace(/"/g, '""')}"`,
      `"${(item.Branch_Name || '').replace(/"/g, '""')}"`,
      `"${(item.Department_Name || '').replace(/"/g, '""')}"`,
      `"${item.Current_Status === '1' || item.Current_Status == 1 ? 'Currently Ghosting' : 'Inactive'}"`,
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
