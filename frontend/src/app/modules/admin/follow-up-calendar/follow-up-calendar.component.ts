import { Component, OnInit } from '@angular/core';
import { CalendarFollowUp_Service } from '../../../services/CalendarFollowUp.Service';

export type CalendarView = 'day' | 'week' | 'month' | 'all';

export interface FollowUp {
  date: string;        // 'YYYY-MM-DD'
  customer: string;
  nextAction: string;
  status: string;
  priority: string;
  contact: string;
}

@Component({
  selector: 'app-follow-up-calendar',
  templateUrl: './follow-up-calendar.component.html',
  styleUrls: ['./follow-up-calendar.component.scss']
})
export class FollowUpCalendarComponent implements OnInit {

  followUps: FollowUp[] = [];
  view: CalendarView = 'day';
  selectedDate: Date = new Date();
  showDatePicker = false;
  pickerValue = '';
  displayMode: 'list' | 'calendar' = 'list';

  constructor(private calendarService: CalendarFollowUp_Service) {}

  ngOnInit(): void {
    this.pickerValue = this.toInputDate(this.selectedDate);
    this.fetchFollowUps();
  }

  fetchFollowUps(): void {
    const viewTypeMap = {
      'day': 'DAY',
      'week': 'WEEK',
      'month': 'MONTH',
      'all': 'MONTH' // Fallback to month if all
    };
    
    const formattedDate = this.toInputDate(this.selectedDate);
    const apiViewType = viewTypeMap[this.view];

    this.calendarService.Get_Calendar_FollowUps(apiViewType, formattedDate).subscribe({
      next: (data) => {
        if (data && data.length >= 0) {
          this.followUps = data;
        } else {
          this.followUps = [];
        }
      },
      error: (err) => {
        console.error('Error fetching calendar follow-ups', err);
        this.followUps = [];
      }
    });
  }

  // ---------- Navigation ----------

  goToday(): void {
    this.selectedDate = new Date();
    this.syncPicker();
    this.fetchFollowUps();
  }

  prev(): void {
    this.shift(-1);
  }

  next(): void {
    this.shift(1);
  }

  private shift(direction: 1 | -1): void {
    const d = new Date(this.selectedDate);
    if (this.view === 'day') {
      d.setDate(d.getDate() + direction);
    } else if (this.view === 'week') {
      d.setDate(d.getDate() + direction * 7);
    } else {
      d.setMonth(d.getMonth() + direction);
    }
    this.selectedDate = d;
    this.syncPicker();
    this.fetchFollowUps();
  }

  setView(view: CalendarView): void {
    this.view = view;
    if (view === 'month') {
      this.displayMode = 'calendar';
    } else if (view === 'day' || view === 'week') {
      this.displayMode = 'list';
    }
    this.fetchFollowUps();
  }

  // ---------- Date picker ----------

  togglePicker(): void {
    this.showDatePicker = !this.showDatePicker;
  }

  onPickerChange(value: string): void {
    if (!value) { return; }
    const [y, m, d] = value.split('-').map(Number);
    this.selectedDate = new Date(y, m - 1, d);
    this.showDatePicker = false;
    this.syncPicker();
    this.fetchFollowUps();
  }

  private syncPicker(): void {
    this.pickerValue = this.toInputDate(this.selectedDate);
  }

  private toInputDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  // ---------- Derived display ----------

  get formattedSelectedDate(): string {
    return this.selectedDate.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
  }

  get selectedWeekday(): string {
    return this.selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
  }

  getRangeLabelFor(viewType: CalendarView): string {
    if (viewType === 'day') {
      return `${this.selectedWeekday.toUpperCase()}, ${this.formattedSelectedDate}`;
    }
    if (viewType === 'week') {
      const { start, end } = this.weekRange(this.selectedDate);
      return `${this.short(start)} – ${this.short(end)}`;
    }
    if (viewType === 'month' || viewType === 'all') {
      return this.selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
    }
    return '';
  }

  get rangeLabel(): string {
    return this.getRangeLabelFor(this.view === 'all' ? 'month' : this.view);
  }

  private short(d: Date): string {
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  private weekRange(d: Date): { start: Date; end: Date } {
    const start = new Date(d);
    const day = start.getDay(); // 0 = Sunday
    start.setDate(start.getDate() - day);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  }

  getRowsForView(viewType: CalendarView): FollowUp[] {
    const rows = this.followUps.filter(f => {
      const fd = this.parse(f.date);
      if (viewType === 'day') {
        return this.sameDay(fd, this.selectedDate);
      }
      if (viewType === 'week') {
        const { start, end } = this.weekRange(this.selectedDate);
        return fd >= this.stripTime(start) && fd <= this.stripTime(end);
      }
      if (viewType === 'month' || viewType === 'all') {
        return fd.getFullYear() === this.selectedDate.getFullYear()
          && fd.getMonth() === this.selectedDate.getMonth();
      }
      return false;
    });

    const padded: (FollowUp | null)[] = [...rows];
    while (padded.length < 6) { padded.push(null); }
    return padded as FollowUp[];
  }

  get visibleRows(): FollowUp[] {
    return this.getRowsForView(this.view);
  }

  private parse(dateStr: string): Date {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  private stripTime(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  private sameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
  }

  // ---------- Calendar Mode ----------

  toggleDisplayMode(): void {
    this.displayMode = this.displayMode === 'list' ? 'calendar' : 'list';
  }

  isToday(d: Date): boolean {
    return this.sameDay(d, new Date());
  }

  get calendarWeeks(): Date[][] {
    const monthStart = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1);
    const monthEnd = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0);
    
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
    let current = new Date(startDate);
    
    while (current <= endDate) {
      currentWeek.push(new Date(current));
      if (current.getDay() === 6) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      current.setDate(current.getDate() + 1);
    }
    return weeks;
  }
  
  getFollowUpsForDate(d: Date): FollowUp[] {
    return this.followUps.filter(f => {
      const fd = this.parse(f.date);
      return this.sameDay(fd, d);
    });
  }

  // ---------- Modal ----------
  selectedDayLeads: FollowUp[] | null = null;
  selectedDayForModal: Date | null = null;

  openLeadsModal(day: Date): void {
    this.selectedDayLeads = this.getFollowUpsForDate(day);
    this.selectedDayForModal = day;
  }

  closeLeadsModal(): void {
    this.selectedDayLeads = null;
    this.selectedDayForModal = null;
  }
}
