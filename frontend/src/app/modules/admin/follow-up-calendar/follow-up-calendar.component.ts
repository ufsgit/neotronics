import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CalendarFollowUp_Service } from '../../../services/CalendarFollowUp.Service';
import { Lead_Service } from '../../../services/Lead.Service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

export type CalendarView = 'day' | 'week' | 'month' | 'all';

export interface FollowUp {
  Lead_Id?: number;
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

  constructor(
    private calendarService: CalendarFollowUp_Service, 
    private router: Router, 
    private Lead_Service_: Lead_Service, 
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  calendarWeeks: Date[][] = [];

  ngOnInit(): void {
    this.pickerValue = this.toInputDate(this.selectedDate);
    this.updateCalendarWeeks();
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
    this.updateCalendarWeeks();
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
    this.updateCalendarWeeks();
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
    this.updateCalendarWeeks();
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

  updateCalendarWeeks(): void {
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
    this.calendarWeeks = weeks;
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
    console.log('openLeadsModal called for day:', day);
    this.selectedDayLeads = this.getFollowUpsForDate(day);
    this.selectedDayForModal = day;
  }

  closeLeadsModal(): void {
    this.selectedDayLeads = null;
    this.selectedDayForModal = null;
  }
  // --- FollowUp Modal Properties ---
  issLoading = false;
  FollowUp_Popup_Open = false;
  Selected_Lead_For_FollowUp: any = null;
  Selected_Pipeline_Stage = '';
  Selected_Pulse = '';

  DropdownData: { [key: string]: any[] } = {};
  DropdownPage: { [key: string]: number } = {};
  DropdownSearch: { [key: string]: string } = {};
  DropdownLoading: { [key: string]: boolean } = {};
  DropdownEnd: { [key: string]: boolean } = {};
  DropdownOriginalData: { [key: string]: any[] } = {};
  DropdownOriginalPage: { [key: string]: number } = {};
  DropdownOriginalEnd: { [key: string]: boolean } = {};

  openFollowUp(lead: FollowUp): void {
    if (lead && (lead as any).Lead_Id) {
      this.ngZone.run(() => {
        this.issLoading = true;
        this.Lead_Service_.Get_NewLeadByID((lead as any).Lead_Id).pipe(finalize(() => {
          this.ngZone.run(() => {
            this.issLoading = false;
            this.cdr.detectChanges();
          });
        })).subscribe(data => {
          this.ngZone.run(() => {
            if (data && data.length > 0 && data[0].length > 0) {
              this.Selected_Lead_For_FollowUp = Object.assign({}, data[0][0]);
              this.Selected_Lead_For_FollowUp.Is_FollowUp = true;
              
              if (this.Selected_Lead_For_FollowUp.Current_Pipeline_Stage) {
                this.Selected_Pipeline_Stage = this.Selected_Lead_For_FollowUp.Current_Pipeline_Stage;
              } else {
                this.Selected_Pipeline_Stage = '';
              }
              
              if (this.Selected_Lead_For_FollowUp.Pulse) {
                this.Selected_Pulse = this.Selected_Lead_For_FollowUp.Pulse;
              } else {
                this.Selected_Pulse = '';
              }

              if (this.Selected_Lead_For_FollowUp.Next_FollowUp_Date) {
                try {
                  const d = new Date(this.Selected_Lead_For_FollowUp.Next_FollowUp_Date);
                  if (!isNaN(d.getTime())) {
                    this.Selected_Lead_For_FollowUp.FollowUp_Next_Date = d.toISOString().split('T')[0];
                  }
                } catch(e) {}
              }
              if (this.Selected_Lead_For_FollowUp.Remarks) {
                this.Selected_Lead_For_FollowUp.FollowUp_Remark = this.Selected_Lead_For_FollowUp.Remarks;
              }

              if (this.Selected_Lead_For_FollowUp.Branch_Id > 0) {
                this.Selected_Lead_For_FollowUp.FollowUp_Location_Id = this.Selected_Lead_For_FollowUp.Branch_Id;
                this.DropdownData['Branch'] = [{ id: this.Selected_Lead_For_FollowUp.Branch_Id, name: this.Selected_Lead_For_FollowUp.Branch_Name }];
              }
              if (this.Selected_Lead_For_FollowUp.Department_Id > 0) {
                this.Selected_Lead_For_FollowUp.FollowUp_Department_Id = this.Selected_Lead_For_FollowUp.Department_Id;
                this.DropdownData['Department_' + this.Selected_Lead_For_FollowUp.Branch_Id] = [{ id: this.Selected_Lead_For_FollowUp.Department_Id, name: this.Selected_Lead_For_FollowUp.Department_Name }];
              }
              if (this.Selected_Lead_For_FollowUp.Staff_Id > 0) {
                this.Selected_Lead_For_FollowUp.FollowUp_Staff_Id = this.Selected_Lead_For_FollowUp.Staff_Id;
                this.DropdownData['Staff_' + this.Selected_Lead_For_FollowUp.Department_Id] = [{ id: this.Selected_Lead_For_FollowUp.Staff_Id, name: this.Selected_Lead_For_FollowUp.Staff_Name }];
              }
              if (this.Selected_Lead_For_FollowUp.Status_Id > 0) {
                this.Selected_Lead_For_FollowUp.FollowUp_Status_Id = this.Selected_Lead_For_FollowUp.Status_Id;
                this.DropdownData['TargetStage'] = [{ id: this.Selected_Lead_For_FollowUp.Status_Id, name: this.Selected_Lead_For_FollowUp.Status_Name }];
              }

              if (!this.DropdownData['Branch'] || this.DropdownData['Branch'].length === 0) this.loadDropdownData('Branch', false, 0);
              if (!this.DropdownData['TargetStage'] || this.DropdownData['TargetStage'].length === 0) this.loadDropdownData('TargetStage', false, 0);
              if (!this.DropdownData['PipelineStage'] || this.DropdownData['PipelineStage'].length === 0) this.loadDropdownData('PipelineStage', false, 0);
              if (!this.DropdownData['Pulse'] || this.DropdownData['Pulse'].length === 0) this.loadDropdownData('Pulse', false, 0);
              
              this.FollowUp_Popup_Open = true;
              this.cdr.detectChanges();
            }
          });
        });
      });
    }
  }

  loadDropdownData(type: string, append: boolean = false, filterId: number = 0) {
    const cacheKey = ((type === 'District' || type === 'Department' || type === 'Staff') && filterId) ? `${type}_${filterId}` : type;
    if (this.DropdownLoading[cacheKey]) return;
    if (append && this.DropdownEnd[cacheKey]) return;
    const search = this.DropdownSearch[cacheKey] || '';
    if (!append && search === '' && this.DropdownOriginalData[cacheKey]) {
      this.DropdownData[cacheKey] = [...this.DropdownOriginalData[cacheKey]];
      return;
    }
    this.DropdownLoading[cacheKey] = true;
    const page = this.DropdownPage[cacheKey] || 1;
    this.Lead_Service_.Search_Lead_Dropdowns(type, search, page, filterId).subscribe(Rows => {
      this.DropdownLoading[cacheKey] = false;
      const data = Array.isArray(Rows) ? Rows : [];
      if (data.length < 20) this.DropdownEnd[cacheKey] = true;
      if (append) {
        this.DropdownData[cacheKey] = [...(this.DropdownData[cacheKey] || []), ...data];
        if (search === '') {
          this.DropdownOriginalData[cacheKey] = [...this.DropdownData[cacheKey]];
          this.DropdownOriginalPage[cacheKey] = this.DropdownPage[cacheKey] || 1;
          this.DropdownOriginalEnd[cacheKey] = this.DropdownEnd[cacheKey] || false;
        }
      } else {
        this.DropdownData[cacheKey] = data;
        if (search === '') {
          this.DropdownOriginalData[cacheKey] = [...data];
          this.DropdownOriginalPage[cacheKey] = this.DropdownPage[cacheKey] || 1;
          this.DropdownOriginalEnd[cacheKey] = this.DropdownEnd[cacheKey] || false;
        }
      }
    }, () => this.DropdownLoading[cacheKey] = false);
  }

  onSearchDropdown(type: string, searchText: string, filterId: number = 0) {
    const cacheKey = ((type === 'District' || type === 'Department' || type === 'Staff') && filterId) ? `${type}_${filterId}` : type;
    this.DropdownSearch[cacheKey] = searchText;
    this.DropdownEnd[cacheKey] = false;
    if (searchText === '' && this.DropdownOriginalData[cacheKey]) {
      this.DropdownData[cacheKey] = [...this.DropdownOriginalData[cacheKey]];
      this.DropdownPage[cacheKey] = this.DropdownOriginalPage[cacheKey] || 1;
      this.DropdownEnd[cacheKey] = this.DropdownOriginalEnd[cacheKey] || false;
      return;
    }
    this.DropdownPage[cacheKey] = 1;
    this.loadDropdownData(type, false, filterId);
  }

  onLoadMoreDropdown(type: string, filterId: number = 0) {
    const cacheKey = ((type === 'District' || type === 'Department' || type === 'Staff') && filterId) ? `${type}_${filterId}` : type;
    if (this.DropdownLoading[cacheKey] || this.DropdownEnd[cacheKey]) return;
    this.DropdownPage[cacheKey] = (this.DropdownPage[cacheKey] || 1) + 1;
    this.loadDropdownData(type, true, filterId);
  }

  Location_Change() {
    this.Selected_Lead_For_FollowUp.FollowUp_Department_Id = 0;
    this.Department_Change();
  }

  Department_Change() {
    this.Selected_Lead_For_FollowUp.FollowUp_Staff_Id = 0;
  }

  Save_FollowUp() {
    const lead = this.Selected_Lead_For_FollowUp;
    if (!lead.FollowUp_Location_Id || lead.FollowUp_Location_Id === 0) { this.snackBar.open('Please select a Branch.', 'Close', { duration: 3500 }); return; }
    if (!lead.FollowUp_Department_Id || lead.FollowUp_Department_Id === 0) { this.snackBar.open('Please select Department Responsibility.', 'Close', { duration: 3500 }); return; }
    if (!lead.FollowUp_Staff_Id || lead.FollowUp_Staff_Id === 0) { this.snackBar.open('Please select an Assigned Owner.', 'Close', { duration: 3500 }); return; }
    if (!lead.FollowUp_Status_Id || lead.FollowUp_Status_Id === 0) { this.snackBar.open('Please select a Target Stage.', 'Close', { duration: 3500 }); return; }
    
    const branchKey = 'Branch';
    const deptKey = 'Department_' + lead.FollowUp_Location_Id;
    const staffKey = 'Staff_' + lead.FollowUp_Department_Id;

    const branchObj = (this.DropdownData[branchKey] || []).find((x: any) => x.id == lead.FollowUp_Location_Id);
    const deptObj = (this.DropdownData[deptKey] || []).find((x: any) => x.id == lead.FollowUp_Department_Id);
    const staffObj = (this.DropdownData[staffKey] || []).find((x: any) => x.id == lead.FollowUp_Staff_Id);
    const targetStageObj = (this.DropdownData['TargetStage'] || []).find((x: any) => x.id == lead.FollowUp_Status_Id);
    const pipelineObj = (this.DropdownData['PipelineStage'] || []).find((x: any) => x.name === this.Selected_Pipeline_Stage || x.id == this.Selected_Pipeline_Stage);
    const pulseObj = (this.DropdownData['Pulse'] || []).find((x: any) => x.name === this.Selected_Pulse || x.id == this.Selected_Pulse);


    const followUpPayload = {
      Lead_Id: lead.Lead_Id,
      Lead_Type: lead.Lead_Type,
      Branch_Id: lead.FollowUp_Location_Id,
      Branch_Name: branchObj ? branchObj.name : (lead.Branch_Name || ''),
      Department_Id: lead.FollowUp_Department_Id,
      Department_Name: deptObj ? deptObj.name : (lead.Department_Name || ''),
      Staff_Id: lead.FollowUp_Staff_Id,
      Staff_Name: staffObj ? staffObj.name : (lead.Staff_Name || ''),
      Target_Stage_Id: lead.FollowUp_Status_Id,
      Target_Stage_Name: targetStageObj ? targetStageObj.name : (lead.Status_Name || ''),
      Remark: (lead as any).FollowUp_Remark || '',
      Next_FollowUp_Date: (lead as any).FollowUp_Next_Date || null,
      Pipeline_Stage_Id: pipelineObj ? pipelineObj.id : null,
      Pipeline_Stage: pipelineObj ? pipelineObj.name : (this.Selected_Pipeline_Stage || null),
      Stage_Type: pipelineObj && pipelineObj.Stage_Type !== undefined ? Number(pipelineObj.Stage_Type) : 0,
      Followup_Required: pipelineObj && pipelineObj.Followup_Required !== undefined ? Number(pipelineObj.Followup_Required) : 1,
      Color: pipelineObj && pipelineObj.Color ? pipelineObj.Color : '#3b82f6',
      Pulse_Id: pulseObj ? pulseObj.id : null,
      Pulse: pulseObj ? pulseObj.name : (this.Selected_Pulse || null),
      Login_User_Id: Number(localStorage.getItem('Login_User') || 0)
    };

    this.issLoading = true;
    this.Lead_Service_.Save_FollowUp(followUpPayload).pipe(finalize(() => this.issLoading = false)).subscribe({
      next: (res: any) => {
        if (res && res.success) {
          this.FollowUp_Popup_Open = false;
          this.fetchFollowUps();
          if (this.selectedDayForModal) {
            this.openLeadsModal(this.selectedDayForModal);
          }
          this.snackBar.open('Follow Up saved successfully', 'Close', { duration: 3000 });
        } else {
          this.snackBar.open((res && res.message) || 'Error occurred.', 'Close', { duration: 4000 });
        }
      },
      error: () => {
        this.snackBar.open('Server Error.', 'Close', { duration: 4000 });
      }
    });
  }
}
