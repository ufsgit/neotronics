import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Sale_Unit_Service } from '../../../services/Sale_Unit.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Sale_Unit } from '../../../models/Sale_Unit';
import { MatDialog } from '@angular/material/dialog';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Sale_Unit',
templateUrl: './Sale_Unit.component.html',
styleUrls: ['./Sale_Unit.component.css']
})
export class Sale_UnitComponent implements OnInit {
Sale_Unit_Data:Sale_Unit[]
Sale_Unit_:Sale_Unit= new Sale_Unit();
Sale_Unit_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
Search_Name:string="";
issLoading: boolean;
Permissions: any;
Sale_Unit_Edit:boolean;
Sale_Unit_Save:boolean;
Sale_Unit_Delete:boolean;
constructor(public Sale_Unit_Service_:Sale_Unit_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(2);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Sale_Unit_Edit=this.Permissions.Edit;
this.Sale_Unit_Save=this.Permissions.Save;
this.Sale_Unit_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Sale_Unit();
this.Search_Sale_Unit();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Sale_Unit();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Sale_Unit()
 {
this.Sale_Unit_.Sale_Unit_Id=0;
this.Sale_Unit_.Sale_Unit_Code="";
this.Sale_Unit_.Sale_Unit_Name="";

}
Search_Sale_Unit()
{
     
this.issLoading=true;
this.Sale_Unit_Service_.Search_Sale_Unit(this.Search_Name).subscribe(Rows => {
     
 this.Sale_Unit_Data=Rows[0];
this.Total_Entries=this.Sale_Unit_Data.length;
if(this.Sale_Unit_Data.length==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
}
this.issLoading=false;
 },
 Rows => { 
    this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
Delete_Sale_Unit(Sale_Unit_Id,index)
{
     
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Sale_Unit_Service_.Delete_Sale_Unit(Sale_Unit_Id).subscribe(Delete_status => {
     
    Delete_status=Delete_status[0];
    Delete_status=Delete_status[0].DeleteStatus_.data[0];
    if(Delete_status==1){
        //this.Sale_Unit_Data.splice(index, 1);
        this.Page_Load();
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    }
    else
    {
     //   this.Sale_Unit_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
    }
this.issLoading=false;
 },
 Rows => { 
    this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
 });
}
Save_Sale_Unit()
{
    if(this.Sale_Unit_.Sale_Unit_Name===undefined || this.Sale_Unit_.Sale_Unit_Name==null || this.Sale_Unit_.Sale_Unit_Name=="")
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Sale Unit Name',Type: "3" }});   
    }
    else{
    console.log("Before Sale Unit Save API call");
    this.issLoading = true;

    this.Sale_Unit_Service_.Save_Sale_Unit(this.Sale_Unit_)
    .pipe(
      finalize(() => {
        console.log("Sale Unit Save Finalize executed");
        this.issLoading = false;
        const saveButton = document.getElementById("Save_Button");
        if (saveButton) saveButton.hidden = false;
      })
    )
    .subscribe({
      next: (Save_status: any) => {
        console.log("Sale Unit Save API Response:", Save_status);

        let resultId: number = NaN;
        try {
          if (Save_status && Save_status.data && Save_status.data[0]) {
            const raw = Save_status.data[0];
            if (raw[0] && raw[0][0] && raw[0][0].Sale_Unit_Id_ !== undefined) {
              resultId = Number(raw[0][0].Sale_Unit_Id_);
            } else if (raw[0] && raw[0].Sale_Unit_Id_ !== undefined) {
              resultId = Number(raw[0].Sale_Unit_Id_);
            } else if (raw.Sale_Unit_Id_ !== undefined) {
              resultId = Number(raw.Sale_Unit_Id_);
            }
          } else if (Save_status && Save_status[0] && Save_status[0][0]) {
            resultId = Number(Save_status[0][0].Sale_Unit_Id_);
          } else if (Save_status && Save_status[0] && Save_status[0].Sale_Unit_Id_ !== undefined) {
            resultId = Number(Save_status[0].Sale_Unit_Id_);
          }
        } catch (e) {
          resultId = NaN;
        }

        if (isNaN(resultId)) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Invalid server response', Type: "2" }
          });
          return;
        }

        if (resultId > 0) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Saved Successfully', Type: "false" }
          });
          this.Page_Load();
        } else if (resultId == -1) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Sale Unit Name Already Exists', Type: "2" }
          });
        } else {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Error Occured', Type: "2" }
          });
        }
      },
      error: (error) => {
        console.error("Sale Unit Save API ERROR:", error);
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
        });
      }
    });
}
}
Edit_Sale_Unit(Sale_Unit_e:Sale_Unit,index)
{
this.Entry_View=true;
this.Sale_Unit_=Sale_Unit_e;
this.Sale_Unit_=Object.assign({},Sale_Unit_e);
}
}

