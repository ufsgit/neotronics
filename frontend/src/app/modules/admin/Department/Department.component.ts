import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Department_Service } from '../../../services/Department.Service';
import { Department } from '../../../models/Department';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Get_Page_Permission } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-Department',
  templateUrl: './Department.component.html',
  styleUrls: ['./Department.component.css']
})
export class DepartmentComponent implements OnInit {
  Department_Data: Department[] = [];
  Department_: Department = new Department();
  Search_Department_: string = "";
  Entry_View: boolean = false;
  myInnerHeight: number;
  Total_Entries: number = 0;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  issLoading: boolean = false;
  Permissions: any;
  Department_Edit: boolean = true;
  Department_Save: boolean = true;
  Department_Delete: boolean = true;

  constructor(
    public Department_Service_: Department_Service,
    private route: ActivatedRoute,
    private router: Router,
    public dialogBox: MatDialog
  ) { }

  ngOnInit() {
    this.Permissions = Get_Page_Permission(111);
    if (this.Permissions == undefined || this.Permissions == null) {
      this.Department_Edit = true;
      this.Department_Save = true;
      this.Department_Delete = true;
    } else {
      this.Department_Edit = this.Permissions.Edit;
      this.Department_Save = this.Permissions.Save;
      this.Department_Delete = this.Permissions.Delete;
    }
    this.Page_Load();
  }

  Page_Load() {
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 300;
    this.Clr_Department();
    this.Search_Department();
    this.Entry_View = false;
  }

  Create_New() {
    this.Entry_View = true;
    this.Clr_Department();
  }

  Close_Click() {
    this.Entry_View = false;
    this.Search_Department();
  }

  Clr_Department() {
    this.Department_.Department_Id = 0;
    this.Department_.Department_Name = "";
    this.Department_.DeleteStatus = 0;
  }

  Search_Department() {
    this.issLoading = true;
    this.Department_Service_.Search_Department(this.Search_Department_).subscribe(Rows => {
      if (Rows && Array.isArray(Rows) && Rows.length > 0) {
        this.Department_Data = Rows[0];
      } else {
        this.Department_Data = [];
      }
      this.Total_Entries = this.Department_Data.length;
      this.issLoading = false;
    },
    error => {
      this.issLoading = false;
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
    });
  }

  Save_Department() {
    if (this.Department_.Department_Name == undefined || this.Department_.Department_Name == null || this.Department_.Department_Name == "") {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Department Name', Type: "3" } });
      return;
    }

    this.issLoading = true;
    this.Department_Service_.Save_Department(this.Department_).pipe(
      finalize(() => {
        this.issLoading = false;
      })
    ).subscribe({
      next: (Save_status: any) => {
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Saved Successfully', Type: "false" }
        });
        this.Clr_Department();
        this.Search_Department();
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

  Edit_Department(Department_e: Department) {
    this.Entry_View = true;
    this.Department_ = Object.assign({}, Department_e);
  }

  Delete_Department(Department_Id, index) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Do you want to delete ?', Type: "true", Heading: 'Confirm' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Yes') {
        this.issLoading = true;
        this.Department_Service_.Delete_Department(Department_Id).subscribe(Delete_status => {
          this.issLoading = false;
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted Successfully', Type: "false" } });
          this.Search_Department();
        }, err => {
          this.issLoading = false;
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
      }
    });
  }
}
