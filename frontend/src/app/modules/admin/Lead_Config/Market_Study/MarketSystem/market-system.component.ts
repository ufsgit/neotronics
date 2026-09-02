import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeadMarketSystemService } from '../../../../../services/lead_config/market_study/market-system.service';

@Component({
  selector: 'app-market-system',
  templateUrl: './market-system.component.html',
  styleUrls: ['./market-system.component.css']
})
export class LeadMarketSystemComponent implements OnInit {
  data: any[] = [];
  isLoading: boolean = false;
  pageIndex: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  searchText: string = '';

  // Modal State
  showModal: boolean = false;
  isEditing: boolean = false;
  isSaving: boolean = false;
  currentSystem: any = {
    Market_System_Id: 0,
    Market_System_Name: '',
    IsActive: 1
  };

  constructor(
    private leadmarketsystemService: LeadMarketSystemService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.leadmarketsystemService.getLeadMarketSystems(this.searchText, this.pageIndex).subscribe(
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

  onSearchChange() {
    this.pageIndex = 1;
    this.loadData();
  }

  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.loadData();
    }
  }

  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.loadData();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize) || 1;
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }

  // Action Methods
  viewSubItems(item: any) {
    this.router.navigate(['/Lead_Config/Market_Study/MarketSystem', item.Market_System_Id, 'Fields']);
  }

  onAdd() {
    this.isEditing = false;
    this.currentSystem = {
      Market_System_Id: 0,
      Market_System_Name: '',
      IsActive: true // Using true for ngModel binding with checkbox
    };
    this.showModal = true;
  }

  onEdit(item: any) {
    this.isEditing = true;
    this.currentSystem = {
      Market_System_Id: item.Market_System_Id,
      Market_System_Name: item.Market_System_Name,
      IsActive: item.IsActive == 1
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentSystem = { Market_System_Id: 0, Market_System_Name: '', IsActive: true };
  }

  saveSystem() {
    if (!this.currentSystem.Market_System_Name) return;

    this.isSaving = true;
    const payload = {
      Market_System_Id: this.currentSystem.Market_System_Id,
      Market_System_Name: this.currentSystem.Market_System_Name,
      IsActive: this.currentSystem.IsActive ? 1 : 0
    };

    this.leadmarketsystemService.saveMarketSystem(payload).subscribe(
      (res: any) => {
        this.isSaving = false;
        this.closeModal();
        this.loadData();
      },
      (error) => {
        this.isSaving = false;
        console.error('Error saving data:', error);
        alert('Failed to save. Please try again.');
      }
    );
  }

  onDelete(item: any) {
    if (confirm(`Are you sure you want to delete "${item.Market_System_Name}"?`)) {
      this.leadmarketsystemService.deleteMarketSystem(item.Market_System_Id).subscribe(
        (res: any) => {
          this.loadData();
        },
        (error) => {
          console.error('Error deleting data:', error);
          alert('Failed to delete. Please try again.');
        }
      );
    }
  }
}
