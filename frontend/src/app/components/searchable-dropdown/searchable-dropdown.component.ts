import { Component, Input, Output, EventEmitter, forwardRef, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-searchable-dropdown',
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableDropdownComponent),
      multi: true
    }
  ]
})
export class SearchableDropdownComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() data: any[] = [];
  @Input() bindLabel: string = 'name';
  @Input() bindValue: string = 'id';
  @Input() placeholder: string = 'Select...';
  @Input() loading: boolean = false;
  
  @Output() search = new EventEmitter<string>();
  @Output() loadMore = new EventEmitter<void>();

  isOpen: boolean = false;
  value: any = null;
  searchText: string = '';
  private searchSubject = new Subject<string>();

  onChange = (val: any) => {};
  onTouched = () => {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(1000)).subscribe((searchValue) => {
      this.search.emit(searchValue);
    });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen) {
        this.isOpen = false;
        this.clearSearch();
      }
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.onTouched();
    } else {
      this.clearSearch();
    }
  }

  onSearchChange(event: any) {
    this.searchText = event.target.value;
    this.searchSubject.next(this.searchText);
  }

  selectItem(item: any, event: Event) {
    event.stopPropagation();
    this.value = item[this.bindValue];
    this.onChange(this.value);
    this.isOpen = false;
    this.clearSearch();
  }

  clearSearch() {
    if (this.searchText !== '') {
      this.searchText = '';
      this.searchSubject.next('');
    }
  }

  onScroll(event: any) {
    const target = event.target;
    // Check if scrolled near the bottom (within 20px)
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 20) {
      if (!this.loading) {
        this.loadMore.emit();
      }
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  getDisplayValue(): string {
    if (this.value != null && Array.isArray(this.data)) {
      const selectedItem = this.data.find(item => item[this.bindValue] === this.value);
      return selectedItem ? selectedItem[this.bindLabel] : '';
    }
    return '';
  }
}
