import { Component, Input, Output, EventEmitter, ElementRef, HostListener, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Lead_Service } from '../../../services/Lead.Service';

@Component({
  selector: 'app-lead-filter-dropdown',
  templateUrl: './lead-filter-dropdown.component.html',
  styleUrls: ['./lead-filter-dropdown.component.css']
})
export class LeadFilterDropdownComponent implements OnInit, OnDestroy {
  @Input() type: string = '';
  @Input() placeholder: string = 'Select...';
  @Input() options: any[] = [];
  @Output() selectionChange = new EventEmitter<any>();

  @ViewChild('searchInput', { static: false }) searchInput: any;

  isOpen = false;
  searchTerm = '';
  selectedOptionName = '';

  
  page = 1;
  isLoading = false;
  hasMore = true;

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(private eRef: ElementRef, private leadService: Lead_Service) {}

  ngOnInit() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchValue => {
      this.searchTerm = searchValue;
      this.loadData(true);
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadData(reset: boolean = false) {
    if (reset && this.type) {
      this.page = 1;
      this.options = [];
      this.hasMore = true;
    }

    if (!this.hasMore || this.isLoading || !this.type) return;

    this.isLoading = true;
    this.leadService.Get_Lead_Filter_Dropdown(this.type, this.searchTerm, this.page)
      .subscribe((res: any[]) => {
        if (res && res.length > 0) {
          this.options = [...this.options, ...res];
          if (res.length < 20) {
            this.hasMore = false; // Less than 20 means we hit the end
          }
        } else {
          this.hasMore = false;
        }
        this.isLoading = false;
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }

  toggleDropdown(event: Event) {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      if (this.options.length === 0 && this.type) {
        this.loadData(true);
      }
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.nativeElement.focus();
        }
      });
    } else {
      // Keep search term but don't clear options on close unless you want to
    }
  }

  selectOption(option: any, event: Event) {
    this.selectedOptionName = option.name || option;
    this.selectionChange.emit(option);
    this.isOpen = false;
  }

  onSearch(event: any) {
    this.searchSubject.next(event.target.value);
  }
  
  onScroll(event: any) {
    const element = event.target;
    // When scroll reaches within 10px of bottom, load more
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 10) {
      if (!this.isLoading && this.hasMore) {
        this.page++;
        this.loadData(false);
      }
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.isOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  clear() {
    this.selectedOptionName = '';
    this.searchTerm = '';
    // Optional: emit null to notify parent, though the parent might reset its own model
    this.selectionChange.emit(null);
  }
}
