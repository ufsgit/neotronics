import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Company_Size_Service } from '../../../services/Company_Size.Service';
import { Company_Size } from '../../../models/Company_Size';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';

@Component({
  selector: 'app-Company-Size',
  templateUrl: './Company_Size.component.html',
  styleUrls: ['./Company_Size.component.css']
})
export class Company_SizeComponent implements OnInit {
  Company_Size_Data: Company_Size[] = [];
  Company_Size_: Company_Size = new Company_Size();
  Search_Company_Size_: string = '';
  Entry_View: boolean = false;
  myInnerHeight: number;
  Total_Entries: number = 0;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  issLoading: boolean = false;

  constructor(
    public Company_Size_Service_: Company_Size_Service,
    private route: ActivatedRoute,
    private router: Router,
    public dialogBox: MatDialog
  ) { }

  ngOnInit() {
    this.Page_Load();
  }

  Page_Load() {
    this.myInnerHeight = window.innerHeight - 330;
    this.Clr_Company_Size();
    this.Search_Company_Size();
    this.Entry_View = false;
  }

  Create_New() {
    this.Entry_View = true;
    this.Clr_Company_Size();
  }

  Close_Click() {
    this.Entry_View = false;
    this.Search_Company_Size();
  }

  Clr_Company_Size() {
    this.Company_Size_.Company_Size_Id = 0;
    this.Company_Size_.Company_Size_Name = '';
    this.Company_Size_.Description = '';
    this.Company_Size_.DeleteStatus = 0;
  }

  Search_Company_Size() {
    this.issLoading = true;
    this.Company_Size_Service_.Search_Company_Size(this.Search_Company_Size_).subscribe(Rows => {
      if (Rows && Array.isArray(Rows)) {
        this.Company_Size_Data = Rows;
      } else {
        this.Company_Size_Data = [];
      }
      this.Total_Entries = this.Company_Size_Data.length;
      this.issLoading = false;
    },
    error => {
      this.issLoading = false;
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: '2' } });
    });
  }

  Save_Company_Size() {
    if (!this.Company_Size_.Company_Size_Name) {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Company Size Name', Type: '3' } });
      return;
    }

    this.issLoading = true;
    this.Company_Size_Service_.Save_Company_Size(this.Company_Size_).pipe(
      finalize(() => { this.issLoading = false; })
    ).subscribe({
      next: (Save_status: any) => {
        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved Successfully', Type: 'false' } });
        this.Clr_Company_Size();
        this.Search_Company_Size();
        this.Entry_View = false;
      },
      error: (error) => {
        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: '2' } });
      }
    });
  }

  Edit_Company_Size(Company_Size_e: Company_Size) {
    this.Entry_View = true;
    this.Company_Size_ = Object.assign({}, Company_Size_e);
  }

  Delete_Company_Size(Company_Size_Id, index) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
      panelClass: 'Dialogbox-Class',
      data: { Message: 'Do you want to delete ?', Type: 'true', Heading: 'Confirm' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.issLoading = true;
        this.Company_Size_Service_.Delete_Company_Size(Company_Size_Id).subscribe(Delete_status => {
          this.issLoading = false;
          this.Search_Company_Size();
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted', Type: 'false' } });
        },
        error => {
          this.issLoading = false;
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: '2' } });
        });
      }
    });
  }
}
