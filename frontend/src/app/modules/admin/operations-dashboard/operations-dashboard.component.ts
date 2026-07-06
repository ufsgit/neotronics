import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperationsDashboard_Service } from '../../../services/OperationsDashboard.Service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-operations-dashboard',
  templateUrl: './operations-dashboard.component.html',
  styleUrls: ['./operations-dashboard.component.scss']
})
export class OperationsDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  public loading = false;
  
  public filterDateRange: string = 'All Time';
  public filterStaff: string = 'All Staff';
  public filterStatus: string = 'All Statuses';
  public filterSource: string = 'All Sources';
  public filterIndustry: string = 'All Industries';
  
  public staffList: any[] = [];
  public statusList: any[] = [];
  public sourceList: any[] = [];
  public industryList: any[] = [];
  
  public showFilters: boolean = false;
  
  public toggleFilters() {
      this.showFilters = !this.showFilters;
  }

  public applyFilters() {
      // Implement filtering logic if needed later
      console.log('Filters applied');
  }
  
  public data: any = {
    requirement: { total: 0 },
    priceRequest: { total: 0 },
    priceResponse: { total: 0 },
    quotationConfirmation: { total: 0 },
    quotation: { total: 0 },
    proformaInvoice: { total: 0 },
    invoice: { total: 0 },
    pendingWorkflow: { total: 0 },
    completedOperations: { total: 0 },
    cancelledRejected: { total: 0 },
    inProgress: { total: 0 },
    todaysActivities: { total: 0 },
    monthlyTrend: [],
    recentActivities: []
  };

  public chartOptions = {
    pieHole: 0.4,
    backgroundColor: 'transparent',
    legend: { position: 'right' },
    chartArea: { width: '90%', height: '80%' },
    colors: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
    animation: { startup: true, duration: 1000, easing: 'out' }
  };

  public chartBarOptions = {
    backgroundColor: 'transparent',
    legend: { position: 'none' },
    colors: ['#4e73df'],
    chartArea: { width: '80%', height: '70%' },
    hAxis: { slantedText: true, slantedTextAngle: 45 },
    animation: { startup: true, duration: 1000, easing: 'out' }
  };

  public chartTrendOptions = {
    backgroundColor: 'transparent',
    legend: { position: 'bottom' },
    colors: ['#4e73df', '#1cc88a'],
    chartArea: { width: '80%', height: '70%' },
    hAxis: { format: 'MMM yyyy' },
    animation: { startup: true, duration: 1000, easing: 'out' }
  };

  public chartTrendType = 'LineChart';
  public chartTrendColumns = ['Month', 'Records'];
  public chartTrendData = [];

  public chartStatusData = [];
  public chartSourceData = [];

  public staffPerformance: any[] = [];

  public displayedColumns: string[] = ['Requirement No', 'Customer', 'Company', 'Staff', 'Current Stage', 'Status', 'Quotation No', 'Invoice No', 'Date', 'Action'];
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild('kpiSection', { static: false }) kpiSection: ElementRef;
  @ViewChild('chartSection', { static: false }) chartSection: ElementRef;

  public kpisVisible = false;
  public chartsVisible = false;
  private observer: IntersectionObserver;
  private kpiTargets: any = {};

  constructor(
    private opsService: OperationsDashboard_Service,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  navigateToPage(routePath: string) {
    if(routePath) {
      this.router.navigate([routePath]);
    }
  }

  navigateToDetails(element: any) {
    if(!element) return;
    
    // Save identifying info to localStorage to auto-open details on target page
    const identifier = element.Number || element.Quotation_No || element.Invoice_No;
    if (identifier) {
        localStorage.setItem('Auto_Open_Number', identifier);
        localStorage.setItem('Auto_Open_Stage', element.Current_Stage);
    }

    if(element.Current_Stage === 'Invoice' && element.Invoice_No) {
      this.router.navigate(['/Invoice']); 
    } else if(element.Current_Stage === 'Quotation' && element.Quotation_No) {
      this.router.navigate(['/Quotation']);
    } else if (element.Current_Stage === 'Price Request') {
      this.router.navigate(['/PriceRequest']);
    } else if (element.Current_Stage === 'Price Response') {
      this.router.navigate(['/PriceResponse']);
    } else {
      // Default to Requirement if nothing else matches or it's just a Requirement
      this.router.navigate(['/Requirement']);
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (this.kpiSection && entry.target === this.kpiSection.nativeElement && !this.kpisVisible) {
            this.kpisVisible = true;
            this.triggerKPIAnimations();
            this.cdr.detectChanges();
          }
          if (this.chartSection && entry.target === this.chartSection.nativeElement && !this.chartsVisible) {
            this.chartsVisible = true;
            this.cdr.detectChanges();
          }
        }
      });
    }, { threshold: 0.1 });

    if (this.kpiSection) this.observer.observe(this.kpiSection.nativeElement);
    if (this.chartSection) this.observer.observe(this.chartSection.nativeElement);
  }

  triggerKPIAnimations() {
    const keys = ['requirement', 'priceRequest', 'priceResponse', 'quotationConfirmation', 'quotation', 'proformaInvoice', 'invoice', 'pendingWorkflow', 'completedOperations', 'cancelledRejected', 'inProgress', 'todaysActivities'];
    keys.forEach(k => {
        if (this.kpiTargets[k] !== undefined) {
           this.animateValueObj(this.data, k, 0, this.kpiTargets[k], 1000);
        }
    });
  }

  animateValueObj(obj: any, prop: string, start: number, end: number, duration: number) {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      if (obj[prop]) {
        obj[prop].total = Math.floor(progress * (end - start) + start);
      }
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  fetchData() {
    this.loading = true;
    this.opsService.Get_Operations_Dashboard_Data({}).subscribe((res: any) => {
      
      const keys = ['requirement', 'priceRequest', 'priceResponse', 'quotationConfirmation', 'quotation', 'proformaInvoice', 'invoice', 'pendingWorkflow', 'completedOperations', 'cancelledRejected', 'inProgress', 'todaysActivities'];
      keys.forEach(k => {
          this.kpiTargets[k] = (res && res[k] && res[k].total) ? res[k].total : 0;
          if (res && res[k]) res[k].total = 0;
      });

      this.data = Object.assign(this.data, res);
      
      if (this.kpisVisible) {
          this.triggerKPIAnimations();
      }

      if (this.data.monthlyTrend && this.data.monthlyTrend.length > 0) {
        this.chartTrendData = this.data.monthlyTrend.map(m => [new Date(m.month + '-01'), m.count]);
      } else {
        this.chartTrendData = [[new Date(), 0]];
      }

      const workflowData = [
        ['Requirement', this.kpiTargets['requirement']],
        ['Price Request', this.kpiTargets['priceRequest']],
        ['Price Response', this.kpiTargets['priceResponse']],
        ['Quotation Confirmation', this.kpiTargets['quotationConfirmation']],
        ['Quotation', this.kpiTargets['quotation']],
        ['Proforma Invoice', this.kpiTargets['proformaInvoice']],
        ['Invoice', this.kpiTargets['invoice']]
      ];

      // If all are zero, provide a default to prevent empty chart error
      const hasData = workflowData.some(d => d[1] > 0);
      if (hasData) {
        this.chartStatusData = workflowData;
        this.chartSourceData = workflowData;
      } else {
        this.chartStatusData = [['No Data', 1]];
        this.chartSourceData = [['No Data', 0]];
      }

      this.dataSource.data = this.data.recentActivities || [];
      this.dataSource.paginator = this.paginator;
      
      this.staffPerformance = this.data.staffPerformance || [];

      this.loading = false;
      this.cdr.detectChanges();
    }, err => {
      console.error(err);
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }
}
