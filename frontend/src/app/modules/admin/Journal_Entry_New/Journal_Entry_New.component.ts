import { Component, OnInit,Input,Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.Service';
// import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Journal_Entry } from '../../../models/Journal_Entry';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { PaymentMode } from '../../../models/PaymentMode';
import { MatDialog } from '@angular/material/dialog';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {FormControl} from '@angular/forms';

import { Payment_Voucher_Service } from '../../../services/Payment_Voucher.Service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { currencydetails_Service } from '../../../services/currencydetails.Service';
import { payment_term } from '../../../models/payment_term';
import{accounttype} from"../../../models/accounttype";
import { currencydetails} from"../../../models/currencydetails";
import { payment_term_Service } from '../../../services/payment_term.Service';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.Service';
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
selector: 'app-Journal_Entry_New',
templateUrl: './Journal_Entry_New.component.html',
styleUrls: ['./Journal_Entry_New.component.css'],
providers: [
            {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
            {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},],
})
export class Journal_Entry_NewComponent implements OnInit {
Journal_Entry_Data: Journal_Entry[] = [];
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
Look_In_Date:Boolean=false;
FromAccount_Search:Client_Accounts=new Client_Accounts();
ToAccount_Search:Client_Accounts=new Client_Accounts();
Voucher_No_search:number;
Login_User:string="0";
FromAccount_Temp:Client_Accounts=new Client_Accounts();
ToAccount_Temp:Client_Accounts=new Client_Accounts();
Total_Amounts:number=0;

Payment_Mode_Data:PaymentMode[]
Mode_Temp:PaymentMode=new PaymentMode();
Payment_Mode_:PaymentMode=new PaymentMode();


currency:currencydetails = new currencydetails();
currencyData:currencydetails[];
currencyTemp:currencydetails = new currencydetails();

accounttype:accounttype = new accounttype();
accounttypeData:accounttype[];
accounttypeTemp:accounttype = new accounttype();

Payment_Term:payment_term = new payment_term();
PaymentTermData:payment_term[];
Payment_TermTemp:payment_term = new payment_term();
    User_Type_Id: number;
    User_Type:string
constructor(public Receipt_Voucher_Service_:Receipt_Voucher_Service,public Payment_Voucher_Service_:Payment_Voucher_Service,
    public Journal_Entry_Service_:Journal_Entry_Service, 
    public currencydetails_Service_:currencydetails_Service,
    private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog,
    public payment_term_Service_:payment_term_Service) { }
ngOnInit() 
{
this.Login_User=localStorage.getItem("Login_User");
this.User_Type_Id=Number(localStorage.getItem('User_Type_Id'));
this.User_Type=(localStorage.getItem('User_Type'));
this.Permissions = Get_Page_Permission(107);
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
    this.Search_FromDate = this.New_Date(this.Search_FromDate);
    this.Search_ToDate = this.New_Date(this.Search_ToDate);
    this.Journal_Entry_.Date = new Date("dd-MMM-yyyy").toString();

    this.Load_Currency();
    this.Load_InvoiceType();
    this.Load_Payment_Term();
    this.Clr_Journal_Entry();
    this.Get_Payment_Mode();

    // Do NOT auto-load data — keep table empty until Search is clicked
    this.Journal_Entry_Data = [];
    this.Total_Entries = 0;
    this.Total_Amounts = 0;
    this.Entry_View = false;
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
 Print_Date(Date_)
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
    this.date = this.day + "-" + this.month + "-" + this.year;
    return this.date;
    }
Create_New()
{
this.Entry_View = true;
this.Clr_Journal_Entry();
}
Close_Click()
{
this.Clr_Journal_Entry();
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}


formatDate(dateString): string {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateString);
      return '';
    }
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

 Clr_Journal_Entry()
 {
this.Journal_Entry_.Journal_Entry_Id=0;

this.Journal_Entry_.Date=new Date().toString();
this.Journal_Entry_.Date=this.formatDate(this.Journal_Entry_.Date);


// this.Journal_Entry_.Date=new Date();
// this.Journal_Entry_.Date=this.New_Date(this.Journal_Entry_.Date);
this.Journal_Entry_.Voucher_No=0;
this.Journal_Entry_.From_Account_Id=0;
this.Journal_Entry_.Amount=0;
this.Journal_Entry_.To_Account_Id=0;
this.Journal_Entry_.Description="";    
this.Journal_Entry_.From_Detail="";   
this.Journal_Entry_.Invoice_no="";   
this.Journal_Entry_.Notes="";   
this.Journal_Entry_.PaymentTermValue="";   
this.Journal_Entry_.PaymentTerms=0;   
this.Journal_Entry_.Payment_Term_Description="";  
this.Journal_Entry_.AccountType_Id=0;   
this.Journal_Entry_.CurrencyId=0;   
this.Journal_Entry_.Description ='';

this.Journal_Entry_.To_Detail="";    
if(this.Payment_Mode_Data!=null && this.Payment_Mode_Data != undefined)
this.Payment_Mode_=this.Payment_Mode_Data[0];

if(this.PaymentTermData!=null && this.PaymentTermData != undefined)
    this.Payment_Term=this.PaymentTermData[0];

if(this.currencyData!=null && this.currencyData != undefined)
    this.currency=this.currencyData[0];

if(this.accounttypeData!=null && this.accounttypeData != undefined)
    this.accounttype=this.accounttypeData[0];
 
this.Journal_Entry_.Payment_Status=0;
this.Journal_Entry_.User_Id=0;
this.FromAccount_=null;
this.ToAccount_=null;


// this.Journal_Entry_.Description="";
// this.Journal_Entry_.Payment_Status=1;
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
debugger
    this.Receipt_Voucher_Service_.Get_Client_Accounts_Typeahead_new(Value).subscribe(Rows => {
        debugger
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
this.Journal_Entry_Service_.Search_Journal_Entry(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),ClientAccount,ClientAccounts_Id,Voucher_No_search_,
look_In_Date_Value,this.User_Type_Id, this.Login_User).subscribe(Rows => {
 
    this.Journal_Entry_Data=Rows[0];
this.Total_Entries=this.Journal_Entry_Data.length;

for (var i = 0; i < this.Journal_Entry_Data.length; i++) {
    this.Total_Amounts =
        Number(this.Total_Amounts) +
        Number(this.Journal_Entry_Data[i].Amount);
}
this.Total_Amounts =Number(this.Total_Amounts.toFixed(3));

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
Delete_Journal_Entry(Journal_Entry_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Journal_Entry_Service_.Delete_Journal_Entry(Journal_Entry_Id).subscribe(Delete_status => {
if(Delete_status[0][0].Journal_Entry_Id_>0){
this.Total_Entries=this.Total_Entries-1;

this.Journal_Entry_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
//this.Search_Journal_Entry();
}
else
{
//this.Journal_Entry_Data.splice(index, 1);

const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
    this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});});
}
 });
}
Save_Journal_Entry()
{
   
    if (this.FromAccount_ == undefined || this.FromAccount_.Client_Accounts_Id == 0 || this.FromAccount_ == null||this.FromAccount_.Client_Accounts_Id==undefined) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The From account', Type: "3" } });
        }
        else if(this.Journal_Entry_.Amount==undefined||this.Journal_Entry_.Amount==null||this.Journal_Entry_.Amount==undefined||this.Journal_Entry_.Amount==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Amount', Type: "3" } });
        }
        else if(this.ToAccount_==undefined||this.ToAccount_==null||this.ToAccount_.Client_Accounts_Id==undefined||this.ToAccount_.Client_Accounts_Id==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The To Account', Type: "3" } });
        }
        else if(this.currency.CurrencyDetails_Id == undefined || this.currency.CurrencyDetails_Id == 0 ){
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose currency',Type:"3"}});
            return
        }

        // else if(this.Journal_Entry_.AccountType_Id == undefined || this.Journal_Entry_.AccountType_Id == 0 ){
        //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose Invoice Type',Type:"3"}});
        //     return
        // }
          
    else{
        this.Journal_Entry_.User_Id=Number(this.Login_User);
        this.Journal_Entry_.From_Account_Id=this.FromAccount_.Client_Accounts_Id;
        this.Journal_Entry_.To_Account_Id=this.ToAccount_.Client_Accounts_Id;
        // this.Journal_Entry_.PaymentMode=this.Payment_Mode_.Payment_Mode_Id;
        this.Journal_Entry_.Date=this.New_Date(new Date(moment(this.Journal_Entry_.Date).format('YYYY-MM-DD')));

       
        if(this.Payment_Term.payment_Term_ID==null || this.Payment_Term.payment_Term_ID==undefined)
        {
            this.Journal_Entry_.Payment_Term_Description = "";
            this.Journal_Entry_.PaymentTerms =0;
        }
        else{
        this.Journal_Entry_.PaymentTerms = this.Payment_Term.payment_Term_ID;
        this.Journal_Entry_.Payment_Term_Description=this.Payment_Term.Payment_Term_Description;
    }
        this.Journal_Entry_.CurrencyId=this.currency.CurrencyDetails_Id;

            if(this.accounttype==null ||this.accounttype==undefined){
                this.Journal_Entry_.AccountType_Id=0;
            }
            if(this.accounttype.AccountType_Id ==undefined || this.accounttype.AccountType_Id ==null){
                this.Journal_Entry_.AccountType_Id=0;}
            else{
                 this.Journal_Entry_.AccountType_Id=this.accounttype.AccountType_Id;
            }          

debugger

document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
this.Journal_Entry_Service_.Save_Journal_Entry(this.Journal_Entry_).subscribe(Save_status => {
  
Save_status=Save_status[0];
if(Number(Save_status[0].Journal_Entry_Id_)>0)
{

const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Clr_Journal_Entry();
this.Close_Click();

document.getElementById("Save_Button").hidden=true;
this.Journal_Entry_.Voucher_No=Save_status[0].Voucher_No_;
}
else{
 
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
//this.Search_Journal_Entry();
this.issLoading=false;
 },
 Rows => { 
    this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });

}
}
Edit_Journal_Entry(Journal_Entry_e:Journal_Entry,index)
{
    
this.Entry_View=true;
this.Journal_Entry_=Journal_Entry_e;
this.Print_Date_=new Date ( this.Journal_Entry_.Date);
this.Print_Date_=this.Print_Date(this.Print_Date_);
this.Journal_Entry_=Object.assign({},Journal_Entry_e);
 
this.FromAccount_Temp.Client_Accounts_Id=Journal_Entry_e.From_Account_Id;
this.FromAccount_Temp.Client_Accounts_Name=Journal_Entry_e.FromAccount_Name;
this.FromAccount_=this.FromAccount_Temp;

this.ToAccount_Temp.Client_Accounts_Id=Journal_Entry_e.To_Account_Id;
this.ToAccount_Temp.Client_Accounts_Name=Journal_Entry_e.ToAccount_Name;
this.ToAccount_=this.ToAccount_Temp;

debugger;

for (var i = 0; i < this.currencyData.length; i++) {
    if (Journal_Entry_e.CurrencyId == this.currencyData[i].CurrencyDetails_Id)
    this.currency = this.currencyData[i];
}
debugger;
for (var i = 0; i < this.PaymentTermData.length; i++) {
    if (Journal_Entry_e.PaymentTerms == this.PaymentTermData[i].payment_Term_ID)
    this.Payment_Term = this.PaymentTermData[i];
}
debugger;
for (var i = 0; i < this.accounttypeData.length; i++) {
    if (Journal_Entry_e.AccountType_Id == this.accounttypeData[i].AccountType_Id)
    this.accounttype = this.accounttypeData[i];
}
debugger;

for (var i = 0; i < this.Payment_Mode_Data.length; i++) {
    if (Journal_Entry_e.PaymentMode == this.Payment_Mode_Data[i].Payment_Mode_Id)
    this.Payment_Mode_ = this.Payment_Mode_Data[i];
}
debugger;
}

