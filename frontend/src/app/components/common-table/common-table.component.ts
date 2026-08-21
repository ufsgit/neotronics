import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.css']
})
export class CommonTableComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() columns: { key: string, label: string }[] = [];
  @Input() isLoading: boolean = false;
  @Input() pageIndex: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalCount: number = 0;
  @Input() searchText: string = '';
  
  @Output() search = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() add = new EventEmitter<void>();

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(term => {
      this.search.emit(term);
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  get pagedData(): any[] {
    if (!this.data || this.data.length === 0) return [];
    if (this.data.length <= this.pageSize) return this.data;
    const start = (this.pageIndex - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  onSearchChange() {
    this.searchSubject.next(this.searchText);
  }

  onEdit(item: any, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.edit.emit(item);
  }

  onDelete(item: any, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.delete.emit(item);
  }

  onAdd(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
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
