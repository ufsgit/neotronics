import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { country_Service } from '../../../services/country.service';
// import { DialogBoxComponent } from '../DialogBox/DialogBox.component';
import { country } from '../../../models/country';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';import { country_Service } from 'app/services/country.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';


// import { DialogBoxComponent } from 'app/components/dialog-box/dialog-box.component';
@Component({
selector: 'app-country',
templateUrl: './country.component.html',
styleUrls: ['./country.component.css']
})
export class countryComponent implements OnInit {
country_Data:country[]
country_:country= new country();
country_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
country_Edit:boolean;
country_Save:boolean;
country_Delete:boolean;
myInnerHeight: number;
constructor(public country_Service_:country_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
this.country_Edit=this.Permissions.Edit;
this.country_Save=this.Permissions.Save;
this.country_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_country();
this.Search_country();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_country();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_country()
 {
this.country_.Country_Id=0;
this.country_.Country_Name="";

}
Search_country()
{
this.issLoading=true;
this.country_Service_.Search_country('').subscribe(Rows => {
 this.country_Data=Rows[0];
this.Total_Entries=this.country_Data.length;
if(this.country_Data.length==0)
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
Delete_country(country_Id,index)
{
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.country_Service_.Delete_country(country_Id).subscribe(Delete_status => {
if(Delete_status[0][0].country_Id_>0){
this.country_Data.splice(this.EditIndex, 1);
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
Save_country()
{
this.issLoading=true;
this.country_Service_.Save_country(this.country_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].country_Id_)>0)
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
Edit_country(country_e:country,index)
{
this.Entry_View=true;
this.country_=country_e;
this.country_=Object.assign({},country_e);
}
}

