import { Component, OnInit } from '@angular/core';
import { LeadPipelineStageService } from '../../../../../services/lead_config/pipeline_stage_pulse/pipeline-stage.service';

@Component({
  selector: 'app-pipeline-stage',
  templateUrl: './pipeline-stage.component.html',
  styleUrls: ['./pipeline-stage.component.css']
})
export class LeadPipelineStageComponent implements OnInit {
  data: any[] = [];
  isLoading: boolean = false;
  pageIndex: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  searchText: string = '';

  columns = [
    { key: 'name', label: 'Name' },
    { key: 'Stage_Type_Label', label: 'Stage Type' },
    { key: 'Followup_Required_Label', label: 'Follow-up Required' },
    { key: 'Color', label: 'Color' }
  ];

  // Modal State
  showModal: boolean = false;
  isEdit: boolean = false;
  isSaving: boolean = false;
  formData: {
    id: number;
    name: string;
    Stage_Type: number;
    Followup_Required: number;
    Color: string;
  } = {
    id: 0,
    name: '',
    Stage_Type: 1,
    Followup_Required: 1,
    Color: '#3b82f6'
  };

  // Delete State
  isDeleteModalOpen: boolean = false;
  isDeleting: boolean = false;
  itemToDelete: any = null;

  constructor(private leadpipelinestageService: LeadPipelineStageService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.leadpipelinestageService.getLeadPipelineStages(this.searchText, this.pageIndex).subscribe(
      (res: any) => {
        this.isLoading = false;
        let list: any[] = [];
        if (res && Array.isArray(res)) {
          list = Array.isArray(res[0]) ? res[0] : res;
        } else if (res && res.data) {
          list = Array.isArray(res.data) ? res.data : [];
        }

        this.data = list.map(item => {
          const rawFollowup = item.Followup_Required !== undefined && item.Followup_Required !== null
            ? (item.Followup_Required && typeof item.Followup_Required === 'object' && item.Followup_Required.data ? item.Followup_Required.data[0] : Number(item.Followup_Required))
            : 1;

          return {
            ...item,
            id: item.PipelineStage_Id || item.Pipeline_Stage_Id || item.id || 0,
            name: item.PipelineStage_Name || item.Pipeline_Stage_Name || item.name || '',
            Stage_Type: item.Stage_Type !== undefined && item.Stage_Type !== null ? Number(item.Stage_Type) : 1,
            Stage_Type_Label: (item.Stage_Type == 2) ? 'Type 2' : 'Type 1',
            Followup_Required: rawFollowup,
            Followup_Required_Label: (rawFollowup === 0) ? 'No' : 'Yes',
            Color: item.Color || '#3b82f6'
          };
        });

        this.totalCount = this.data.length;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching pipeline stages:', error);
        this.data = [];
        this.totalCount = 0;
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
    this.isEdit = false;
    this.formData = {
      id: 0,
      name: '',
      Stage_Type: 1,
      Followup_Required: 1,
      Color: '#3b82f6'
    };
    this.showModal = true;
  }

  onEdit(item: any) {
    this.isEdit = true;
    this.formData = {
      id: item.id || item.PipelineStage_Id || 0,
      name: item.name || item.PipelineStage_Name || '',
      Stage_Type: item.Stage_Type !== undefined && item.Stage_Type !== null ? Number(item.Stage_Type) : 1,
      Followup_Required: item.Followup_Required !== undefined && item.Followup_Required !== null ? Number(item.Followup_Required) : 1,
      Color: item.Color || '#3b82f6'
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveStage() {
    if (!this.formData.name.trim()) return;
    this.isSaving = true;

    const payload = {
      Pipeline_Stage_Id: this.formData.id,
      Pipeline_Stage_Name: this.formData.name.trim(),
      Stage_Type: Number(this.formData.Stage_Type || 1),
      Followup_Required: this.formData.Followup_Required ? 1 : 0,
      Color: this.formData.Color || '#3b82f6'
    };

    this.leadpipelinestageService.savePipelineStage(payload).subscribe(
      (res: any) => {
        this.isSaving = false;
        this.closeModal();
        this.loadData();
      },
      (error) => {
        this.isSaving = false;
        console.error('Error saving pipeline stage:', error);
        alert('Error saving pipeline stage');
      }
    );
  }

  onDelete(item: any) {
    this.itemToDelete = item;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.itemToDelete = null;
  }

  confirmDelete() {
    if (!this.itemToDelete) return;
    this.isDeleting = true;
    const id = this.itemToDelete.id || this.itemToDelete.PipelineStage_Id;

    this.leadpipelinestageService.deletePipelineStage(id).subscribe(
      () => {
        this.isDeleting = false;
        this.closeDeleteModal();
        this.loadData();
      },
      (error) => {
        this.isDeleting = false;
        console.error('Error deleting pipeline stage:', error);
        alert('Error deleting pipeline stage');
      }
    );
  }
}
