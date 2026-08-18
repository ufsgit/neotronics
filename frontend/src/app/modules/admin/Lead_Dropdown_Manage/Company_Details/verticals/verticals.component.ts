import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../shared-dropdown-table/shared-dropdown-table.component';

@Component({
  selector: 'app-verticals',
  templateUrl: './verticals.component.html',
  styleUrls: ['./verticals.component.scss']
})
export class VerticalsComponent implements OnInit {

  tableColumns: TableColumn[] = [
    { key: 'verticalName', label: 'Vertical Name' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status' }
  ];

  tableData: any[] = [
    { id: 1, verticalName: 'Technology', description: 'IT and Software', status: 'Active' },
    { id: 2, verticalName: 'Healthcare', description: 'Hospitals and Clinics', status: 'Active' },
    { id: 3, verticalName: 'Finance', description: 'Banking and Investments', status: 'Inactive' },
    { id: 4, verticalName: 'Manufacturing', description: 'Factories and Production', status: 'Active' },
  ];

  totalRows: number = 4;
  currentPage: number = 1;

  constructor() { }

  ngOnInit(): void {
    // In a real application, you would fetch data from the backend here
  }

  onSearch(searchTerm: string) {
    console.log('Search triggered for:', searchTerm);
    // Call backend API to filter data
  }

  onPageChange(page: number) {
    console.log('Page changed to:', page);
    this.currentPage = page;
    // Call backend API to load the specific page
  }

  onAddNew() {
    console.log('Add New clicked');
    // Open a modal or navigate to a form to add a new vertical
  }

  onEdit(item: any) {
    console.log('Edit clicked for item:', item);
    // Open edit modal with item details
  }

  onDelete(item: any) {
    console.log('Delete clicked for item:', item);
    // Call backend API to delete the item after confirmation
  }
}
