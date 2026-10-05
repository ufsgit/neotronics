import { Component, OnInit } from '@angular/core';
import { Lead_Service } from '../../../services/Lead.Service';

@Component({
  selector: 'app-activity-logs',
  templateUrl: './activity-logs.component.html',
  styleUrls: ['./activity-logs.component.scss']
})
export class ActivityLogsComponent implements OnInit {

  chartTypeData: any[] = [];
  chartStaffData: any[] = [];
  chartDeptData: any[] = [];
  
  chartColumnsType: string[] = ['Activity Type', 'Count'];
  chartColumnsStaff: string[] = ['Staff', 'Count'];
  chartColumnsDept: string[] = ['Department', 'Count'];

  chartOptionsPie = {
    legend: { position: 'right', alignment: 'center' },
    colors: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'],
    animation: { duration: 1500, easing: 'out', startup: true },
    is3D: true,
    pieHole: 0.4,
    chartArea: { left: 20, top: 20, width: '100%', height: '85%' }
  };
  
  chartOptionsBar = {
    legend: { position: 'none' },
    colors: ['#4e73df'],
    animation: { duration: 1500, easing: 'out', startup: true }
  };

  displayTotalActivities: number = 0;
  displayActivitiesToday: number = 0;

  topActivityType: string = 'N/A';
  topStaffName: string = 'N/A';
  topDeptName: string = 'N/A';

  constructor(private leadService: Lead_Service) { }

  ngOnInit() {
    this.fetchActivityLogs();
  }

  animateValue(propName: 'displayTotalActivities' | 'displayActivitiesToday', start: number, end: number, duration: number) {
    if (start === end) return;
    const startTime = performance.now();
    
    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // easeOutExpo for smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      this[propName] = Math.floor(easeProgress * (end - start) + start);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  fullChartTypeData: any[] = [];
  fullChartStaffData: any[] = [];
  fullChartDeptData: any[] = [];

  // Dynamic Modal State
  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalColumns: string[] = [];
  modalData: any[] = [];

  openModal(title: string, columns: string[], data: any[]) {
    this.modalTitle = title;
    this.modalColumns = columns;
    this.modalData = data;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Filters and Table State
  startDate: string = '';
  endDate: string = '';
  activityLogsList: any[] = [];
  
  staffViewMode: 'graph' | 'table' = 'graph';
  listCurrentPage: number = 1;
  listLimit: number = 10;

  toggleStaffView() {
    this.staffViewMode = this.staffViewMode === 'graph' ? 'table' : 'graph';
    if (this.staffViewMode === 'table') {
      this.fetchListLogs();
    }
  }
  
  fetchListLogs() {
    const filters: any = {
      page: this.listCurrentPage,
      limit: this.listLimit
    };
    if (this.startDate) filters.startDate = this.startDate;
    if (this.endDate) filters.endDate = this.endDate;

    this.leadService.Activity_Logs_List_Paginated(filters).subscribe((data: any[]) => {
      this.activityLogsList = data || [];
    }, err => console.error('List error:', err));
  }
  
  nextPage() {
    if (this.activityLogsList.length === this.listLimit) {
      this.listCurrentPage++;
      this.fetchListLogs();
    }
  }
  
  prevPage() {
    if(this.listCurrentPage > 1) {
      this.listCurrentPage--;
      this.fetchListLogs();
    }
  }

  fetchActivityLogs() {
    const filters: any = {};
    if (this.startDate) filters.startDate = this.startDate;
    if (this.endDate) filters.endDate = this.endDate;

    // Call 1: Activity_Logs_KPIs() — KPI cards
    this.leadService.Activity_Logs_KPIs().subscribe((kpis: any) => {
      if (kpis) {
        this.animateValue('displayTotalActivities', 0, kpis.TotalActivities || 0, 1500);
        this.animateValue('displayActivitiesToday', 0, kpis.ActivitiesToday || 0, 1500);
        this.topStaffName = kpis.TopStaff || 'N/A';
        this.topDeptName = kpis.TopDept || 'N/A';
      }
    }, err => console.error('KPIs error:', err));

    // Call 2: Activity_Logs_Type_Chart(startDate, endDate)
    this.leadService.Activity_Logs_Type_Chart(filters).subscribe((data: any[]) => {
      if (data && data.length > 0) {
        this.topActivityType = data[0].Activity_Type || 'N/A';
        this.fullChartTypeData = data.map(x => [x.Activity_Type, x.Count]);
        this.chartTypeData = this.fullChartTypeData.slice(0, 3);
      } else {
        this.topActivityType = 'N/A';
        this.fullChartTypeData = [];
        this.chartTypeData = [];
      }
    }, err => console.error('TypeChart error:', err));

    // Call 3: Activity_Logs_Dept_Chart(startDate, endDate)
    this.leadService.Activity_Logs_Dept_Chart(filters).subscribe((data: any[]) => {
      if (data && data.length > 0) {
        this.fullChartDeptData = data.map(x => [x.Department, x.Count]);
        this.chartDeptData = this.fullChartDeptData.slice(0, 3);
      } else {
        this.fullChartDeptData = [];
        this.chartDeptData = [];
      }
    }, err => console.error('DeptChart error:', err));

    // Call 4: Activity_Logs_Staff_Chart(startDate, endDate)
    this.leadService.Activity_Logs_Staff_Chart(filters).subscribe((data: any[]) => {
      if (data && data.length > 0) {
        this.fullChartStaffData = data.map(x => [x.Staff, x.Count]);
        this.chartStaffData = this.fullChartStaffData.slice(0, 5);
      } else {
        this.fullChartStaffData = [];
        this.chartStaffData = [];
      }
    }, err => console.error('StaffChart error:', err));
    
    // Refresh table too if it is active
    if (this.staffViewMode === 'table') {
      this.listCurrentPage = 1;
      this.fetchListLogs();
    }
  }
}
