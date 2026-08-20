import { Component, OnInit } from '@angular/core';
import { VerticalService } from '../../../../../services/lead_config/company_details/vertical.service';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.css']
})
export class LeadVerticalComponent implements OnInit {
  data: any[] = [];
  isLoading: boolean = false;
  pageIndex: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  searchText: string = '';

  columns = [
    { key: 'name', label: 'Name' }
  ];

  constructor(private verticalService: VerticalService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.verticalService.getVerticals(this.searchText, this.pageIndex).subscribe(
      (res: any) => {
        this.isLoading = false;
        // Adjust according to the actual response structure
        if (res && res.length > 0) {
          this.data = res;
          this.totalCount = res[0].TotalCount || res.length;
        } else if (res && Array.isArray(res) && res.length > 0 && Array.isArray(res[0])) {
          this.data = res[0];
          this.totalCount = (res[0][0] && res[0][0].TotalCount) ? res[0][0].TotalCount : res[0].length;
        } else {
          this.data = [];
          this.totalCount = 0;
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching verticals:', error);
        this.data = [];
      }
    );
  }

  onSearch(term: string) {
    this.searchText = term;
    this.pageIndex = 1;
    this.loadData();
  }

  onPageChange(page: number) {
    this.pageIndex = page;
    this.loadData();
  }

  onAdd() {
    console.log('Add new Vertical');
  }

  onEdit(item: any) {
    console.log('Edit Vertical:', item);
  }

  onDelete(item: any) {
    console.log('Delete Vertical:', item);
  }
}
