import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Lead } from '../../models/Lead';

@Component({
  selector: 'app-lead-assignment',
  templateUrl: './lead-assignment.component.html',
  styles: [`
    /* ── Assign section: 3-column grid ── */
    .popup-layout {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .popup-grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px 20px;
    }
    /* Remark field spans full height of its cell */
    .mod-field-remark {
      display: flex;
      flex-direction: column;
      gap: 6px;
      grid-row: span 1;
    }
    /* ── Pipeline section separator ── */
    .popup-pipeline-section {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
    }
    .popup-section-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 700;
      color: #1e293b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 14px;
    }
    .popup-section-header .material-icons {
      font-size: 18px;
      color: #64748b;
    }
    .popup-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px 20px;
    }
    /* ── Field common ── */
    .mod-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .mod-label {
      font-size: 11px;
      font-weight: 700;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 6px;
      text-transform: uppercase;
    }
    .mod-label .material-icons {
      font-size: 16px;
      color: #64748b;
    }
    .mod-label .req {
      color: #ef4444;
    }
    .mod-input-group {
      display: flex;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #fff;
    }
    .mod-icon-box {
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f1f5f9;
      border-right: 1px solid #cbd5e1;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      color: #64748b;
    }
    .mod-icon-box .material-icons {
      font-size: 18px;
    }
    .mod-input-wrapper {
      flex: 1;
      min-width: 0;
    }
    /* Hide the default searchable dropdown borders inside our input group */
    ::ng-deep .mod-input-wrapper app-searchable-dropdown .ng-select-container {
      border: none !important;
      border-radius: 0 !important;
      background: transparent !important;
    }
    .mod-textarea {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10px;
      font-size: 13px;
      resize: vertical;
      min-height: 88px;
      font-family: inherit;
      flex: 1;
    }
    .mod-input {
      width: 100%;
      border: none;
      padding: 8px 12px;
      font-size: 13px;
      outline: none;
      font-family: inherit;
    }
    @media (max-width: 768px) {
      .popup-grid-3 { grid-template-columns: 1fr; }
      .popup-grid-2 { grid-template-columns: 1fr; }
    }
  `]
})
export class LeadAssignmentComponent {
  @Input() lead: Lead;
  @Input() dropdownData: any;
  @Input() isViewMode: boolean = false;
  @Input() isPopup: boolean = false;
  
  @Input() selectedPipelineStage: string = '';
  @Output() selectedPipelineStageChange = new EventEmitter<string>();

  @Input() selectedPulse: string = '';
  @Output() selectedPulseChange = new EventEmitter<string>();

  @Input() expanded: boolean = false;
  @Output() expandedChange = new EventEmitter<boolean>();

  @Output() searchDropdown = new EventEmitter<{ type: string; search: string; id: number }>();
  @Output() loadMoreDropdown = new EventEmitter<{ type: string; id: number }>();
  @Output() locationChange = new EventEmitter<void>();
  @Output() departmentChange = new EventEmitter<void>();

  onSearchDropdown(type: string, search: string, id: number = 0) {
    this.searchDropdown.emit({ type, search, id });
  }

  onLoadMoreDropdown(type: string, id: number = 0) {
    this.loadMoreDropdown.emit({ type, id });
  }

  Location_Change() {
    this.locationChange.emit();
  }

  Department_Change() {
    this.departmentChange.emit();
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
}
