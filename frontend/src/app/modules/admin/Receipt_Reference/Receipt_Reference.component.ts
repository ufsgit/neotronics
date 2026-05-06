import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receipt_Reference_Service } from '../../../services/Receipt_Reference.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Receipt_Reference } from '../../../models/Receipt_Reference';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Receipt_Reference',
templateUrl: './Receipt_Reference.component.html',
styleUrls: ['./Receipt_Reference.component.css']
})
export class Receipt_ReferenceComponent implements OnInit {
Receipt_Reference_Data:Receipt_Reference[]
Receipt_Reference_:Receipt_Reference= new Receipt_Reference();
Receipt_Reference_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Receipt_Reference_Edit:boolean;
Receipt_Reference_Save:boolean;
Receipt_Reference_Delete:boolean;
constructor(public Receipt_Reference_Service_:Receipt_Reference_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.Receipt_Reference_Edit=this.Permissions.Edit;
this.Receipt_Reference_Save=this.Permissions.Save;
this.Receipt_Reference_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
  
this.Clr_Receipt_Reference();
this.Search_Receipt_Reference();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Receipt_Reference();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Receipt_Reference()
 {
this.Receipt_Reference_.Receipt_Voucher_Reference_Id=0;
this.Receipt_Reference_.Payment_Voucher_Id=0;
this.Receipt_Reference_.Master_Id=0;
this.Receipt_Reference_.Amount=0;
this.Receipt_Reference_.Discount=0;

}
Search_Receipt_Reference()
{
this.issLoading=true;
this.Receipt_Reference_Service_.Search_Receipt_Reference('').subscribe(Rows => {
 this.Receipt_Reference_Data=Rows[0];
this.issLoading=false;
this.Total_Entries=this.Receipt_Reference_Data.length;
if(this.Receipt_Reference_Data.length==0)
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
Delete_Receipt_Reference(Receipt_Reference_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Receipt_Reference_Service_.Delete_Receipt_Reference(Receipt_Reference_Id).subscribe(Delete_status => {
if(Delete_status[0][0].Receipt_Reference_Id_>0){
this.Receipt_Reference_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
}
else
{
//this.Receipt_Reference_Data.splice(index, 1);
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
Save_Receipt_Reference()
{
document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
this.Receipt_Reference_Service_.Save_Receipt_Reference(this.Receipt_Reference_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Receipt_Reference_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
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
Edit_Receipt_Reference(Receipt_Reference_e:Receipt_Reference,index)
{
this.Entry_View=true;
this.Receipt_Reference_=Receipt_Reference_e;
this.Receipt_Reference_=Object.assign({},Receipt_Reference_e);
}
}

