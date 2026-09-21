import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-follow-up-calendar',
  templateUrl: './follow-up-calendar.component.html',
  styleUrls: ['./follow-up-calendar.component.scss']
})
export class FollowUpCalendarComponent implements OnInit {

  // Dummy table data
  calendarData = [
    { date: '09-Sep-2026', customer: 'Amala Hospital - Thrissur', nextAction: 'Meeting Scheduled', status: 'Qualified', priority: 'High', contact: 'Clint' },
    { date: '09-Sep-2026', customer: 'Gokulam Coorg', nextAction: 'Need to Get Pricing', status: 'Qualified', priority: 'High', contact: 'Crossgen' },
    { date: '09-Sep-2026', customer: 'Radisson Blu', nextAction: 'Need to Get Pricing', status: 'Qualified', priority: 'High', contact: '0' },
    { date: '09-Sep-2026', customer: 'UFS', nextAction: 'Send Quote', status: 'Quotation Sent', priority: '0', contact: '0' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
