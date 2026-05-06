import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { General_Settings_Service } from '../../../services/General_Settings.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { General_Settings } from '../../../models/General_Settings';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-General_Settings',
templateUrl: './General_Settings.component.html',
styleUrls: ['./General_Settings.component.css']
})
export class General_SettingsComponent implements OnInit {
General_Settings_Data:General_Settings[]
General_Settings_:General_Settings= new General_Settings();
General_Settings_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
General_Settings_Edit:boolean;
General_Settings_Save:boolean;
General_Settings_Delete:boolean;
constructor(public General_Settings_Service_:General_Settings_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(77);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.General_Settings_Edit=this.Permissions.Edit;
this.General_Settings_Save=this.Permissions.Save;
this.General_Settings_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
// this.Clr_General_Settings();
this.Get_General_Settings1()
this.Search_General_Settings();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_General_Settings();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_General_Settings()
 {
this.General_Settings_.General_Settings_Id=0;
this.General_Settings_.Invoice_No=null;
this.General_Settings_.Purchase_Retrun_No=null;
this.General_Settings_.Sales_Return_No=null;
this.General_Settings_.Damage_No=null;
this.General_Settings_.Contra_Voucher_No=null;
this.General_Settings_.Journal_Voucher_No=null;
this.General_Settings_.Receipt_Voucher_No=null;
this.General_Settings_.Payment_Voucher_No=null;

}
Search_General_Settings()
{
this.issLoading=true;
this.General_Settings_Service_.Search_General_Settings('').subscribe(Rows => {
 this.General_Settings_Data=Rows[0];
this.issLoading=false;
this.Total_Entries=this.General_Settings_Data.length;
if(this.General_Settings_Data.length==0)
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
Delete_General_Settings(General_Settings_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.General_Settings_Service_.Delete_General_Settings(General_Settings_Id).subscribe(Delete_status => {
if(Delete_status[0][0].General_Settings_Id_>0){
this.General_Settings_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
}
else
{
//this.General_Settings_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
     this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
 });
}
Save_General_Settings()
{
document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
debugger
this.General_Settings_Service_.Save_General_Settings(this.General_Settings_).subscribe(Save_status => {
    debugger
Save_status=Save_status[0];
if(Number(Save_status[0].General_Settings_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this. Clr_General_Settings();
this.Get_General_Settings1();
}
else{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
     this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
Edit_General_Settings(General_Settings_e:General_Settings,index)
{
this.Entry_View=true;
this.General_Settings_=General_Settings_e;
this.General_Settings_=Object.assign({},General_Settings_e);
}



Get_General_Settings1()
{
debugger
this.issLoading=true;
this.General_Settings_Service_.Get_General_Settings1().subscribe(Rows => {
    debugger
 this.General_Settings_Data=Rows[0];
 var General_Settings_e = this.General_Settings_Data[0]
 this.General_Settings_=Object.assign({},General_Settings_e)
this.issLoading=false;
this.Total_Entries=this.General_Settings_Data.length;
if(this.General_Settings_Data.length==0)
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


}

