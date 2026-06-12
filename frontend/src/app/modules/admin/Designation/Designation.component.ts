import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Designation_Service } from '../../../services/Designation.Service';
import { Designation } from '../../../models/Designation';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Get_Page_Permission } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-Designation',
  templateUrl: './Designation.component.html',
  styleUrls: ['./Designation.component.css']
})
export class DesignationComponent implements OnInit {
  Designation_Data: Designation[] = [];
  Designation_: Designation = new Designation();
  Search_Designation_: string = "";
  Entry_View: boolean = false;
  myInnerHeight: number;
  Total_Entries: number = 0;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  issLoading: boolean = false;
  Permissions: any;
  Designation_Edit: boolean = true;
  Designation_Save: boolean = true;
  Designation_Delete: boolean = true;

  constructor(
    public Designation_Service_: Designation_Service,
    private route: ActivatedRoute,
    private router: Router,
    public dialogBox: MatDialog
  ) { }

  ngOnInit() {
    this.Permissions = Get_Page_Permission(111); // Assuming a new ID
    if (this.Permissions == undefined || this.Permissions == null) {
      this.Designation_Edit = true;
      this.Designation_Save = true;
      this.Designation_Delete = true;
    } else {
      this.Designation_Edit = this.Permissions.Edit;
      this.Designation_Save = this.Permissions.Save;
      this.Designation_Delete = this.Permissions.Delete;
    }
    this.Page_Load();
  }

  Page_Load() {
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 330;
    this.Clr_Designation();
    this.Search_Designation();
    this.Entry_View = false;
  }

  Create_New() {
    this.Entry_View = true;
    this.Clr_Designation();
  }

  Close_Click() {
    this.Entry_View = false;
    this.Search_Designation();
  }

  Clr_Designation() {
    this.Designation_.Designation_Id = 0;
    this.Designation_.Designation_Name = "";
    this.Designation_.Description = "";
    this.Designation_.DeleteStatus = 0;
  }

  Search_Designation() {
    this.issLoading = true;
    this.Designation_Service_.Search_Designation(this.Search_Designation_).subscribe(Rows => {
      if (Rows && Array.isArray(Rows)) {
        this.Designation_Data = Rows;
      } else {
        this.Designation_Data = [];
      }
      this.Total_Entries = this.Designation_Data.length;
      this.issLoading = false;
    },
    error => {
      this.issLoading = false;
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
    });
  }

  Save_Designation() {
    if (this.Designation_.Designation_Name == undefined || this.Designation_.Designation_Name == null || this.Designation_.Designation_Name == "") {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Designation Name', Type: "3" } });
      return;
    }

    this.issLoading = true;
    this.Designation_Service_.Save_Designation(this.Designation_).pipe(
      finalize(() => {
        this.issLoading = false;
      })
    ).subscribe({
      next: (Save_status: any) => {
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Saved Successfully', Type: "false" }
        });
        this.Clr_Designation();
        this.Search_Designation();
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

  Edit_Designation(Designation_e: Designation) {
    this.Entry_View = true;
    this.Designation_ = Object.assign({}, Designation_e);
  }

  Delete_Designation(Designation_Id, index) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Do you want to delete ?', Type: "true", Heading: 'Confirm' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Yes') {
        this.issLoading = true;
        this.Designation_Service_.Delete_Designation(Designation_Id).subscribe(Delete_status => {
          this.issLoading = false;
          this.Search_Designation();
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted', Type: "false" } });
        },
        error => {
          this.issLoading = false;
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
      }
    });
  }
}
