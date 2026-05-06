import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { currencydetails_Service } from '../../../services/currencydetails.service';
// import { DialogBoxComponent } from '../DialogBox/DialogBox.component';
import { currencydetails } from '../../../models/currencydetails';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';import { currencydetails_Service } from 'app/services/currencydetails.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
// import { DialogBoxComponent } from 'app/components/dialog-box/dialog-box.component';
@Component({
selector: 'app-currencydetails',
templateUrl: './currencydetails.component.html',
styleUrls: ['./currencydetails.component.css']
})
export class currencydetailsComponent implements OnInit {
currencydetails_Data:currencydetails[]
currencydetails_:currencydetails= new currencydetails();
currencydetails_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
currencydetails_Edit:boolean;
currencydetails_Save:boolean;
currencydetails_Delete:boolean;
myInnerHeight: number;
constructor(public currencydetails_Service_:currencydetails_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(15);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.currencydetails_Edit=this.Permissions.Edit;
this.currencydetails_Save=this.Permissions.Save;
this.currencydetails_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_currencydetails();
this.Search_currencydetails();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_currencydetails();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_currencydetails()
 {
this.currencydetails_.CurrencyDetails_Id=0;
this.currencydetails_.CurrecnyName="";

}
Search_currencydetails()
{
this.issLoading=true;
this.currencydetails_Service_.Search_currencydetails('').subscribe(Rows => {
 this.currencydetails_Data=Rows[0];
this.Total_Entries=this.currencydetails_Data.length;
if(this.currencydetails_Data.length==0)
{
this.issLoading=false;
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'No Details Found',Type:"3"}});
}
this.issLoading=false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Error Occured',Type:"2"}});
 });
}
Delete_currencydetails(currencydetails_Id,index)
{
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.currencydetails_Service_.Delete_currencydetails(currencydetails_Id).subscribe(Delete_status => {
if(Delete_status[0][0].currencydetails_Id_>0){
this.currencydetails_Data.splice(this.EditIndex, 1);
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Deleted',Type: "false"}});
}
else
{
this.issLoading=false;
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Error Occured',Type:"2"}});
 });
}
 });
}
Save_currencydetails()
{
this.issLoading=true;
this.currencydetails_Service_.Save_currencydetails(this.currencydetails_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].currencydetails_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
}
else{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
 });
}
Edit_currencydetails(currencydetails_e:currencydetails,index)
{
this.Entry_View=true;
this.currencydetails_=currencydetails_e;
this.currencydetails_=Object.assign({},currencydetails_e);
}
}

