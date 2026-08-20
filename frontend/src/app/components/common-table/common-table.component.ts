import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.css']
})
export class CommonTableComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() columns: { key: string, label: string }[] = [];
  @Input() isLoading: boolean = false;
  @Input() pageIndex: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalCount: number = 0;
  
  @Output() search = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() add = new EventEmitter<void>();

  searchText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSearchChange() {
    this.search.emit(this.searchText);
  }

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

  onAdd() {
    this.add.emit();
  }

  prevPage() {
    if (this.pageIndex > 1) {
      this.pageChange.emit(this.pageIndex - 1);
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.totalCount / this.pageSize);
    if (this.pageIndex < totalPages) {
      this.pageChange.emit(this.pageIndex + 1);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize) || 1;
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }
}
