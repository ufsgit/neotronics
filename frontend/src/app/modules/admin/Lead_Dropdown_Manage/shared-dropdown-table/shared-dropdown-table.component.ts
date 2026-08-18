import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'app-shared-dropdown-table',
  templateUrl: './shared-dropdown-table.component.html',
  styleUrls: ['./shared-dropdown-table.component.scss']
})
export class SharedDropdownTableComponent implements OnInit {

  @Input() title: string = 'Manage Data';
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;

  @Output() pageChange = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();
  @Output() addAction = new EventEmitter<void>();
  @Output() editAction = new EventEmitter<any>();
  @Output() deleteAction = new EventEmitter<any>();

  searchTerm: string = '';
  searchTimeout: any;

  constructor() { }

  ngOnInit(): void {
  }

  get Math() {
    return Math;
  }

  onSearchChange(event: any) {
    const value = event.target.value;
    this.searchTerm = value;
    
    // Debounce the search input
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.search.emit(this.searchTerm);
    }, 500); // 500ms delay
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  onAdd() {
    this.addAction.emit();
  }

  onEdit(item: any) {
    this.editAction.emit(item);
  }

  onDelete(item: any) {
    this.deleteAction.emit(item);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
