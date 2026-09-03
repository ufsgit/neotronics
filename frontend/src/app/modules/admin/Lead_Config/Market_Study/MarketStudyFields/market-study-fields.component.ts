import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-market-study-fields',
  templateUrl: './market-study-fields.component.html',
  styleUrls: ['./market-study-fields.component.css']
})
export class MarketStudyFieldsComponent implements OnInit {
  categoryId: number = 0;
  categoryName: string = '';
  issLoading: boolean = false;
  Dropdown_Data: any[] = [];
  
  pageIndex: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  searchText: string = '';

  columns = [
    { key: 'Field_Name', label: 'Field Name' },
    { key: 'Field_Type', label: 'Field Type' },
    { key: 'IsRequired', label: 'Required' }
  ];

  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  isSaving: boolean = false;
  formData: { id: number; name: string; type: string; isRequired: number } = { id: 0, name: '', type: 'Text', isRequired: 0 };

  isDeleteModalOpen: boolean = false;
  isDeleting: boolean = false;
  itemToDelete: any = null;
  itemToDeleteName: string = '';

  isErrorModalOpen: boolean = false;
  errorMessage: string = '';

  fieldTypes: string[] = ['Text', 'Number', 'Date', 'Dropdown', 'Boolean', 'Checkbox'];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      this.Load_Data();
    });
    this.route.queryParams.subscribe(params => {
      if (params['categoryName']) {
        this.categoryName = params['categoryName'];
      }
    });
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
    if (token) {
      return { headers: { 'Authorization': 'Bearer ' + token } };
    }
    return {};
  }

  Load_Data() {
    this.issLoading = true;
    const url = `${environment.BasePath}Lead_Config/market_study/market_study_field/GetByCategory/${this.categoryId}?search=${encodeURIComponent(this.searchText)}&page=${this.pageIndex}&limit=${this.pageSize}`;
    this.http.get(url, this.getAuthHeaders()).subscribe(
      (res: any) => {
        this.issLoading = false;
        
        let responseData = res.data || res;
        this.Dropdown_Data = responseData.list || [];
        this.totalCount = responseData.totalCount || 0;
      },
      (error) => {
        this.issLoading = false;
        console.error('Error fetching data:', error);
        this.Dropdown_Data = [];
        this.totalCount = 0;
      }
    );
  }

  onSearch(term: string) {
    this.searchText = term;
    this.pageIndex = 1;
    this.Load_Data();
  }

  onPageChange(page: number) {
    this.pageIndex = page;
    this.Load_Data();
  }

  onAdd() {
    this.isEditMode = false;
    this.formData = { id: 0, name: '', type: 'Text', isRequired: 0 };
    this.isModalOpen = true;
  }

  onEdit(item: any) {
    this.isEditMode = true;
    this.formData = {
      id: item.Field_Id,
      name: item.Field_Name || '',
      type: item.Field_Type || 'Text',
      isRequired: item.IsRequired ? 1 : 0
    };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveItem() {
    if (!this.formData.name.trim()) return;
    this.isSaving = true;

    const body = {
      Field_Id: this.formData.id,
      Category_Id: this.categoryId,
      Field_Name: this.formData.name.trim(),
      Field_Type: this.formData.type,
      IsRequired: this.formData.isRequired ? 1 : 0
    };

    const url = `${environment.BasePath}Lead_Config/market_study/market_study_field/Save`;
    this.http.post(url, body, this.getAuthHeaders()).subscribe(
      (res: any) => {
        this.isSaving = false;

        let spData = res.data ? (Array.isArray(res.data) ? res.data[0] : res.data) : (Array.isArray(res) ? res[0] : res);
        if (spData && (spData.Field_Id_ === 0 || (spData.Message && spData.Message.includes('already exists')))) {
          this.errorMessage = spData.Message || 'Name already exists';
          this.isErrorModalOpen = true;
          return;
        }

        this.closeModal();
        this.Load_Data();
      },
      (error) => {
        this.isSaving = false;
        console.error('Error saving item:', error);
        alert('Error saving record');
      }
    );
  }

  onDelete(item: any) {
    this.itemToDelete = item;
    this.itemToDeleteName = item.Field_Name || 'this field';
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.itemToDelete = null;
    this.itemToDeleteName = '';
    this.isDeleting = false;
  }

  closeErrorModal() {
    this.isErrorModalOpen = false;
    this.errorMessage = '';
  }

  confirmDelete() {
    if (!this.itemToDelete) return;
    
    this.isDeleting = true;
    const id = this.itemToDelete.Field_Id;
    
    const url = `${environment.BasePath}Lead_Config/market_study/market_study_field/Delete/${id}`;
    
    this.http.get(url, this.getAuthHeaders()).subscribe(
      (res: any) => {
        this.isDeleting = false;
        this.closeDeleteModal();
        this.Load_Data();
      },
      (error) => {
        this.isDeleting = false;
        console.error('Error deleting item:', error);
        alert('Error deleting record');
      }
    );
  }
}
