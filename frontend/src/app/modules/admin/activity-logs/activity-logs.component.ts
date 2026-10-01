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

  // Filters
  startDate: string = '';
  endDate: string = '';
  activityLogsList: any[] = [];

  fetchActivityLogs() {
    const filters: any = {};
    if (this.startDate) filters.startDate = this.startDate;
    if (this.endDate) filters.endDate = this.endDate;

    this.leadService.Get_Activity_Logs_Summary(filters).subscribe((res: any) => {
      if (res && res.length > 0) {
        let total = 0;
        let today = 0;
        
        const typeGroups: any = {};
        const staffGroups: any = {};
        const deptGroups: any = {};
        
        const todayStr = new Date().toISOString().split('T')[0];

        res.forEach((item: any) => {
          total += item.Count;
          
          let dateStr = new Date(item.Date).toISOString().split('T')[0];
          if (dateStr === todayStr) {
            today += item.Count;
          }

          let type = item.Activity_Type || 'Unknown';
          if (!typeGroups[type]) typeGroups[type] = 0;
          typeGroups[type] += item.Count;

          let staff = item.Staff_Name || 'System/Unassigned';
          if (!staffGroups[staff]) staffGroups[staff] = 0;
          staffGroups[staff] += item.Count;

          let dept = item.Department_Name || 'Unassigned';
          if (!deptGroups[dept]) deptGroups[dept] = 0;
          deptGroups[dept] += item.Count;
        });

        this.animateValue('displayTotalActivities', 0, total, 1500);
        this.animateValue('displayActivitiesToday', 0, today, 1500);

        // Process Type Chart
        this.fullChartTypeData = Object.keys(typeGroups)
          .map(k => [k, typeGroups[k]])
          .sort((a, b) => b[1] - a[1]);
        this.chartTypeData = this.fullChartTypeData.slice(0, 3);
        if(this.fullChartTypeData.length > 0) this.topActivityType = this.fullChartTypeData[0][0];
        
        // Process Staff Chart & Top Staff
        let maxStaffCount = 0;
        this.fullChartStaffData = Object.keys(staffGroups).map(k => {
          if (staffGroups[k] > maxStaffCount && k !== 'System/Unassigned') {
            maxStaffCount = staffGroups[k];
            this.topStaffName = k;
          }
          return [k, staffGroups[k]];
        }).sort((a, b) => b[1] - a[1]); 

        this.chartStaffData = this.fullChartStaffData.slice(0, 2);

        // Process Dept Chart & Top Dept
        let maxDeptCount = 0;
        this.fullChartDeptData = Object.keys(deptGroups).map(k => {
          if (deptGroups[k] > maxDeptCount && k !== 'Unassigned') {
            maxDeptCount = deptGroups[k];
            this.topDeptName = k;
          }
          return [k, deptGroups[k]];
        }).sort((a, b) => b[1] - a[1]);

        this.chartDeptData = this.fullChartDeptData.slice(0, 3);

      } else {
        // Reset if no data
        this.displayTotalActivities = 0;
        this.displayActivitiesToday = 0;
        this.chartTypeData = [];
        this.chartStaffData = [];
        this.chartDeptData = [];
        this.topActivityType = 'N/A';
        this.topStaffName = 'N/A';
        this.topDeptName = 'N/A';
      }
    }, error => {
      console.error("Error fetching activity logs summary:", error);
    });

    // Fetch the detailed list
    this.leadService.Get_Activity_Logs_List(filters).subscribe((res: any) => {
      if (res && Array.isArray(res)) {
        this.activityLogsList = res;
      } else {
        this.activityLogsList = [];
      }
    }, error => {
      console.error("Error fetching activity logs list:", error);
    });
  }
}
