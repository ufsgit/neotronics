import { Component, OnInit } from '@angular/core';
import { DashboardV3_Service } from '../../../services/DashboardV3.Service';

@Component({
  selector: 'app-lead-dashboard-v3',
  templateUrl: './lead-dashboard-v3.component.html',
  styleUrls: ['./lead-dashboard-v3.component.scss']
})
export class LeadDashboardV3Component implements OnInit {

  showPipelineGraph = true;
  activityChartMode: 'daily' | 'weekly' | 'monthly' = 'daily';

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
        legend: { position: 'right' },
        pieHole: 0.4,
        chartArea: { width: '90%', height: '80%' }
      }
    }
  };

  constructor(private dashboardService: DashboardV3_Service) { }

  ngOnInit(): void {
    this.fetchDashboardData();
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
        this.pipelineData = res || [];
        this.chartData.pipeline.data = this.pipelineData.length > 0 ? this.pipelineData.map(p => [p.Stage, p.Leads]) : [['No Data', 0]];
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

    this.dashboardService.getActivityDay().subscribe({
      next: (res: any) => {
        this.dayWiseActivity = res || [];
        this.chartData.daily.data = this.dayWiseActivity.length > 0 ? this.dayWiseActivity.map((d: any) => [d.Date_Label, d.Activities]) : [['No Data', 0]];
        this.loadingDay = false;
      },
      error: (err) => { console.error('Error loading Day Activity', err); this.loadingDay = false; }
    });

    this.dashboardService.getActivityWeek().subscribe({
      next: (res: any) => {
        this.weekWiseActivity = res || [];
        this.chartData.weekly.data = this.weekWiseActivity.length > 0 ? this.weekWiseActivity.map((w: any) => [w.Date_Label, w.Activities]) : [['No Data', 0]];
        this.loadingWeek = false;
      },
      error: (err) => { console.error('Error loading Week Activity', err); this.loadingWeek = false; }
    });

    this.dashboardService.getActivityMonth().subscribe({
      next: (res: any) => {
        this.monthWiseActivity = res || [];
        this.chartData.monthly.data = this.monthWiseActivity.length > 0 ? this.monthWiseActivity.map((m: any) => [m.Date_Label, m.Activities]) : [['No Data', 0]];
        this.loadingMonth = false;
      },
      error: (err) => { console.error('Error loading Month Activity', err); this.loadingMonth = false; }
    });
  }

}
