import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Custom_Field_Service } from '../../../services/Custom_Field.Service';
import { Custom_Field } from '../../../models/Custom_Field';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Get_Page_Permission } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-Custom_Field',
  templateUrl: './Custom_Field.component.html',
  styleUrls: ['./Custom_Field.component.css']
})
export class Custom_FieldComponent implements OnInit {
  Custom_Field_Data: Custom_Field[] = [];
  Custom_Field_: Custom_Field = new Custom_Field();
  
  Entry_View: boolean = true;
  issLoading: boolean = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  Permissions: any;
  Custom_Field_Edit: boolean;
  Custom_Field_Save: boolean;
  Custom_Field_Delete: boolean;
  
  Field_Types: any[] = [];
  Field_List_Array: string[] = [];

  constructor(
    public Custom_Field_Service_: Custom_Field_Service,
    private route: ActivatedRoute,
    private router: Router,
    public dialogBox: MatDialog
  ) {}

  ngOnInit() {
    this.Permissions = Get_Page_Permission(77); 
    if (this.Permissions == undefined || this.Permissions == null) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth/login');
    } else {
      this.Custom_Field_Edit = this.Permissions.Edit;
      this.Custom_Field_Save = this.Permissions.Save;
      this.Custom_Field_Delete = this.Permissions.Delete;
      this.Page_Load();
    }
  }

  Page_Load() {
    this.Entry_View = false;
    this.Search_Custom_Field();
    this.Get_Field_Types();
  }

  Get_Field_Types() {
    this.Custom_Field_Service_.Get_Field_Types().subscribe(Rows => {
        this.Field_Types = (Rows && Rows[0]) ? Rows[0] : [];
    });
  }

  Create_New() {
    this.Entry_View = true;
    this.Clr_Custom_Field();
  }

  Close_Click() {
    this.Entry_View = false;
    this.Clr_Custom_Field();
  }

  Clr_Custom_Field() {
    this.Custom_Field_.Custom_Field_Id = 0;
    this.Custom_Field_.Field_Name = '';
    this.Custom_Field_.Field_Type = 'Text';
    this.Custom_Field_.Quotation_Custom = false;
    this.Custom_Field_.View_In_Quotation = false;
    this.Custom_Field_.Events = false;
    this.Custom_Field_.Field_List = '';
    this.Field_List_Array = [];
  }

  Search_Custom_Field() {
    this.issLoading = true;
    this.Custom_Field_Service_.Search_Custom_Field('').subscribe(
      Rows => {
        this.Custom_Field_Data = (Rows && Rows[0]) ? Rows[0] : [];
        this.Custom_Field_Data.forEach(cf => {
            cf.Quotation_Custom = (cf.Quotation_Custom as any) == 1;
            cf.View_In_Quotation = (cf.View_In_Quotation as any) == 1;
            cf.Events = (cf.Events as any) == 1;
        });
        this.issLoading = false;
      },
      err => {
        this.issLoading = false;
        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
      }
    );
  }

  addFieldListItem() {
      this.Field_List_Array.push('');
  }

  removeFieldListItem(index: number) {
      this.Field_List_Array.splice(index, 1);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  Save_Custom_Field() {
    if (!this.Custom_Field_.Field_Name) {
      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Field Name', Type: "3" } });
      return;
    }

    if (['Dropdown', 'Checkbox', 'Radio'].includes(this.Custom_Field_.Field_Type)) {
        const filteredList = this.Field_List_Array.filter(v => v.trim() !== '');
        if (filteredList.length === 0) {
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please add at least one option to the Field List', Type: "3" } });
            return;
        }
        this.Custom_Field_.Field_List = filteredList.join(',');
    } else {
        this.Custom_Field_.Field_List = '';
    }

    let Custom_Field_Copy = Object.assign({}, this.Custom_Field_);
    (Custom_Field_Copy as any).Quotation_Custom = Custom_Field_Copy.Quotation_Custom ? 1 : 0;
    (Custom_Field_Copy as any).View_In_Quotation = Custom_Field_Copy.View_In_Quotation ? 1 : 0;
    (Custom_Field_Copy as any).Events = Custom_Field_Copy.Events ? 1 : 0;

    this.issLoading = true;
    this.Custom_Field_Service_.Save_Custom_Field(Custom_Field_Copy).subscribe(
      Save_status => {
        Save_status = Save_status[0];
        if (Number(Save_status[0].Custom_Field_Id_) > 0) {
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved', Type: "false" } });
          this.Close_Click();
          this.Search_Custom_Field();
        } else {
          this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        }
        this.issLoading = false;
      },
      err => {
        this.issLoading = false;
        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
      }
    );
  }

  Edit_Custom_Field(Custom_Field_e: Custom_Field) {
    this.Entry_View = true;
    this.Custom_Field_ = Object.assign({}, Custom_Field_e);
    if (this.Custom_Field_.Field_List && this.Custom_Field_.Field_List.trim() !== '') {
        this.Field_List_Array = this.Custom_Field_.Field_List.split(',').map(s => s.trim());
    } else {
        this.Field_List_Array = [];
    }
  }

  Delete_Custom_Field(Custom_Field_Id: number, index: number) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Do you want to delete ?', Type: "true", Heading: 'Confirm' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Yes') {
        this.issLoading = true;
        this.Custom_Field_Service_.Delete_Custom_Field(Custom_Field_Id).subscribe(
          Delete_status => {
            if (Delete_status[0][0].Custom_Field_Id_ > 0) {
              this.Custom_Field_Data.splice(index, 1);
              this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted', Type: "false" } });
            } else {
              this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
            }
            this.issLoading = false;
          },
          err => {
            this.issLoading = false;
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
          }
        );
      }
    });
  }
}
