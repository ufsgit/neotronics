import { Component, OnInit,Input,Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge } from 'rxjs';
// import { Journal_Entry_Service } from '../../../services/Journal_Entry.service';
// import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Journal_Entry } from '../../../models/Journal_Entry';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { PaymentMode } from '../../../models/PaymentMode';
import { MatDialog } from '@angular/material/dialog';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {FormControl} from '@angular/forms';

// import { Payment_Voucher_Service } from '../../../services/Payment_Voucher.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.Service';
import { Payment_Voucher_Service } from '../../../services/Payment_Voucher.Service';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.Service';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {
    dateInput: 'DD/MM/YYYY',
    },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };
@Component({
    selector: 'app-Journal_Report',
    templateUrl: './Journal_Report.component.html',
    styleUrls: ['./Journal_Report.component.css'],
providers: [
            {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
            {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},],
})
export class Journal_ReportComponent implements OnInit {
Journal_Entry_Data:Journal_Entry[]
Journal_Entry_:Journal_Entry= new Journal_Entry();
Journal_Entry_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;

 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
month: any;
day: any;
date:any;
year: any;
 Print_Date_:Date;
issLoading: boolean;
Permissions: any;
Journal_Entry_Edit:boolean;
Journal_Entry_Save:boolean;
Journal_Entry_Delete:boolean;
FromAccount_:Client_Accounts=new Client_Accounts();
Client_Accounts_Data:Client_Accounts[]
ToAccount_:Client_Accounts=new Client_Accounts();
Search_FromDate:Date=new Date();
Search_ToDate:Date=new Date();
Look_In_Date:Boolean=true;
FromAccount_Search:Client_Accounts=new Client_Accounts();
ToAccount_Search:Client_Accounts=new Client_Accounts();
Voucher_No_search:number;
Login_User:string="0";
FromAccount_Temp:Client_Accounts=new Client_Accounts();
ToAccount_Temp:Client_Accounts=new Client_Accounts();

Payment_Mode_Data:PaymentMode[]
Mode_Temp:PaymentMode=new PaymentMode();
Payment_Mode_:PaymentMode=new PaymentMode();
constructor(public Receipt_Voucher_Service_:Receipt_Voucher_Service,public Payment_Voucher_Service_:Payment_Voucher_Service,
    public Journal_Entry_Service_:Journal_Entry_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Login_User=localStorage.getItem("Login_User");
this.Permissions = Get_Page_Permission(42);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Journal_Entry_Edit=this.Permissions.Edit;
this.Journal_Entry_Save=this.Permissions.Save;
this.Journal_Entry_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
    // this.Journal_Entry_.Date = new Date(); 
    this.Get_Payment_Mode() ;
    this.Entry_View=false;  
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
trackByFn(index, item) 
{
return index;
}
To_Change(Address1) 
{ 
    
    this.Journal_Entry_.To_Detail=Address1;
}
Address_Change(Address1) 
{ 
    
    this.Journal_Entry_.From_Detail=Address1;
}
Get_Payment_Mode() 
{  
   this.Payment_Voucher_Service_.Get_Payment_Mode().subscribe(Rows => {               
        this.Payment_Mode_Data = Rows[0];
        this.Mode_Temp.Payment_Mode_Id = 0;
    this.Mode_Temp.Payment_Mode_Name = "Select";
    this.Payment_Mode_Data.unshift(this.Mode_Temp);
    this.Payment_Mode_ = this.Payment_Mode_Data[0];
        },
        Rows => 
        {
        //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}
 Get_Client_Accounts_Typeahead(event: any)
    {
             
            this.issLoading=true;
    var Value = "";
    if (event.target.value == "")
    Value = undefined;
    else
    Value = event.target.value;
    this.Receipt_Voucher_Service_.Get_Client_Accounts_Typeahead(Value).subscribe(Rows => {
    if (Rows != null) {
    this.Client_Accounts_Data = Rows[0];
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });

    }
display_FromAccount(Client_Accounts_e: Client_Accounts) 
    {
         
    if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
    }
Search_Journal_Entry()
{ var look_In_Date_Value=0,ClientAccount=0,Voucher_No_search_=0,ClientAccounts_Id=0;
   
    if (this.Look_In_Date == true )
    look_In_Date_Value = 1;


    if (this.ToAccount_Search != undefined && this.ToAccount_Search!=null)
    if (this.ToAccount_Search.Client_Accounts_Id != undefined && this.ToAccount_Search.Client_Accounts_Id != null)
    ClientAccounts_Id = this.ToAccount_Search.Client_Accounts_Id;

    if (this.FromAccount_Search != undefined && this.FromAccount_Search!=null)
    if (this.FromAccount_Search.Client_Accounts_Id != undefined && this.FromAccount_Search.Client_Accounts_Id != null)
    ClientAccount= this.FromAccount_Search.Client_Accounts_Id;

    if (this.Voucher_No_search != undefined && this.Voucher_No_search != null && this.Voucher_No_search != 0)
    Voucher_No_search_ = this.Voucher_No_search;

 
    this.issLoading=true;
this.Journal_Entry_Service_.Search_Journal_Entry(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),ClientAccount,ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value,1,1).subscribe(Rows => {
 
    this.Journal_Entry_Data=Rows[0];
this.Total_Entries=this.Journal_Entry_Data.length;
if(this.Journal_Entry_Data.length==0)
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
}

