import { Component, OnInit } from '@angular/core';
import { LeadTargetStageService } from '../../../../../services/lead_config/pipeline_stage_pulse/target-stage.service';

@Component({
  selector: 'app-target-stage',
  templateUrl: './target-stage.component.html',
  styleUrls: ['./target-stage.component.css']
})
export class LeadTargetStageComponent implements OnInit {
  data: any[] = [];
  isLoading: boolean = false;
  pageIndex: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  searchText: string = '';

  columns = [
    { key: 'name', label: 'Name' }
  ];

  constructor(private leadtargetstageService: LeadTargetStageService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.leadtargetstageService.getLeadTargetStages(this.searchText, this.pageIndex).subscribe(
      (res: any) => {
        this.isLoading = false;
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
        console.error('Error fetching data:', error);
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
    console.log('Add new TargetStage');
  }

  onEdit(item: any) {
    console.log('Edit TargetStage:', item);
  }

  onDelete(item: any) {
    console.log('Delete TargetStage:', item);
  }
}
