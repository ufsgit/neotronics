import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lead_Service } from '../../../services/Lead.Service';
import { NotificationService } from '../../../services/notification.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-lead-dashboard',
  templateUrl: './lead-dashboard.component.html',
  styleUrls: ['./lead-dashboard.component.scss']
})
export class LeadDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  public allLeads: any[] = [];
  public filteredLeads: any[] = [];
  private notificationSub: Subscription;

  // Filters
  public filterDateRange: string = 'All';
  public filterStaff: string = 'All';
  public filterStatus: string = 'All';
  public filterSource: string = 'All';
  public filterIndustry: string = 'All';

  // Dropdown Options
  public staffList: string[] = [];
  public statusList: string[] = [];
  public sourceList: string[] = [];
  public industryList: string[] = [];
  
  public showFilters: boolean = false;
  
  public toggleFilters() {
      this.showFilters = !this.showFilters;
  }

  // KPIs
  public totalLeads: number = 0;
  public newLeads: number = 0;
  public assignedLeads: number = 0;
  public unassignedLeads: number = 0;
  public inProgressLeads: number = 0;
  public followUpPending: number = 0;
  public followUpToday: number = 0;
  public quotationSent: number = 0;
  public convertedLeads: number = 0;
  public lostLeads: number = 0;
  public closedLeads: number = 0;
  public rejectedLeads: number = 0;

  // Charts
  public chartStatusType = 'PieChart';
  public chartStatusData: any[] = [];
  public chartStatusColumns = ['Status', 'Count'];

  public chartSourceType = 'PieChart';
  public chartSourceData: any[] = [];
  public chartSourceColumns = ['Source', 'Count'];

  public chartIndustryType = 'ColumnChart';
  public chartIndustryData: any[] = [];
  public chartIndustryColumns = ['Industry', 'Count'];

  public chartTrendType = 'LineChart';
  public chartTrendData: any[] = [];
  public chartTrendColumns = ['Month', 'Created', 'Converted'];

  public chartOptions = {
    backgroundColor: 'transparent',
    legend: { position: 'right' },
    pieHole: 0.4,
    colors: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796', '#5a5c69', '#2e59d9'],
    chartArea: { width: '90%', height: '80%' },
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

  // Tables
  public staffPerformance: any[] = [];
  public recentActivities: any[] = [];
  
  public displayedColumns: string[] = ['Lead_Id', 'Customer_Name', 'Company_Name', 'Phone', 'Email', 'Vertical_Name', 'Staff_Name', 'Status_Name', 'Entry_Date'];
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild('kpiSection', { static: false }) kpiSection: ElementRef;
  @ViewChild('chartSection', { static: false }) chartSection: ElementRef;

  public kpisVisible = false;
  public chartsVisible = false;
  private observer: IntersectionObserver;

  constructor(
    private leadService: Lead_Service,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadData();

    // Listen for real-time updates
    this.notificationSub = this.notificationService.notifications$.subscribe(notifs => {
      if (notifs && notifs.length > 0) {
        console.log('Real-time update received in Dashboard', notifs);
        this.loadData(); 
      }
    });
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (this.kpiSection && entry.target === this.kpiSection.nativeElement && !this.kpisVisible) {
            this.kpisVisible = true;
            this.calculateKPIs();
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

  ngOnDestroy() {
    if (this.notificationSub) {
      this.notificationSub.unsubscribe();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  loadData() {
    this.leadService.Get_Leads().subscribe(res => {
      const leadRows = (res && Array.isArray(res) && res.length > 0 && Array.isArray(res[0])) ? res[0]
        : (Array.isArray(res) ? res : []);
      this.allLeads = leadRows;
      this.extractDropdowns();
      this.applyFilters();
    }, err => {
      console.error('Error fetching leads for dashboard', err);
    });
  }

  extractDropdowns() {
    this.staffList = [...new Set(this.allLeads.map(l => l.Staff_Name).filter(x => !!x))];
    this.statusList = [...new Set(this.allLeads.map(l => l.Status_Name).filter(x => !!x))];
    this.sourceList = [...new Set(this.allLeads.map(l => l.Source_Name).filter(x => !!x))]; // Assuming Requirement is Source based on current data
    this.industryList = [...new Set(this.allLeads.map(l => l.Vertical_Name).filter(x => !!x))];
  }

  applyFilters() {
    this.filteredLeads = this.allLeads.filter(l => {
      let match = true;
      if (this.filterStaff !== 'All' && l.Staff_Name !== this.filterStaff) match = false;
      if (this.filterStatus !== 'All' && l.Status_Name !== this.filterStatus) match = false;
      if (this.filterSource !== 'All' && l.Source_Name !== this.filterSource) match = false;
      if (this.filterIndustry !== 'All' && l.Vertical_Name !== this.filterIndustry) match = false;

      if (this.filterDateRange !== 'All') {
        const leadDate = moment(l.Entry_Date);
        const today = moment();
        if (this.filterDateRange === 'Today' && !leadDate.isSame(today, 'day')) match = false;
        if (this.filterDateRange === 'Last 7 Days' && !leadDate.isSameOrAfter(today.subtract(7, 'days'))) match = false;
        if (this.filterDateRange === 'This Month' && !leadDate.isSame(today, 'month')) match = false;
      }
      return match;
    });

    if (this.kpisVisible) {
      this.calculateKPIs();
    }
    this.prepareCharts();
    this.prepareLeaderboard();
    this.prepareRecentLeads();
    this.cdr.detectChanges();
  }

  animateValue(prop: string, start: number, end: number, duration: number) {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      (this as any)[prop] = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  calculateKPIs() {
    this.animateValue('totalLeads', 0, this.filteredLeads.length, 1000);
    this.animateValue('newLeads', 0, this.filteredLeads.filter(l => (l.Status_Name || '').toLowerCase().includes('new')).length, 1000);
    
    const assigned = this.filteredLeads.filter(l => l.Staff_Id > 0).length;
    this.animateValue('assignedLeads', 0, assigned, 1000);
    this.animateValue('unassignedLeads', 0, this.filteredLeads.length - assigned, 1000);
    
    this.animateValue('inProgressLeads', 0, this.filteredLeads.filter(l => {
      const s = (l.Status_Name || '').toLowerCase();
      return !s.includes('new') && !s.includes('lost') && !s.includes('close') && !s.includes('reject');
    }).length, 1000);
    
    this.animateValue('convertedLeads', 0, this.filteredLeads.filter(l => (l.Status_Name || '').toLowerCase().includes('won') || (l.Status_Name || '').toLowerCase().includes('converted')).length, 1000);
    this.animateValue('lostLeads', 0, this.filteredLeads.filter(l => (l.Status_Name || '').toLowerCase().includes('lost')).length, 1000);
    this.animateValue('closedLeads', 0, this.filteredLeads.filter(l => (l.Status_Name || '').toLowerCase().includes('close')).length, 1000);
    this.animateValue('rejectedLeads', 0, this.filteredLeads.filter(l => (l.Status_Name || '').toLowerCase().includes('reject')).length, 1000);
    
    // Follow ups
    this.animateValue('followUpToday', 0, this.filteredLeads.filter(l => moment(l.Next_FollowUp_Date).isSame(moment(), 'day')).length, 1000);
    this.animateValue('followUpPending', 0, this.filteredLeads.filter(l => l.Next_FollowUp_Date && moment(l.Next_FollowUp_Date).isBefore(moment(), 'day')).length, 1000);
    this.animateValue('quotationSent', 0, this.filteredLeads.filter(l => (l.Status_Name || '').toLowerCase().includes('quotation')).length, 1000);
  }

  prepareCharts() {
    // Status Chart
    const statusCount = {};
    this.filteredLeads.forEach(l => {
      const s = l.Status_Name ? l.Status_Name.trim() : 'Not Specified';
      statusCount[s] = (statusCount[s] || 0) + 1;
    });
    this.chartStatusData = Object.keys(statusCount).length ? Object.keys(statusCount).map(k => [k, statusCount[k]]) : [['No Data', 0]];

    // Source Chart
    const sourceCount = {};
    this.filteredLeads.forEach(l => {
      const s = l.Source_Name ? l.Source_Name.trim() : 'Not Specified';
      sourceCount[s] = (sourceCount[s] || 0) + 1;
    });
    this.chartSourceData = Object.keys(sourceCount).length ? Object.keys(sourceCount).map(k => [k, sourceCount[k]]) : [['No Data', 0]];

    // Industry Chart
    const indCount = {};
    this.filteredLeads.forEach(l => {
      const s = l.Vertical_Name ? l.Vertical_Name.trim() : 'Not Specified';
      indCount[s] = (indCount[s] || 0) + 1;
    });
    this.chartIndustryData = Object.keys(indCount).length ? Object.keys(indCount).map(k => [k, indCount[k]]) : [['No Data', 0]];

    // Monthly Trend
    const monthCounts = {};
    this.filteredLeads.forEach(l => {
      if (l.Entry_Date) {
        // Group by Year-Month
        const m = moment(l.Entry_Date).startOf('month').format('YYYY-MM-DD');
        if (!monthCounts[m]) monthCounts[m] = { created: 0, converted: 0 };
        monthCounts[m].created++;
        if ((l.Status_Name || '').toLowerCase().includes('won') || (l.Status_Name || '').toLowerCase().includes('converted')) {
          monthCounts[m].converted++;
        }
      }
    });
    // Sort chronologically
    const sortedMonths = Object.keys(monthCounts).sort((a, b) => moment(a).valueOf() - moment(b).valueOf());
    
    if (sortedMonths.length > 0) {
       this.chartTrendData = sortedMonths.map(m => [new Date(m), monthCounts[m].created, monthCounts[m].converted]);
    } else {
       // Provide dummy data so it doesn't crash if rendered
       this.chartTrendData = [[new Date(), 0, 0]];
    }
  }

  prepareLeaderboard() {
    const staffMap = {};
    this.filteredLeads.forEach(l => {
      if (!l.Staff_Name) return;
      if (!staffMap[l.Staff_Name]) staffMap[l.Staff_Name] = { name: l.Staff_Name, assigned: 0, converted: 0, lost: 0 };
      
      staffMap[l.Staff_Name].assigned++;
      
      const status = (l.Status_Name || '').toLowerCase();
      if (status.includes('won') || status.includes('convert')) staffMap[l.Staff_Name].converted++;
      if (status.includes('lost') || status.includes('reject')) staffMap[l.Staff_Name].lost++;
    });
    
    this.staffPerformance = Object.values(staffMap).map((s: any) => {
      s.conversionRate = s.assigned ? ((s.converted / s.assigned) * 100).toFixed(1) + '%' : '0%';
      return s;
    }).sort((a: any, b: any) => b.converted - a.converted); // Sort by highest conversion
  }

  prepareRecentLeads() {
    // Sort by descending Entry_Date
    const sorted = [...this.filteredLeads].sort((a, b) => moment(b.Entry_Date).valueOf() - moment(a.Entry_Date).valueOf());
    this.dataSource.data = sorted;
  }

  openLead(id: number) {
    if (id) {
      this.router.navigate(['/Lead', id]);
    }
  }

  navigateFromCard(cardName: string) {
    let queryParams: any = {};
    let route = '/Lead';
    
    switch (cardName) {
      case 'Total Leads':
        break;
      case 'New Leads':
        queryParams = { status: 'New' };
        break;
      case 'Assigned Leads':
        queryParams = { assigned: 'true' };
        break;
      case 'Unassigned Leads':
        queryParams = { assigned: 'false' };
        break;
      case 'In Progress':
        queryParams = { status: 'In Progress' };
        break;
      case 'Follow-up Pending':
        queryParams = { followup: 'Pending' };
        break;
      case 'Follow-up Today':
        queryParams = { followup: 'Today' };
        break;
      case 'Quotation Sent':
        route = '/Quotation_Confirmation';
        queryParams = {}; // Assuming the confirmation page already shows what we need
        break;
      case 'Converted Leads':
        queryParams = { status: 'Converted' };
        break;
      case 'Lost Leads':
        queryParams = { status: 'Lost' };
        break;
      case 'Closed Leads':
        queryParams = { status: 'Closed' };
        break;
      case 'Rejected Leads':
        queryParams = { status: 'Rejected' };
        break;
    }
    
    this.router.navigate([route], { queryParams });
  }
}
