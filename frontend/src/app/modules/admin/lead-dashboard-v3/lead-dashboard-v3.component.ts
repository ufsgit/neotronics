import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lead-dashboard-v3',
  templateUrl: './lead-dashboard-v3.component.html',
  styleUrls: ['./lead-dashboard-v3.component.scss']
})
export class LeadDashboardV3Component implements OnInit {

  showPipelineGraph = false;
  activityChartMode: 'daily' | 'weekly' | 'monthly' = 'daily';

  // Dummy Activity Tables Data
  dayWiseActivity = [
    { date: '08-Sep', activities: 0, won: 0 },
    { date: '09-Sep', activities: 0, won: 0 },
    { date: '10-Sep', activities: 0, won: 0 },
    { date: '11-Sep', activities: 0, won: 0 },
    { date: '12-Sep', activities: 0, won: 0 },
    { date: '13-Sep', activities: 0, won: 0 },
    { date: '14-Sep', activities: 0, won: 0 },
    { date: '15-Sep', activities: 0, won: 0 },
    { date: '16-Sep', activities: 0, won: 0, highlight: true },
    { date: '17-Sep', activities: 0, won: 0 }
  ];

  weekWiseActivity = [
    { week: '03-Aug-2026', activities: 0, won: 0 },
    { week: '10-Aug-2026', activities: 0, won: 0 },
    { week: '17-Aug-2026', activities: 0, won: 0 },
    { week: '24-Aug-2026', activities: 0, won: 0 },
    { week: '31-Aug-2026', activities: 14, won: 0 },
    { week: '07-Sep-2026', activities: 0, won: 0 },
    { week: '14-Sep-2026', activities: 0, won: 0 },
    { week: '21-Sep-2026', activities: 0, won: 0 }
  ];

  monthWiseActivity = [
    { month: 'Oct 2025', activities: 0, won: 0 },
    { month: 'Nov 2025', activities: 0, won: 0 },
    { month: 'Dec 2025', activities: 0, won: 0 },
    { month: 'Jan 2026', activities: 0, won: 0 },
    { month: 'Feb 2026', activities: 0, won: 0 },
    { month: 'Mar 2026', activities: 0, won: 0 },
    { month: 'Apr 2026', activities: 0, won: 0 },
    { month: 'May 2026', activities: 0, won: 0 },
    { month: 'Jun 2026', activities: 0, won: 0 },
    { month: 'Jul 2026', activities: 0, won: 0 }
  ];

  // Dummy Chart Data for google-charts
  chartData = {
    daily: {
      data: [
        ['08-Sep', 0],
        ['10-Sep', 0],
        ['12-Sep', 0],
        ['14-Sep', 0],
        ['16-Sep', 0],
        ['18-Sep', 0],
        ['20-Sep', 0]
      ],
      options: {
        legend: { position: 'right' },
        colors: ['#4285F4'],
        hAxis: { slantedText: true, slantedTextAngle: 45 },
        vAxis: { minValue: 0, maxValue: 1 },
        chartArea: { width: '75%', height: '65%' }
      }
    },
    weekly: {
      data: [
        ['03-Aug', 0],
        ['10-Aug', 0],
        ['17-Aug', 0],
        ['24-Aug', 0],
        ['31-Aug', 14],
        ['07-Sep', 0],
        ['14-Sep', 0],
        ['21-Sep', 0]
      ],
      options: {
        legend: { position: 'right' },
        colors: ['#4285F4'],
        curveType: 'function',
        hAxis: { slantedText: true, slantedTextAngle: 45 },
        vAxis: { minValue: -2, maxValue: 16 },
        chartArea: { width: '75%', height: '65%' }
      }
    },
    monthly: {
      data: [
        ['Oct 25', 0],
        ['Dec 25', 0],
        ['Feb 26', 0],
        ['Apr 26', 0],
        ['Jun 26', 0],
        ['Aug 26', 14]
      ],
      options: {
        legend: { position: 'right' },
        colors: ['#4285F4'],
        curveType: 'function',
        hAxis: { slantedText: true, slantedTextAngle: 45 },
        vAxis: { minValue: -2, maxValue: 16 },
        chartArea: { width: '75%', height: '65%' }
      }
    },
    pipeline: {
      data: [
        ['Raw Lead', 4],
        ['Qualified', 10],
        ['Quotation Sent', 10],
        ['Ghosting', 0],
        ['Final Stage', 1],
        ['Won', 0],
        ['Lost', 0]
      ],
      options: {
        legend: { position: 'right' },
        pieHole: 0.4,
        chartArea: { width: '90%', height: '80%' }
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
