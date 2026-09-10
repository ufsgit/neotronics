import { Component, OnInit } from '@angular/core';
import { DashboardV2_Service } from '../../../services/DashboardV2.Service';

@Component({
  selector: 'app-lead-dashboard-v2',
  templateUrl: './lead-dashboard-v2.component.html',
  styleUrls: ['./lead-dashboard-v2.component.scss']
})
export class LeadDashboardV2Component implements OnInit {

  totalLeads: number = 0;
  top3Stages: any[] = [];
  
  pipelineMetrics: any[] = [];
  showMorePipeline: boolean = false;
  isLoadingMorePipeline: boolean = false;
  allPipelineStages: any[] = [];
  allPipelineStagesLoaded: boolean = false;

  pulseMetrics: any[] = [];
  sourceMetrics: any[] = [];

  // Chart configs
  public chartOptions = {
    backgroundColor: 'transparent',
    legend: { position: 'right' },
    pieHole: 0.4,
    colors: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796', '#5a5c69', '#2e59d9'],
    chartArea: { width: '90%', height: '80%' },
    animation: { startup: true, duration: 1000, easing: 'out' }
  };

  public chartPipelineData: any[] = [];
  public chartPulseData: any[] = [];
  public chartSourceData: any[] = [];

  constructor(private dashboardV2Service: DashboardV2_Service) { }

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardV2Service.DashboardV2_PipelineTop3().subscribe(
      res => {
        // res[0] is the first SELECT, res[1] is the second SELECT
        this.totalLeads = res[0] && res[0][0] ? res[0][0].TotalLeads : 0;
        this.top3Stages = res[1] || [];
      },
      err => console.error(err)
    );

    // Load Pipeline Metrics for chart
    this.dashboardV2Service.DashboardV2_PipelineMetrics().subscribe(
      res => {
        this.pipelineMetrics = res[0] || [];
        this.chartPipelineData = this.pipelineMetrics.map(m => [m.Stage_Name, m.Count]);
        if (this.chartPipelineData.length === 0) this.chartPipelineData = [['No Data', 0]];
      },
      err => console.error(err)
    );

    this.dashboardV2Service.DashboardV2_PulseMetrics().subscribe(
      res => {
        this.pulseMetrics = res[0] || [];
        this.chartPulseData = this.pulseMetrics.map(m => [m.Pulse_Name, m.Count]);
        if (this.chartPulseData.length === 0) this.chartPulseData = [['No Data', 0]];
      },
      err => console.error(err)
    );

    this.dashboardV2Service.DashboardV2_SourceMetrics().subscribe(
      res => {
        this.sourceMetrics = res[0] || [];
        this.chartSourceData = this.sourceMetrics.map(m => [m.Source_Name, m.Count]);
        if (this.chartSourceData.length === 0) this.chartSourceData = [['No Data', 0]];
      },
      err => console.error(err)
    );
  }

  loadMorePipelineMetrics() {
    this.showMorePipeline = !this.showMorePipeline;
    if (this.showMorePipeline && !this.allPipelineStagesLoaded) {
      this.isLoadingMorePipeline = true;
      this.dashboardV2Service.DashboardV2_PipelineAll().subscribe(
        res => {
          // Added a small artificial delay so the loader is visible 
          // even when the local API responds instantly
          setTimeout(() => {
            this.allPipelineStages = res[0] || [];
            this.isLoadingMorePipeline = false;
            this.allPipelineStagesLoaded = true;
          }, 500);
        },
        err => {
          console.error(err);
          this.isLoadingMorePipeline = false;
        }
      );
    }
  }
}