Load_Currency() {
	this.currencydetails_Service_.Search_currencydetails('').subscribe(Rows => {
		if (Rows != null) {	

			  this.currencyData = Rows[0];
			  this.currencyTemp.CurrencyDetails_Id = 0;
			  this.currencyTemp.CurrecnyName = "Select";
			  this.currencyData.unshift(this.currencyTemp);
			  this.currency = this.currencyData[0];
		 
		}
		this.issLoading = false;
	},
		Rows => {
			this.issLoading = false;
			const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
		});
}
Load_InvoiceType(){
    this.currencydetails_Service_.Load_InvoiceType('').subscribe(Rows => {
        if (Rows != null) {    
            this.accounttypeData = Rows[0];
            this.accounttypeTemp.AccountType_Id = 0;
            this.accounttypeTemp.AccountType_Name = "Select";
            this.accounttypeData.unshift(this.accounttypeTemp);
            this.accounttype = this.accounttypeData[0];
        }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}
Load_Payment_Term() {
    this.payment_term_Service_.Search_payment_term('').subscribe(Rows => {
        if (Rows != null) {
            this.PaymentTermData = Rows[0];
            this.Payment_TermTemp.payment_Term_ID = 0;
            this.Payment_TermTemp.Payment_Term_Description = "Select";
            this.PaymentTermData.unshift(this.Payment_TermTemp);
            this.Payment_Term = this.PaymentTermData[0];
        }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}
}

