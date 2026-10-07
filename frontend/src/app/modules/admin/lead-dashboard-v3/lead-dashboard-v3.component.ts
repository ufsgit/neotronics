import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardV3_Service } from '../../../services/DashboardV3.Service';
import { Lead_Service } from '../../../services/Lead.Service';

@Component({
  selector: 'app-lead-dashboard-v3',
  templateUrl: './lead-dashboard-v3.component.html',
  styleUrls: ['./lead-dashboard-v3.component.scss']
})
export class LeadDashboardV3Component implements OnInit {

  showPipelineGraph = true;
  activityChartMode: 'daily' | 'weekly' | 'monthly' = 'daily';

  filterMode: 'Year' | 'Custom Date' = 'Year';
  selectedYear: number = new Date().getFullYear();
  customFromDate: string = '';
  customToDate: string = '';

  globalMonth: string | number = new Date().getMonth() + 1;

  kpiData: any = {};
  followUpData: any = {};
  pipelineData: any[] = [];
  
  dayWiseActivity: any[] = [];
  weekWiseActivity: any[] = [];
  monthWiseActivity: any[] = [];

  // Loading states
  loadingKPI = true;
  loadingPipeline = true;
  loadingFollowUp = true;
  loadingDay = true;
  loadingWeek = true;
  loadingMonth = true;

  // Dummy Chart Data for google-charts
  chartData = {
    daily: {
      data: [],
      options: {
        legend: { position: 'right' },
        colors: ['#4285F4'],
        hAxis: { slantedText: true, slantedTextAngle: 45 },
        vAxis: { minValue: 0 },
        chartArea: { width: '75%', height: '65%' }
      }
    },
    weekly: {
      data: [],
      options: {
        legend: { position: 'right' },
        colors: ['#4285F4'],
        curveType: 'function',
        hAxis: { slantedText: true, slantedTextAngle: 45 },
        vAxis: { minValue: 0 },
        chartArea: { width: '75%', height: '65%' }
      }
    },
    monthly: {
      data: [],
      options: {
        legend: { position: 'right' },
        colors: ['#4285F4'],
        curveType: 'function',
        hAxis: { slantedText: true, slantedTextAngle: 45 },
        vAxis: { minValue: 0 },
        chartArea: { width: '75%', height: '65%' }
      }
    },
    pipeline: {
      data: [],
      options: {
        legend: { 
          position: 'right', 
          alignment: 'center',
          textStyle: { color: '#2C3E50', fontSize: 13, bold: true }
        },
        is3D: true, // Modern 3D Effect
        pieSliceText: 'percentage', // Show percentage inside slices cleanly
        pieSliceTextStyle: { color: 'white', bold: true, fontSize: 12 },
        colors: [
          '#00d2ff', '#3a7bd5', '#f12711', '#f5af19', 
          '#8E2DE2', '#4A00E0', '#00c6ff', '#0072ff', '#11998e'
        ], // Vibrant, modern gradient-like solid colors
        slices: {
          0: { offset: 0.05 },
          1: { offset: 0.05 },
          2: { offset: 0.05 },
          3: { offset: 0.05 },
          4: { offset: 0.05 }
        }, // "Exploded" pie effect for a premium look
        chartArea: { left: 10, top: 15, width: '95%', height: '90%' },
        tooltip: { 
          textStyle: { fontSize: 13, color: '#333' },
          showColorCode: true
        },
        backgroundColor: 'transparent'
      }
    }
  };

  constructor(private dashboardService: DashboardV3_Service, private leadService: Lead_Service, private router: Router) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  get isCurrentYear(): boolean {
    return this.selectedYear === new Date().getFullYear();
  }

  changeYear(delta: number) {
    this.selectedYear += delta;
    this.fetchActivityData();
  }

  onFilterModeChange() {
    this.fetchActivityData();
  }

