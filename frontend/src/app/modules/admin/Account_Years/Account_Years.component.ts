import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account_Years_Service } from '../../../services/Account_Years.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Account_Years } from '../../../models/Account_Years';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {
    dateInput: 'DD/MM/YYYY',
    },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import { DatePipe } from '@angular/common';


// import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Account_Years',
templateUrl: './Account_Years.component.html',
styleUrls: ['./Account_Years.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class Account_YearsComponent implements OnInit {
Account_Years_Data:Account_Years[]
Account_Years_:Account_Years= new Account_Years();
Account_Years_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Account_Years_Edit:boolean;
Account_Years_Save:boolean;
Account_Years_Delete:boolean;

month: any;
    year: any;
    date: any;
    d: Date;
    day: any;

    toyear: any;
    fromyear: any;
    accountyear:any;


constructor(public Account_Years_Service_:Account_Years_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{

    debugger
this.Permissions = Get_Page_Permission(76);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Account_Years_Edit=this.Permissions.Edit;
this.Account_Years_Save=this.Permissions.Save;
this.Account_Years_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;

    // this.Account_Years_.YearFrom=this.New_Date(this.Account_Years_.YearFrom);
  

this.Clr_Account_Years();
this.Search_Account_Years();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Account_Years();
}

New_Date(Date_)
        {
        this.date=Date_;
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        if (this.month < 10) {
        this.month = "0" + this.month;
        }
        this.day = this.date.getDate().toString();
        if (Number.parseInt(this.day) <10) {
        this.day = "0" + this.day;
        }
        this.date = this.year + "-" + this.month + "-" + this.day;
        return this.date;
        }

Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Account_Years()
 {
this.Account_Years_.Account_Years_Id=0;
this.Account_Years_.Account_Year="";
// this.Account_Years_.YearFrom="";
// this.Account_Years_.YearTo="";

this.Account_Years_.YearFrom=new Date();
this.Account_Years_.YearFrom=this.New_Date(this.Account_Years_.YearFrom);
this.Account_Years_.YearTo=new Date();
this.Account_Years_.YearTo=this.New_Date(this.Account_Years_.YearTo);

}
Search_Account_Years()
{

    debugger
this.issLoading=true;
this.Account_Years_Service_.Search_Account_Years().subscribe(Rows => {
 this.Account_Years_Data=Rows[0];
this.issLoading=false;
this.Total_Entries=this.Account_Years_Data.length;
if(this.Account_Years_Data.length==0)
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
Delete_Account_Years(Account_Years_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Account_Years_Service_.Delete_Account_Years(Account_Years_Id).subscribe(Delete_status => {
if(Delete_status[0][0].Account_Years_Id_>0){
this.Account_Years_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
this.Search_Account_Years();
}
else
{
this.Account_Years_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});}
this.issLoading=false;
 },
 Rows => { 
     this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
 });
}
Save_Account_Years()
{
debugger
var fromdate = this.Account_Years_.YearFrom;
this.Account_Years_.YearFrom=this.New_Date(new Date(moment(this.Account_Years_.YearFrom).format('YYYY-MM-DD')));
 this.fromyear = new DatePipe('en-US').transform(fromdate, 'yyyy');

var todate = this.Account_Years_.YearTo;
this.Account_Years_.YearTo=this.New_Date(new Date(moment(this.Account_Years_.YearTo).format('YYYY-MM-DD')));
this.toyear = new DatePipe('en-US').transform(todate, 'yyyy');
this.accountyear=(this.fromyear+'-'+this.toyear)
this.Account_Years_.Account_Year = this.accountyear;
// console.log(year); // Output: "2023"


document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
debugger
this.Account_Years_Service_.Save_Account_Years(this.Account_Years_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Account_Years_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Clr_Account_Years();
this.Search_Account_Years();
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
Edit_Account_Years(Account_Years_e:Account_Years,index)
{
    debugger
this.Entry_View=false;
this.Account_Years_=Account_Years_e;
this.Account_Years_=Object.assign({},Account_Years_e);
this.Account_Years_.YearFrom =new Date(this.Account_Years_.YearFrom);
this.Account_Years_.YearTo =new Date(this.Account_Years_.YearTo);
}
}

