import { Component, Input, Output, EventEmitter, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lead-filter-dropdown',
  templateUrl: './lead-filter-dropdown.component.html',
  styleUrls: ['./lead-filter-dropdown.component.css']
})
export class LeadFilterDropdownComponent {
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Select...';
  @Output() selectionChange = new EventEmitter<string>();

  @ViewChild('searchInput', { static: false }) searchInput: any;

  isOpen = false;
  searchTerm = '';
  selectedOption = '';

  constructor(private eRef: ElementRef) {}

  get filteredOptions() {
    if (!this.searchTerm) return this.options;
    return this.options.filter(opt => opt.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  toggleDropdown(event: Event) {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.nativeElement.focus();
        }
      });
    } else {
      this.searchTerm = '';
    }
  }

  selectOption(option: string, event: Event) {
    this.selectedOption = option;
    this.selectionChange.emit(option);
    this.isOpen = false;
    this.searchTerm = '';
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.isOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.searchTerm = '';
    }
  }
}
