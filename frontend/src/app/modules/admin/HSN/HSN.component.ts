import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { HSN_Service } from '../../../services/HSN.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { HSN } from '../../../models/HSN';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-HSN',
templateUrl: './HSN.component.html',
styleUrls: ['./HSN.component.css']
})
export class HSNComponent implements OnInit {
HSN_Data:HSN[]
HSN_:HSN= new HSN();
HSN_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
HSN_Edit:boolean;
HSN_Save:boolean; 
//HSN_GST:number;
Search_Name:string="";
HSN_Delete:boolean;
Check_Hide:boolean=true;
constructor(public HSN_Service_:HSN_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Permissions = Get_Page_Permission(3);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.HSN_Edit=this.Permissions.Edit;
    this.HSN_Save=this.Permissions.Save;
    this.HSN_Delete=this.Permissions.Delete;
    this.Page_Load()
}
}
trackByFn(index, item) 
{
return index;
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_HSN();
    this.Search_HSN();
    this.HSN_.Checkbox=false;
    this.Entry_View=false;
    this.Check_Hide=true;
}
Create_New()
{
    this.Entry_View = true;
    this.Check_Hide = true;
    this.Clr_HSN();
}
Close_Click()
{
    this.Entry_View = false;
    this.Check_Hide = true;
}
Clr_HSN()
{
    this.HSN_.HSN_Id=0;
    this.HSN_.HSN_CODE="";
    this.HSN_.SaleTax=0;
    this.HSN_.Checkbox=false;
}
GST_Change()
{
}
Search_HSN()
{ 
    this.issLoading=true;
    this.HSN_Service_.Search_HSN(this.Search_Name).subscribe(Rows => {
    this.HSN_Data=Rows[0];
    this.Total_Entries=this.HSN_Data.length;
    if(this.HSN_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
    }
    this.issLoading = false;
    },
    Rows => { 
        this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
Delete_HSN(HSN_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
    this.HSN_Service_.Delete_HSN(HSN_Id).subscribe(Delete_status => {
        Delete_status=Delete_status[0];
            Delete_status=Delete_status[0].DeleteStatus_.data[0];
        if(Delete_status==1){ 
            this.Page_Load()
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    }
    else
    {
    //this.HSN_Data.splice(index, 1);
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
Save_HSN()
{   
    if(this.HSN_.HSN_CODE===undefined || this.HSN_.HSN_CODE==null || this.HSN_.HSN_CODE=="")
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter HSN Code',Type: "3" }});   
    }
 else{
    console.log("Before HSN Save API call");
    this.issLoading = true;

    this.HSN_Service_.Save_HSN(this.HSN_)
    .pipe(
      finalize(() => {
        console.log("HSN Save Finalize executed");
        this.issLoading = false;
        const saveButton = document.getElementById("Save_Button");
        if (saveButton) saveButton.hidden = false;
      })
    )
    .subscribe({
      next: (Save_status) => {
        console.log("HSN Save API Response:", Save_status);
        
        if (!Save_status || !Save_status[0]) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Invalid server response', Type: "2" }
          });
          return;
        }

        const resultId = Number(Save_status[0][0].HSN_Id_);
        if (resultId > 0) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Saved Successfully', Type: "false" }
          });
          this.Page_Load();
        } else if (resultId == -1) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'HSN Code Already Exists', Type: "2" }
          });
        } else {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Error Occured', Type: "2" }
          });
        }
      },
      error: (error) => {
        console.error("HSN Save API ERROR:", error);
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
        });
      }
    });
    }
}
Edit_HSN(HSN_e:HSN,index)
{
this.Entry_View=true;
this.Check_Hide=false;
this.HSN_=HSN_e;
this.HSN_=Object.assign({},HSN_e);
}
}