  fetchDashboardData() {
    this.dashboardService.getKPI().subscribe({
      next: (res: any) => {
        this.kpiData = res || {};
        this.loadingKPI = false;
      },
      error: (err) => { console.error('Error loading KPI', err); this.loadingKPI = false; }
    });

    this.dashboardService.getPipeline().subscribe({
      next: (res: any) => {
        try {
          this.pipelineData = Array.isArray(res) ? res : [];
          this.chartData.pipeline.data = this.pipelineData.length > 0 ? this.pipelineData.map(p => [p.Stage, p.Leads]) : [['No Data', 0]];
        } catch (e) {
          console.warn('Pipeline chart data mapping error:', e);
        }
        this.loadingPipeline = false;
      },
      error: (err) => { console.error('Error loading Pipeline', err); this.loadingPipeline = false; }
    });

    this.dashboardService.getFollowUpSummary().subscribe({
      next: (res: any) => {
        this.followUpData = res || {};
        this.loadingFollowUp = false;
      },
      error: (err) => { console.error('Error loading FollowUp', err); this.loadingFollowUp = false; }
    });


    this.fetchActivityData();
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  fetchActivityData() {
    this.fetchDayWise();
    this.fetchWeekWise();
    this.fetchMonthWise();
  }

  getMonthRange(year: number, month: string | number): { from: string, to: string } {
    if (month === 'All') {
      return { from: `${year}-01-01`, to: `${year}-12-31` };
    }
    const m = parseInt(month.toString(), 10) - 1;
    const start = new Date(year, m, 1);
    const end = new Date(year, m + 1, 0);
    return { from: this.formatDate(start), to: this.formatDate(end) };
  }

  fetchDayWise() {
    this.loadingDay = true;
    let fromDay: string | undefined, toDay: string | undefined;

    if (this.filterMode === 'Year') {
      const range = this.getMonthRange(this.selectedYear, this.globalMonth);
      fromDay = range.from;
      toDay = range.to;
    } else {
      fromDay = this.customFromDate || undefined;
      toDay = this.customToDate || undefined;
    }

    this.dashboardService.getActivityDay(fromDay, toDay).subscribe({
      next: (res: any) => {
        try {
          this.dayWiseActivity = Array.isArray(res) ? res : [];
          this.chartData.daily.data = this.dayWiseActivity.length > 0 ? this.dayWiseActivity.map((d: any) => [d.Date_Label, d.Activities]) : [['No Data', 0]];
        } catch (e) {
          console.warn('Daily chart data mapping error:', e);
        }
        this.loadingDay = false;
      },
      error: (err) => { console.error('Error loading Day Activity', err); this.loadingDay = false; }
    });
  }

  fetchWeekWise() {
    this.loadingWeek = true;
    let fromWeek: string | undefined, toWeek: string | undefined;

    if (this.filterMode === 'Year') {
      const range = this.getMonthRange(this.selectedYear, this.globalMonth);
      fromWeek = range.from;
      toWeek = range.to;
    } else {
      fromWeek = this.customFromDate || undefined;
      toWeek = this.customToDate || undefined;
    }

    this.dashboardService.getActivityWeek(fromWeek, toWeek).subscribe({
      next: (res: any) => {
        try {
          this.weekWiseActivity = Array.isArray(res) ? res : [];
          this.chartData.weekly.data = this.weekWiseActivity.length > 0 ? this.weekWiseActivity.map((w: any) => [w.Date_Label, w.Activities]) : [['No Data', 0]];
        } catch (e) {
          console.warn('Weekly chart data mapping error:', e);
        }
        this.loadingWeek = false;
      },
      error: (err) => { console.error('Error loading Week Activity', err); this.loadingWeek = false; }
    });
  }

  fetchMonthWise() {
    this.loadingMonth = true;
    let fromMonth: string | undefined, toMonth: string | undefined;

    if (this.filterMode === 'Year') {
      const range = this.getMonthRange(this.selectedYear, this.globalMonth);
      fromMonth = range.from;
      toMonth = range.to;
    } else {
      fromMonth = this.customFromDate || undefined;
      toMonth = this.customToDate || undefined;
    }

    this.dashboardService.getActivityMonth(fromMonth, toMonth).subscribe({
      next: (res: any) => {
        try {
          this.monthWiseActivity = Array.isArray(res) ? res : [];
          this.chartData.monthly.data = this.monthWiseActivity.length > 0 ? this.monthWiseActivity.map((m: any) => [m.Date_Label, m.Activities]) : [['No Data', 0]];
        } catch (e) {
          console.warn('Monthly chart data mapping error:', e);
        }
        this.loadingMonth = false;
      },
      error: (err) => { console.error('Error loading Month Activity', err); this.loadingMonth = false; }
    });
  }

  goToLeadListing(stage: any) {
    let stageName = stage.Stage || stage.Stage_Name || stage.Pipeline_Stage_Name || stage.Name;

    if (!stageName) {
      alert("Cannot navigate: Stage name is missing! Data: " + JSON.stringify(stage));
      return;
    }
    // Navigate with stage name instead of ID
    this.router.navigate(['/Lead'], { queryParams: { stage: stageName } });
  }

  onPipelineChartSelect(event: any) {
    let rowIndex: number | undefined | null = null;
    
    // DEBUG: Alert the event structure so we can see what it actually is!
    // alert(JSON.stringify(event));

    // Check various google chart event payload structures depending on library version
    if (event && typeof event.row === 'number') {
      rowIndex = event.row;
    } else if (event && event.selection && event.selection.length > 0) {
      rowIndex = event.selection[0].row;
    } else if (Array.isArray(event) && event.length > 0 && typeof event[0].row === 'number') {
      rowIndex = event[0].row;
    } else if (event && event.length > 0 && event[0].row !== undefined) {
      rowIndex = event[0].row;
    } else if (event && typeof event[0] === 'object' && event[0].row !== undefined) {
      rowIndex = event[0].row;
    } else {
      // Fallback: dump all keys in event to see what we have
      let keys = Object.keys(event).join(', ');
      alert('Event structure is different. Keys: ' + keys + '\nValue: ' + JSON.stringify(event));
    }

    if (rowIndex !== undefined && rowIndex !== null && this.pipelineData[rowIndex]) {
      const stage = this.pipelineData[rowIndex];
      this.goToLeadListing(stage);
    } else {
      alert('Could not resolve rowIndex! event: ' + JSON.stringify(event));
    }
  }

}
