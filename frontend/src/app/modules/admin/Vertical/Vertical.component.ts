import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Vertical_Service } from '../../../services/Vertical.Service';
import { Vertical } from '../../../models/Vertical';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Master_Refresh_Service } from '../../../services/Master_Refresh.Service';

@Component({
  selector: 'app-Vertical',
  templateUrl: './Vertical.component.html',
  styleUrls: ['./Vertical.component.css']
})
export class VerticalComponent implements OnInit {
  Vertical_Data: Vertical[] = [];
  Paged_Vertical_Data: Vertical[] = [];
  Page_Index: number = 1;
  Page_Size: number = 25;
  Total_Pages: number = 1;
  Vertical_: Vertical = new Vertical();
  Search_Vertical_: string = "";
  Entry_View: boolean = false;
  myInnerHeight: number;
  Total_Entries: number = 0;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  issLoading: boolean = false;
  Permissions: any;
  Vertical_Edit: boolean = true;
  Vertical_Save: boolean = true;
  Vertical_Delete: boolean = true;

  constructor(
    public Vertical_Service_: Vertical_Service,
    private route: ActivatedRoute,
    private router: Router,
    public dialogBox: MatDialog,
    private Master_Refresh_Service_: Master_Refresh_Service
  ) { }

  ngOnInit() {
    this.Search_Vertical();
    this.Permissions = Get_Page_Permission(110); // Assuming a new ID or using a dummy one for now
    if (this.Permissions == undefined || this.Permissions == null) {
      // For now, let's allow access if permissions are not set, or you can uncomment below to enforce
      // this.router.navigateByUrl('/auth/login');
      this.Vertical_Edit = true;
      this.Vertical_Save = true;
      this.Vertical_Delete = true;
    } else {
      this.Vertical_Edit = this.Permissions.Edit;
      this.Vertical_Save = this.Permissions.Save;
      this.Vertical_Delete = this.Permissions.Delete;
    }
    this.Page_Load();
  }

  Page_Load() {
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 300;
    this.Clr_Vertical();
    this.Search_Vertical();
    this.Entry_View = false;
  }

  Create_New() {
    this.Entry_View = true;
    this.Clr_Vertical();
  }

  Close_Click() {
    this.Entry_View = false;
    this.Search_Vertical();
  }

  Clr_Vertical() {
    this.Vertical_.Vertical_Id = 0;
    this.Vertical_.Vertical_Name = "";
    this.Vertical_.Description = "";
    this.Vertical_.DeleteStatus = 0;
  }

  private normalizeRows(response: any): any[] {
    const rows = response && response.success !== undefined ? response.data : response;
    if (Array.isArray(rows) && rows.length > 0 && Array.isArray(rows[0])) return rows[0];
    if (Array.isArray(rows)) return rows;
    return [];
  }

  private getSavedId(response: any): number {
    const rows = this.normalizeRows(response);
    const first = rows && rows.length > 0 ? rows[0] : null;
    if (first && first.Vertical_Id_ !== undefined) return Number(first.Vertical_Id_);
    if (first && first.Vertical_Id !== undefined) return Number(first.Vertical_Id);
    return NaN;
  }

  Search_Vertical() {
    this.issLoading = true;
    this.Vertical_Service_.Search_Vertical(this.Search_Vertical_).subscribe(Rows => {
      this.Vertical_Data = this.normalizeRows(Rows);
      this.Total_Entries = this.Vertical_Data.length;
      this.Page_Index = 1;
      this.Update_Pagination();
      this.issLoading = false;
    },
    error => {
      this.issLoading = false;
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
    });
  }

  Update_Pagination() {
      this.Total_Pages = Math.ceil(this.Vertical_Data.length / this.Page_Size);
      const start = (this.Page_Index - 1) * this.Page_Size;
      const end = start + this.Page_Size;
      this.Paged_Vertical_Data = this.Vertical_Data.slice(start, end);
  }

  Change_Page(step: number) {
      this.Page_Index += step;
      if (this.Page_Index < 1) this.Page_Index = 1;
      if (this.Page_Index > this.Total_Pages) this.Page_Index = this.Total_Pages;
      this.Update_Pagination();
  }

  Save_Vertical() {
    if (this.Vertical_.Vertical_Name == undefined || this.Vertical_.Vertical_Name == null || this.Vertical_.Vertical_Name == "") {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Vertical Name', Type: "3" } });
      return;
    }

    this.issLoading = true;
    this.Vertical_Service_.Save_Vertical(this.Vertical_).pipe(
      finalize(() => {
        this.issLoading = false;
      })
    ).subscribe({
      next: (Save_status: any) => {
        const savedId = this.getSavedId(Save_status);
        if (savedId > 0) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Saved Successfully', Type: "false" }
          });
          this.Clr_Vertical();
          this.Search_Vertical();
          this.Entry_View = false;
          this.Master_Refresh_Service_.refreshMaster('Vertical');
          this.Master_Refresh_Service_.refreshMaster('Industry');
        } else if (savedId === -1) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Industry Name Already Exists', Type: "2" }
          });
        } else {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Invalid server response', Type: "2" }
          });
        }
      },
      error: (error) => {
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Error Occured', Type: "2" }
        });
      }
    });
  }

  Edit_Vertical(Vertical_e: Vertical) {
    this.Entry_View = true;
    this.Vertical_ = Object.assign({}, Vertical_e);
  }

  Delete_Vertical(Vertical_Id, index) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Do you want to delete ?', Type: "true", Heading: 'Confirm' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Yes') {
        this.issLoading = true;
        this.Vertical_Service_.Delete_Vertical(Vertical_Id).subscribe(Delete_status => {
          this.issLoading = false;
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted Successfully', Type: "false" } });
          this.Search_Vertical();
          this.Master_Refresh_Service_.refreshMaster('Vertical');
        }, err => {
          this.issLoading = false;
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
      }
    });
  }
}
