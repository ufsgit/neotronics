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
    this.dashboardService.getDashboardV3Data().subscribe({
      next: (res: any) => {
        if (res) {
          this.kpiData = res.kpi || {};
          this.followUpData = res.followUpSummary || {};
          
          this.pipelineData = res.pipeline || [];
          this.chartData.pipeline.data = this.pipelineData.map(p => [p.Stage, p.Leads]);
          
          this.dayWiseActivity = res.activityDay || [];
          this.weekWiseActivity = res.activityWeek || [];
          this.monthWiseActivity = res.activityMonth || [];

          this.chartData.daily.data = (res.chartDay || []).map((d: any) => [d.Date_Label, d.Activities]);
          this.chartData.weekly.data = (res.chartWeek || []).map((w: any) => [w.Date_Label, w.Activities]);
          this.chartData.monthly.data = (res.chartMonth || []).map((m: any) => [m.Date_Label, m.Activities]);
          
          // Fallbacks for empty charts to prevent google charts error
          if (this.chartData.daily.data.length === 0) this.chartData.daily.data = [['No Data', 0]];
          if (this.chartData.weekly.data.length === 0) this.chartData.weekly.data = [['No Data', 0]];
          if (this.chartData.monthly.data.length === 0) this.chartData.monthly.data = [['No Data', 0]];
          if (this.chartData.pipeline.data.length === 0) this.chartData.pipeline.data = [['No Data', 0]];
        }
      },
      error: (err) => {
        console.error('Error loading dashboard data', err);
      }
    });
  }

}
