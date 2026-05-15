import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentStatus_Service } from '../../../services/DepartmentStatus.Service';
import { DepartmentStatus } from '../../../models/DepartmentStatus';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Get_Page_Permission } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-DepartmentStatus',
  templateUrl: './DepartmentStatus.component.html',
  styleUrls: ['./DepartmentStatus.component.css']
})
export class DepartmentStatusComponent implements OnInit {
  DepartmentStatus_Data: DepartmentStatus[] = [];
  DepartmentStatus_: DepartmentStatus = new DepartmentStatus();
  Search_DepartmentStatus_: string = "";
  Entry_View: boolean = false;
  myInnerHeight: number;
  Total_Entries: number = 0;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  issLoading: boolean = false;
  Permissions: any;
  DepartmentStatus_Edit: boolean = true;
  DepartmentStatus_Save: boolean = true;
  DepartmentStatus_Delete: boolean = true;

  constructor(
    public DepartmentStatus_Service_: DepartmentStatus_Service,
    private route: ActivatedRoute,
    private router: Router,
    public dialogBox: MatDialog
  ) { }

  ngOnInit() {
    this.Permissions = Get_Page_Permission(112);
    if (this.Permissions == undefined || this.Permissions == null) {
      this.DepartmentStatus_Edit = true;
      this.DepartmentStatus_Save = true;
      this.DepartmentStatus_Delete = true;
    } else {
      this.DepartmentStatus_Edit = this.Permissions.Edit;
      this.DepartmentStatus_Save = this.Permissions.Save;
      this.DepartmentStatus_Delete = this.Permissions.Delete;
    }
    this.Page_Load();
  }

  Page_Load() {
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 300;
    this.Clr_DepartmentStatus();
    this.Search_DepartmentStatus();
    this.Entry_View = false;
  }

  Create_New() {
    this.Entry_View = true;
    this.Clr_DepartmentStatus();
  }

  Close_Click() {
    this.Entry_View = false;
    this.Search_DepartmentStatus();
  }

  Clr_DepartmentStatus() {
    this.DepartmentStatus_.DepartmentStatus_Id = 0;
    this.DepartmentStatus_.DepartmentStatus_Name = "";
    this.DepartmentStatus_.DeleteStatus = 0;
  }

  Search_DepartmentStatus() {
    this.issLoading = true;
    this.DepartmentStatus_Service_.Search_DepartmentStatus(this.Search_DepartmentStatus_).subscribe(Rows => {
      if (Rows && Array.isArray(Rows) && Rows.length > 0) {
        this.DepartmentStatus_Data = Rows[0];
      } else {
        this.DepartmentStatus_Data = [];
      }
      this.Total_Entries = this.DepartmentStatus_Data.length;
      this.issLoading = false;
    },
    error => {
      this.issLoading = false;
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
    });
  }

  Save_DepartmentStatus() {
    if (this.DepartmentStatus_.DepartmentStatus_Name == undefined || this.DepartmentStatus_.DepartmentStatus_Name == null || this.DepartmentStatus_.DepartmentStatus_Name == "") {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Department Status', Type: "3" } });
      return;
    }

    this.issLoading = true;
    this.DepartmentStatus_Service_.Save_DepartmentStatus(this.DepartmentStatus_).pipe(
      finalize(() => {
        this.issLoading = false;
      })
    ).subscribe({
      next: (Save_status: any) => {
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Saved Successfully', Type: "false" }
        });
        this.Clr_DepartmentStatus();
        this.Search_DepartmentStatus();
        this.Entry_View = false;
      },
      error: (error) => {
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Error Occured', Type: "2" }
        });
      }
    });
  }

  Edit_DepartmentStatus(DepartmentStatus_e: DepartmentStatus) {
    this.Entry_View = true;
    this.DepartmentStatus_ = Object.assign({}, DepartmentStatus_e);
  }

  Delete_DepartmentStatus(DepartmentStatus_Id, index) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Do you want to delete ?', Type: "true", Heading: 'Confirm' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Yes') {
        this.issLoading = true;
        this.DepartmentStatus_Service_.Delete_DepartmentStatus(DepartmentStatus_Id).subscribe(Delete_status => {
          this.issLoading = false;
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted Successfully', Type: "false" } });
          this.Search_DepartmentStatus();
        }, err => {
          this.issLoading = false;
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
      }
    });
  }
}
