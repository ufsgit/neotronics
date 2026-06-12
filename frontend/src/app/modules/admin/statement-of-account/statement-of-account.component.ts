import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Renderer2, NgZone, Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { User_Details_Service } from '../../../services/User_Details.Service';
import{Satementofaccounts}from '../../../models/Satementofaccounts'
// import { Sales_Master_Service } from '../../../services/Sales_Master.service';
import { currencydetails_Service } from '../../../services/currencydetails.Service';
import { purchaseordermaster_Service } from '../../../services/purchaseordermaster.Service';
import { Employee_Details_Service } from '../../../services/Employee_Details.Service';
import { Stock_Service } from '../../../services/Stock.Service';
import { Item_Group_Service } from '../../../services/Item_Group.Service';
import { payment_term_Service } from '../../../services/payment_term.Service';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Quotation_Master } from '../../../models/Quotation_Master';
import { Company } from '../../../models/Company';
import { Quotation_Details } from '../../../models/Quotation_Details';
import { Bill_Type } from '../../../models/Bill_Type';
import { Bill_Mode } from '../../../models/Bill_Mode';
import { Stock } from '../../../models/Stock';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { Item_Group } from '../../../models/Item_Group';
import { currencydetails } from '../../../models/currencydetails';
import { User_Details } from '../../../models/User_Details';
import { payment_term } from '../../../models/payment_term';
import { Sales_Master_Service } from '../../../services/Sales_Master.Service';
import { accounttype } from '../../../models/accounttype';
import { StopIngestionRequest } from 'aws-sdk/clients/appfabric';
// import { ConsoleReporter } from 'jasmine';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {    dateInput: 'DD/MM/YYYY',  },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };

@Component({
  selector: 'app-statement-of-account',
  templateUrl: './statement-of-account.component.html',
  styleUrls: ['./statement-of-account.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]

})
export class StatementOfAccountComponent implements OnInit {

  Search_FromDate=new Date().toString();
  Search_ToDate=new Date().toString();
  Currency_Search:currencydetails = new currencydetails();
  currencyData: currencydetails[];
  User_Type_Id:number;
  User_Type:string;
  paymentdue:string;
  Currency_Temp: currencydetails = new currencydetails();
Currency: currencydetails = new currencydetails();
Customer_:Client_Accounts= new Client_Accounts();
  issLoading: boolean;Login_User_Id:string;
  Employee_Name:string;Employee_Id:number;
  Permissions: any;myInnerHeight: number;
  printLetterhead:boolean = false;
  Voucher;voucherTypeData;
  Satementofaccounts_Data:Satementofaccounts[];
  Satementofaccounts:Satementofaccounts=new Satementofaccounts();
  accountData=[];
  dramt:string;
  cramt:string;
  balamce1:string;
  balamce:number;
  agingeport:boolean=false;

  thirtyvaluecr:number=0;
  thirtyvaluedr:number=0;
  thirtybalvalue:number=0;
  thirtybalvalue1:string;

  sistyvaluedr:number=0;
  sistyvaluecr:number=0;
  sistybalvalue:number=0;
  sistybalvalue1:string;

  nintyvaluedr:number=0;
  nintyvaluecr:number=0;
  nintybalvalue:number=0;
  nintybalvalue1:string;

  onetwetyvaluedr:number=0;
  onetwetyvaluecr:number=0;
  onetwentybalvalue:number=0;
  onetwentybalvalue1:string;

  onefiftyvaluedr:number=0;
  onefiftyvaluecr:number=0;
  onefiftybalvalue:number=0;
  onefiftybalvalue1:string;

  oneeightyvaluedr:number=0;
  oneeightyvaluecr:number=0;
  oneeightybalvalue:number=0;
  oneeightybalvalue1:string;

  oneeightyabovevaluedr:number=0;
  oneeightyabovevaluecr:number=0;
  oneeightyabovebalvalue:number=0;
  oneeightyabovebalvalue1:string;

Quotation_Master_Total_Amount_30days:string;
Quotation_Master_Total_Amount_60dyas:string;
Quotation_Master_Total_Amount_90days:string;
Quotation_Master_Total_Amount_120days:string;
Quotation_Master_Total_Amount_150days:string;
Quotation_Master_Total_Amount_180days:string;
Quotation_Master_Total_Amount_above180days:string;   
Quotation_Master_Total_Amount:string;

Quotation_Master_Total_Overdue:number;
Quotation_Master_Total_Overdue1:string;

  fiftenvalue1:string;
  thirtyvalue1:string;
  sistyvalue1:string;
  nintyvalue1:string;
  oneetyvalue1:string;
  thrisistyvalue1:string;

  aggingperiod:number=0;

  AccountType_Temp : accounttype = new accounttype();
  Search_AccountType: accounttype = new accounttype;
  Customer_Data=[];Search_Customer;Entry_View=false;
  Quotation_Master_Data=[];Total_Entries=0;currentDate;FromDate;ToDate;
  Address1 ='';Address2 ='';Address3 ='';Address4 ='';GSTNo="";Mobile="";PinCode="";MoreOptions_View:boolean=false;
  constructor(public currencydetails_Service_:currencydetails_Service,public dialogBox: MatDialog,private router: Router,public Receipt_Voucher_Service_:Receipt_Voucher_Service,
   public Sales_Master_Service_:Sales_Master_Service, public Client_Accounts_Service_:Client_Accounts_Service
  ) { }

  ngOnInit() {
    this.User_Type_Id=Number(localStorage.getItem('User_Type_Id'));
    this.User_Type=(localStorage.getItem('User_Type'));
    this.Login_User_Id=localStorage.getItem('Login_User');
    this.Employee_Name=localStorage.getItem('Employee_Name');
    this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
    this.Permissions = Get_Page_Permission(95);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    // this.Sales_Master_Edit=this.Permissions.Edit;
    // this.Sales_Master_Save=this.Permissions.Save;
    // this.Sales_Master_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
  }

  Page_Load(){
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 350;
    this.Search_FromDate=this.formatDate(this.Search_FromDate);
    this.Search_ToDate=this.formatDate(this.Search_ToDate);
    this.Load_Currency();
    this.Load_VoucherType();
    this.Load_All_Account_Type();

  }

  Load_Currency() {
    this.currencydetails_Service_.Search_currencydetails('').subscribe(Rows => {  
        this.currencyData = Rows[0];        
        this.Currency_Temp.CurrencyDetails_Id = 0;
        this.Currency_Temp.CurrecnyName = "Select";
        this.currencyData.unshift(this.Currency_Temp);       
        this.Currency_Search = this.currencyData[0];       
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}

Load_VoucherType() {
  this.Receipt_Voucher_Service_.Get_Voucher_Type().subscribe(Rows => {
      if (Rows != null) {
          this.voucherTypeData = Rows[0];
          this.voucherTypeData.unshift({
              "Voucher_Type_Id": 0,
              "Voucher_Type_Name": "All"
          })
      }
      this.issLoading = false;
  },
      Rows => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
      });
}

Load_All_Account_Type()
{
    this.currencydetails_Service_.Load_All_Account_Type('').subscribe(Rows => {
        if (Rows != null) {
            this.accountData = Rows[0];
            this.AccountType_Temp.AccountType_Id = 0;
            this.AccountType_Temp.AccountType_Name = "Select";
            this.accountData.unshift(this.AccountType_Temp);
            this.Search_AccountType=this.accountData[0];        
        }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}

Search_Customer_Typeahead(event: any)
{
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
      {
     this.issLoading = true;
    this.Receipt_Voucher_Service_.Get_Client_Accounts_Typeahead_new(Value).subscribe(Rows => {     
    if (Rows != null) {
        this.Customer_Data = Rows[0];
    }
    this.issLoading = false;
    },
    Rows => {
     
    this.issLoading = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
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

Customer_Change( Customer_T_)
{
    this.Customer_=Customer_T_;
    
    this.Customer_.Client_Accounts_Name=this.Customer_.Client_Accounts_Name;
    //this.Customer_.Customer=this.Customer_.Client_Accounts_Name;
    this.Customer_.Address1 = this.Customer_.Address1;
    this.Customer_.Address2 = this.Customer_.Address2;
    this.Customer_.Address3 = this.Customer_.Address3;
    this.Customer_.Address4 = this.Customer_.Address4;
    this.Customer_.Mobile = this.Customer_.Mobile;
    this.Customer_.PinCode=this.Customer_.PinCode;
    this.Customer_.GSTNo=this.Customer_.GSTNo;
}

selectCustomer(){
    this.Address1 = this.Customer_.Address1;
    this.Address2 = this.Customer_.Address2;
    this.Address3 = this.Customer_.Address3;
    this.Address4 = this.Customer_.Address4;
    this.GSTNo = this.Customer_.GSTNo;

    this.Address1 = this.Customer_.Address1;
    this.Address2 = this.Customer_.Address2;
    this.Address3 = this.Customer_.Address3;
    this.Address4 = this.Customer_.Address4;
    this.Mobile = this.Customer_.Mobile;
    this.PinCode=this.Customer_.PinCode;
    this.GSTNo=this.Customer_.GSTNo;

}
/*
search_days15()
{
    var todate,fromdate;
    todate = moment(this.Search_ToDate).format('YYYY-MM-DD'); // Format 'Search_ToDate' using moment.js
    fromdate = new Date(new Date(todate).setDate(new Date(todate).getDate() - 15)); // Adjust date properly
    this.Search_FromDate = this.formatDate(fromdate);   
    var look_In_Date_Value=0,CustomerId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0,AccountType_Id_ = 0,Voucher_=0;    
    if(this.Search_Customer==null || this.Search_Customer==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please select an account', Type: "3" } });
        return;
    }
    else
     CustomerId_=this.Search_Customer.Client_Accounts_Id;
    if(this.Search_AccountType==null || this.Search_AccountType==undefined)
        AccountType_Id_=0;
    else
    AccountType_Id_=this.Search_AccountType.AccountType_Id;    
    if(this.Currency_Search.CurrencyDetails_Id==null || this.Currency_Search.CurrencyDetails_Id==undefined)
        CurrencyDetails_Id_=0;
    else
        CurrencyDetails_Id_=this.Currency_Search.CurrencyDetails_Id;
    if(this.Voucher==null || this.Voucher==undefined)
        Voucher_=0;
    else
    Voucher_=this.Voucher.Voucher_Type_Id;    
    this.issLoading=true;    
    this.Sales_Master_Service_.Load_StatementofAccount_Report(CustomerId_,moment(fromdate).format('YYYY-MM-DD'), 
    moment(todate).format('YYYY-MM-DD'),Voucher_,CurrencyDetails_Id_,
    AccountType_Id_, this.User_Type_Id, this.Login_User_Id).subscribe(Rows => {
        debugger;
    if(Rows[0].length>0)         {   
    this.Quotation_Master_Data=Rows[0];
    this.Satementofaccounts_Data=Rows[0];
    const lastElement = Rows[0][Rows[0].length - 1];   
    this.agingeport=true;
    this.thirtyvalue1="0.000";
    this.sistyvalue1="0.000";
    this.nintyvalue1="0.000";
    this.oneetyvalue1="0.000";
    this.thrisistyvalue1="0.000";
    debugger;
    if(lastElement.Dr!="0.000")
        this.fiftenvalue1 =lastElement.Dr;
    else
    this.fiftenvalue1=lastElement.Cr;
    debugger;
    this.aggingperiod=1;
    this.Total_Entries=this.Quotation_Master_Data.length;
    this.paymentdue="Your payment is due in 15 days";
    }
    if(this.Quotation_Master_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    }
    this.issLoading=false;
    },
    error => {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}

search_days30()
{
    var todate,fromdate;
    todate = moment(this.Search_ToDate).format('YYYY-MM-DD'); // Format 'Search_ToDate' using moment.js
    fromdate = new Date(new Date(todate).setDate(new Date(todate).getDate() - 30)); // Adjust date properly
    this.Search_FromDate = this.formatDate(fromdate); 
    var look_In_Date_Value=0,CustomerId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0,AccountType_Id_ = 0,Voucher_=0;    
    if(this.Search_Customer==null || this.Search_Customer==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please select an account', Type: "3" } });
        return;
    }
    else
     CustomerId_=this.Search_Customer.Client_Accounts_Id;
    if(this.Search_AccountType==null || this.Search_AccountType==undefined)
        AccountType_Id_=0;
    else
    AccountType_Id_=this.Search_AccountType.AccountType_Id;    
    if(this.Currency_Search.CurrencyDetails_Id==null || this.Currency_Search.CurrencyDetails_Id==undefined)
        CurrencyDetails_Id_=0;
    else
        CurrencyDetails_Id_=this.Currency_Search.CurrencyDetails_Id;
    if(this.Voucher==null || this.Voucher==undefined)
        Voucher_=0;
    else
    Voucher_=this.Voucher.Voucher_Type_Id;    
    this.issLoading=true;    
    this.Sales_Master_Service_.Load_StatementofAccount_Report(CustomerId_,moment(fromdate).format('YYYY-MM-DD'), 
    moment(todate).format('YYYY-MM-DD'),Voucher_,CurrencyDetails_Id_,
    AccountType_Id_, this.User_Type_Id, this.Login_User_Id).subscribe(Rows => {
        debugger;
    if(Rows[0].length>0)         {   
    this.Quotation_Master_Data=Rows[0];
    this.Satementofaccounts_Data=Rows[0];
    const lastElement = Rows[0][Rows[0].length - 1];   
    this.agingeport=true;
    this.fiftenvalue1="0.000";
    this.sistyvalue1="0.000";
    this.nintyvalue1="0.000";
    this.oneetyvalue1="0.000";
    this.thrisistyvalue1="0.000";
    debugger;
    if(lastElement.Dr!="0.000")
        this.thirtyvalue1 =lastElement.Dr;
    else
    this.thirtyvalue1=lastElement.Cr;
    debugger;
    this.aggingperiod=1;
    this.Total_Entries=this.Quotation_Master_Data.length;
    this.paymentdue="Your payment is due in 30 days";
    }
    if(this.Quotation_Master_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    }
    this.issLoading=false;
    },
    error => {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}

search_days60()
{
    var todate,fromdate;
    todate = moment(this.Search_ToDate).format('YYYY-MM-DD'); // Format 'Search_ToDate' using moment.js
    fromdate = new Date(new Date(todate).setDate(new Date(todate).getDate() - 60)); // Adjust date properly
    this.Search_FromDate = this.formatDate(fromdate);   
    var look_In_Date_Value=0,CustomerId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0,AccountType_Id_ = 0,Voucher_=0;    
    if(this.Search_Customer==null || this.Search_Customer==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please select an account', Type: "3" } });
        return;
    }
    else
     CustomerId_=this.Search_Customer.Client_Accounts_Id;
    if(this.Search_AccountType==null || this.Search_AccountType==undefined)
        AccountType_Id_=0;
    else
    AccountType_Id_=this.Search_AccountType.AccountType_Id;    
    if(this.Currency_Search.CurrencyDetails_Id==null || this.Currency_Search.CurrencyDetails_Id==undefined)
        CurrencyDetails_Id_=0;
    else
        CurrencyDetails_Id_=this.Currency_Search.CurrencyDetails_Id;
    if(this.Voucher==null || this.Voucher==undefined)
        Voucher_=0;
    else
    Voucher_=this.Voucher.Voucher_Type_Id;    
    this.issLoading=true;    
    this.Sales_Master_Service_.Load_StatementofAccount_Report(CustomerId_,moment(fromdate).format('YYYY-MM-DD'), 
    moment(todate).format('YYYY-MM-DD'),Voucher_,CurrencyDetails_Id_,
    AccountType_Id_, this.User_Type_Id, this.Login_User_Id).subscribe(Rows => {
        debugger;
    if(Rows[0].length>0)         {   
    this.Quotation_Master_Data=Rows[0];
    this.Satementofaccounts_Data=Rows[0];
    const lastElement = Rows[0][Rows[0].length - 1];   
    this.agingeport=true;
    this.fiftenvalue1="0.000";
    this.thirtyvalue1="0.000";
    this.nintyvalue1="0.000";
    this.oneetyvalue1="0.000";
    this.thrisistyvalue1="0.000";
    debugger;
    if(lastElement.Dr!="0.000")
        this.sistyvalue1 =lastElement.Dr;
    else
    this.sistyvalue1=lastElement.Cr;
    debugger;
    this.aggingperiod=1;
    this.Total_Entries=this.Quotation_Master_Data.length;
    this.paymentdue="Your payment is due in 60 days";
    }
    if(this.Quotation_Master_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    }
    this.issLoading=false;
    },
    error => {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}

search_days90()
{
    var todate,fromdate;
    todate = moment(this.Search_ToDate).format('YYYY-MM-DD'); // Format 'Search_ToDate' using moment.js
    fromdate = new Date(new Date(todate).setDate(new Date(todate).getDate() - 90)); // Adjust date properly
    this.Search_FromDate = this.formatDate(fromdate);   

    var look_In_Date_Value=0,CustomerId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0,AccountType_Id_ = 0,Voucher_=0;    
    if(this.Search_Customer==null || this.Search_Customer==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please select an account', Type: "3" } });
        return;
    }
    else
     CustomerId_=this.Search_Customer.Client_Accounts_Id;
    if(this.Search_AccountType==null || this.Search_AccountType==undefined)
        AccountType_Id_=0;
    else
    AccountType_Id_=this.Search_AccountType.AccountType_Id;    
    if(this.Currency_Search.CurrencyDetails_Id==null || this.Currency_Search.CurrencyDetails_Id==undefined)
        CurrencyDetails_Id_=0;
    else
        CurrencyDetails_Id_=this.Currency_Search.CurrencyDetails_Id;
    if(this.Voucher==null || this.Voucher==undefined)
        Voucher_=0;
    else
    Voucher_=this.Voucher.Voucher_Type_Id;    
    this.issLoading=true;    
    this.Sales_Master_Service_.Load_StatementofAccount_Report(CustomerId_,moment(fromdate).format('YYYY-MM-DD'), 
    moment(todate).format('YYYY-MM-DD'),Voucher_,CurrencyDetails_Id_,
    AccountType_Id_, this.User_Type_Id, this.Login_User_Id).subscribe(Rows => {
        debugger;
    if(Rows[0].length>0)         {   
    this.Quotation_Master_Data=Rows[0];
    this.Satementofaccounts_Data=Rows[0];
    const lastElement = Rows[0][Rows[0].length - 1];   
    this.agingeport=true;
    this.fiftenvalue1="0.000";
    this.thirtyvalue1="0.000";
    this.sistyvalue1="0.000";
    this.oneetyvalue1="0.000";
    this.thrisistyvalue1="0.000";
    debugger;
    if(lastElement.Dr!="0.000")
        this.nintyvalue1 =lastElement.Dr;
    else
    this.nintyvalue1=lastElement.Cr;
    debugger;
    this.aggingperiod=1;
    this.Total_Entries=this.Quotation_Master_Data.length;
    this.paymentdue="Your payment is due in 90 days";
    }
    if(this.Quotation_Master_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    }
    this.issLoading=false;
    },
    error => {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}

search_days185()
{
    var todate,fromdate;
    todate = moment(this.Search_ToDate).format('YYYY-MM-DD'); // Format 'Search_ToDate' using moment.js
    fromdate = new Date(new Date(todate).setDate(new Date(todate).getDate() - 185)); // Adjust date properly
    this.Search_FromDate = this.formatDate(fromdate);   
    var look_In_Date_Value=0,CustomerId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0,AccountType_Id_ = 0,Voucher_=0;
    
    if(this.Search_Customer==null || this.Search_Customer==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please select an account', Type: "3" } });
        return;
    }
    else
     CustomerId_=this.Search_Customer.Client_Accounts_Id;
    if(this.Search_AccountType==null || this.Search_AccountType==undefined)
        AccountType_Id_=0;
    else
    AccountType_Id_=this.Search_AccountType.AccountType_Id;    
    if(this.Currency_Search.CurrencyDetails_Id==null || this.Currency_Search.CurrencyDetails_Id==undefined)
        CurrencyDetails_Id_=0;
    else
        CurrencyDetails_Id_=this.Currency_Search.CurrencyDetails_Id;
    if(this.Voucher==null || this.Voucher==undefined)
        Voucher_=0;
    else
    Voucher_=this.Voucher.Voucher_Type_Id;    
    this.issLoading=true;    
    this.Sales_Master_Service_.Load_StatementofAccount_Report(CustomerId_,moment(fromdate).format('YYYY-MM-DD'), 
    moment(todate).format('YYYY-MM-DD'),Voucher_,CurrencyDetails_Id_,
    AccountType_Id_, this.User_Type_Id, this.Login_User_Id).subscribe(Rows => {
        debugger;
    if(Rows[0].length>0)         {   
    this.Quotation_Master_Data=Rows[0];
    this.Satementofaccounts_Data=Rows[0];
    const lastElement = Rows[0][Rows[0].length - 1];   
    this.agingeport=true;
    this.fiftenvalue1="0.000";
    this.thirtyvalue1="0.000";
    this.sistyvalue1="0.000";
    this.nintyvalue1="0.000";
    this.thrisistyvalue1="0.000";
    debugger;
    if(lastElement.Dr!="0.000")
        this.oneetyvalue1 =lastElement.Dr;
    else
    this.oneetyvalue1=lastElement.Cr;
    debugger;
    this.aggingperiod=1;
    this.Total_Entries=this.Quotation_Master_Data.length;
    this.paymentdue="Your payment is due in 185 days";
    }
    if(this.Quotation_Master_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    }
    this.issLoading=false;
    },
    error => {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}

search_days365()
{
    debugger;
    var todate,fromdate;
    todate = moment(this.Search_ToDate).format('YYYY-MM-DD'); // Format 'Search_ToDate' using moment.js
    fromdate = new Date(new Date(todate).setDate(new Date(todate).getDate() - 365)); // Adjust date properly
    this.Search_FromDate = this.formatDate(fromdate);   
    var look_In_Date_Value=0,CustomerId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0,AccountType_Id_ = 0,Voucher_=0;
    
    if(this.Search_Customer==null || this.Search_Customer==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please select an account', Type: "3" } });
        return;
    }
    else
     CustomerId_=this.Search_Customer.Client_Accounts_Id;
    if(this.Search_AccountType==null || this.Search_AccountType==undefined)
        AccountType_Id_=0;
    else
    AccountType_Id_=this.Search_AccountType.AccountType_Id;    
    if(this.Currency_Search.CurrencyDetails_Id==null || this.Currency_Search.CurrencyDetails_Id==undefined)
        CurrencyDetails_Id_=0;
    else
        CurrencyDetails_Id_=this.Currency_Search.CurrencyDetails_Id;
    if(this.Voucher==null || this.Voucher==undefined)
        Voucher_=0;
    else
    Voucher_=this.Voucher.Voucher_Type_Id;    
    this.issLoading=true;    
    this.Sales_Master_Service_.Load_StatementofAccount_Report(CustomerId_,moment(fromdate).format('YYYY-MM-DD'), 
    moment(todate).format('YYYY-MM-DD'),Voucher_,CurrencyDetails_Id_,
    AccountType_Id_, this.User_Type_Id, this.Login_User_Id).subscribe(Rows => {
        debugger;
    if(Rows[0].length>0)         {   
    this.Quotation_Master_Data=Rows[0];
    this.Satementofaccounts_Data=Rows[0];
    const lastElement = Rows[0][Rows[0].length - 1];
    this.agingeport=true;
    this.fiftenvalue1="0.000";
    this.thirtyvalue1="0.000";
    this.sistyvalue1="0.000";
    this.nintyvalue1="0.000";
    this.oneetyvalue1="0.000";
    debugger;
    if(lastElement.Dr!="0.000")
        this.thrisistyvalue1=lastElement.Dr;
    else
    this.thrisistyvalue1=lastElement.Cr;
    debugger;
    this.aggingperiod=1;
    this.Total_Entries=this.Quotation_Master_Data.length;
    this.paymentdue="Your payment is due in 365 days";
    }
    if(this.Quotation_Master_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    }
    this.issLoading=false;
    },
    error => {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    
    debugger;
}
*/
Search_Quotation()
{
    var look_In_Date_Value=0,CustomerId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0,AccountType_Id_ = 0,Voucher_=0;
    
    if(this.Search_Customer==null || this.Search_Customer==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please select an account', Type: "3" } });
        return;
    }
    else
     CustomerId_=this.Search_Customer.Client_Accounts_Id;
    if(this.Search_AccountType==null || this.Search_AccountType==undefined)
        AccountType_Id_=0;
    else
    AccountType_Id_=this.Search_AccountType.AccountType_Id;
    
    if(this.Currency_Search.CurrencyDetails_Id==null || this.Currency_Search.CurrencyDetails_Id==undefined)
        CurrencyDetails_Id_=0;
    else
        CurrencyDetails_Id_=this.Currency_Search.CurrencyDetails_Id;
    if(this.Voucher==null || this.Voucher==undefined)
        Voucher_=0;
    else
    Voucher_=this.Voucher.Voucher_Type_Id;
       debugger;   
    this.issLoading=true;    
    this.Sales_Master_Service_.Load_StatementofAccount_Report(CustomerId_,moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),Voucher_,CurrencyDetails_Id_,
    AccountType_Id_, this.User_Type_Id, this.Login_User_Id).subscribe(Rows => {   
        debugger;   
    if(Rows[0].length>0){   
       // let Newrow = [];
       // Newrow = Rows[0];
   
        var Opnbalbdr=0,opnebalcr=0,curtotaldr=0,curtotalcr=0,baldr=0,balcr=0,baltotal=0;
         Opnbalbdr = Number(Rows[0][0].Dr);
         opnebalcr = Number(Rows[0][0].Cr);
    for(var k=0;k<Rows[0].length-2;k++)
    {
      curtotaldr=curtotaldr+Number(Rows[0][k].Dr);
      curtotalcr=curtotalcr+Number(Rows[0][k].Cr);
    }
    debugger;
    Rows[0][Rows[0].length - 2].Dr = Number(curtotaldr.toFixed(3)); 
    Rows[0][Rows[0].length - 2].Cr = Number(curtotalcr.toFixed(3)); 

    baldr=curtotaldr;
    balcr=curtotalcr;
    baltotal=baldr-balcr;
    if(baltotal<0)
    {
        baltotal=-1*Number(baltotal);
        Rows[0][Rows[0].length - 1].Cr= Number(baltotal.toFixed(3));  
    }
    else
        Rows[0][Rows[0].length - 1].Dr= Number(baltotal.toFixed(3));  
    debugger;
    this.Quotation_Master_Data=Rows[0];
    this.Satementofaccounts_Data=Rows[0];

    this.Total_Entries=this.Quotation_Master_Data.length;

    const lastElement = Rows[0][Rows[0].length - 1]; 
    debugger;
     if(lastElement.Dr!="0.000")
         this.Quotation_Master_Total_Amount = lastElement.Dr;
    else
         this.Quotation_Master_Total_Amount = lastElement.Cr;

   

         this.thirtyvaluedr=0;this.thirtyvaluecr=0;this.thirtybalvalue=0;this.thirtybalvalue1="";
         this.sistyvaluedr=0;this.sistyvaluecr=0;this.sistybalvalue=0;this.sistybalvalue1="";
         this.nintyvaluedr=0;this.nintyvaluecr=0;this.nintybalvalue=0;this.nintybalvalue1="";
         this.onetwetyvaluedr=0;this.onetwetyvaluecr=0;this.onetwentybalvalue=0; this.onetwentybalvalue1="";
         this.onefiftyvaluedr=0;this.onefiftyvaluecr=0;this.onefiftybalvalue=0;this.onefiftybalvalue1="";
         this.oneeightyvaluedr=0;this.oneeightyvaluecr=0;this.oneeightybalvalue=0;this.oneeightybalvalue1="";
         this.oneeightyabovevaluedr=0;this.oneeightyabovevaluecr=0;this.oneeightyabovebalvalue=0;this.oneeightybalvalue1="";

     
        for(var i=0;i<this.Satementofaccounts_Data.length;i++)
        {
            //30
           if(Number(this.Satementofaccounts_Data[i].Date_Dif) > 0 && Number(this.Satementofaccounts_Data[i].Date_Dif) < 31) 
           {
            this.thirtyvaluedr = this.thirtyvaluedr + Number(this.Satementofaccounts_Data[i].Dr);
            this.thirtyvaluecr = this.thirtyvaluecr + Number(this.Satementofaccounts_Data[i].Cr);
           }
           this.thirtybalvalue = Number(this.thirtyvaluedr) - Number( this.thirtyvaluecr);
           this.thirtybalvalue = Number( this.thirtybalvalue.toFixed(3));
           if(Number(this.thirtybalvalue) < 0)
           {
            this.thirtybalvalue = -1* Number(this.thirtybalvalue);
            this.thirtybalvalue1 = this.thirtybalvalue.toString();
           }
           else
            this.thirtybalvalue1 = this.thirtybalvalue.toString();

           this.Quotation_Master_Total_Amount_30days = this.thirtybalvalue1.toString();
           //30-60
           if(Number(this.Satementofaccounts_Data[i].Date_Dif) > 30 && Number(this.Satementofaccounts_Data[i].Date_Dif) < 61 ) 
           {
            this.sistyvaluedr = this.sistyvaluedr + Number(this.Satementofaccounts_Data[i].Dr);
            this.sistyvaluecr = this.sistyvaluecr + Number(this.Satementofaccounts_Data[i].Cr);
           }
           this.sistybalvalue = Number(this.sistyvaluedr) - Number(this.sistyvaluecr);
           this.sistybalvalue = Number(this.sistybalvalue.toFixed(3));
           if(Number(this.sistybalvalue) < 0)
           {
            this.sistybalvalue = -1* Number(this.sistybalvalue);
            this.sistybalvalue1 = this.sistybalvalue.toString();
           }
           else
            this.sistybalvalue1 = this.sistybalvalue.toString();

           this.Quotation_Master_Total_Amount_60dyas = this.sistybalvalue1.toString();
           //60-90
           if(Number(this.Satementofaccounts_Data[i].Date_Dif) > 60 && Number(this.Satementofaccounts_Data[i].Date_Dif) < 91 ) 
           {
            this.nintyvaluedr = this.nintyvaluedr + Number(this.Satementofaccounts_Data[i].Dr);
            this.nintyvaluecr = this.nintyvaluecr + Number(this.Satementofaccounts_Data[i].Cr);
           }
           this.nintybalvalue = Number(this.nintyvaluedr)-Number(this.nintyvaluecr);
           this.nintybalvalue = Number(this.nintybalvalue.toFixed(3));
           if(Number(this.nintybalvalue) < 0)
           {
            this.nintybalvalue = -1* this.nintybalvalue;
            this.nintybalvalue1 = this.nintybalvalue.toString();
           }
           else
           this.nintybalvalue1 = this.nintybalvalue.toString();

           this.Quotation_Master_Total_Amount_90days = this.nintybalvalue1.toString();
           //90-120
            if(Number(this.Satementofaccounts_Data[i].Date_Dif) > 90 && Number(this.Satementofaccounts_Data[i].Date_Dif) < 121 ) 
           {
            this.onetwetyvaluedr = this.onetwetyvaluedr + Number(this.Satementofaccounts_Data[i].Dr);
            this.onetwetyvaluecr = this.onetwetyvaluecr + Number(this.Satementofaccounts_Data[i].Cr);
           }
           this.onetwentybalvalue = Number(this.onetwetyvaluedr) - Number(this.onetwetyvaluecr);
            this.onetwentybalvalue = Number(this.onetwentybalvalue.toFixed(3));
           if(Number(this.onetwentybalvalue) < 0)
           {
            this.onetwentybalvalue = -1* this.onetwentybalvalue;
            this.onetwentybalvalue1 = this.onetwentybalvalue.toString();
           }
           else
            this.onetwentybalvalue1 = this.onetwentybalvalue.toString();
           this.Quotation_Master_Total_Amount_120days = this.onetwentybalvalue1.toString();
          //120-150 
           if(Number(this.Satementofaccounts_Data[i].Date_Dif) > 120 && Number(this.Satementofaccounts_Data[i].Date_Dif) < 151 ) 
           {
            this.onefiftyvaluedr = this.onefiftyvaluedr + Number(this.Satementofaccounts_Data[i].Dr);
            this.onefiftyvaluecr = this.onefiftyvaluecr + Number(this.Satementofaccounts_Data[i].Cr);
           }
           this.onefiftybalvalue = Number(this.onefiftyvaluedr) - Number(this.onefiftyvaluecr);
           this.onefiftybalvalue = Number(this.onefiftybalvalue.toFixed(3));
           if(Number(this.onefiftybalvalue) < 0)
           {
            this.onefiftybalvalue =-1* this.onefiftybalvalue;
            this.onefiftybalvalue1 = this.onefiftybalvalue.toString();
           }
           else
            this.onefiftybalvalue1 = this.onefiftybalvalue.toString();
            this.Quotation_Master_Total_Amount_150days = this.onefiftybalvalue1.toString();
            //150-180
           if(Number(this.Satementofaccounts_Data[i].Date_Dif) > 150 && Number(this.Satementofaccounts_Data[i].Date_Dif) < 181 ) 
           {
            this.oneeightyvaluedr = this.oneeightyvaluedr + Number(this.Satementofaccounts_Data[i].Dr);
            this.oneeightyvaluecr = this.oneeightyvaluecr + Number(this.Satementofaccounts_Data[i].Cr);
           }
            this.oneeightybalvalue = Number(this.oneeightyvaluedr) - Number( this.oneeightyvaluecr);
            this.oneeightybalvalue = Number(this.oneeightybalvalue.toFixed(3));
           if(Number(this.oneeightybalvalue) < 0)
           {
            this.oneeightybalvalue = -1* this.oneeightybalvalue;
            this.oneeightybalvalue1 = this.oneeightybalvalue.toString();
           }
           else
           this.oneeightybalvalue1 = this.oneeightybalvalue.toString();
           this.Quotation_Master_Total_Amount_180days = this.oneeightybalvalue1.toString();
           //180>
         if(Number(this.Satementofaccounts_Data[i].Date_Dif) > 180) 
           {
            this.oneeightyabovevaluedr = this.oneeightyabovevaluedr + Number(this.Satementofaccounts_Data[i].Dr);
            this.oneeightyabovevaluecr = this.oneeightyabovevaluecr + Number(this.Satementofaccounts_Data[i].Cr);
           }
           this.oneeightyabovebalvalue = Number(this.oneeightyabovevaluedr) - Number(this.oneeightyabovevaluecr);
           this.oneeightyabovebalvalue = Number(this.oneeightyabovebalvalue.toFixed(3));
           if(this.oneeightyabovebalvalue < 0)
           {
            this.oneeightyabovebalvalue = -1* this.oneeightyabovebalvalue;
            this.oneeightyabovebalvalue1 = this.oneeightyabovebalvalue.toString();
           }
           else
           this.oneeightyabovebalvalue1 = this.oneeightyabovebalvalue.toString();
           this.Quotation_Master_Total_Amount_above180days = this.oneeightyabovebalvalue1.toString();        
        }
        this.Quotation_Master_Total_Overdue=Number(this.thirtybalvalue)+Number(this.sistybalvalue)+Number(this.nintybalvalue)+Number(this.onetwentybalvalue)+Number(this.onefiftybalvalue)+Number(this.oneeightybalvalue)+Number(this.oneeightyabovebalvalue);
        this.Quotation_Master_Total_Overdue= Number(this.Quotation_Master_Total_Overdue.toFixed(3));
        this.Quotation_Master_Total_Overdue1= this.Quotation_Master_Total_Overdue.toString();    
    this.agingeport=false;
    this.fiftenvalue1="0.000";
    this.thirtyvalue1="0.000";
    this.sistyvalue1="0.000";
    this.nintyvalue1="0.000";
    this.oneetyvalue1="0.000";
    this.thrisistyvalue1="0.000";
    this.aggingperiod=0;    
    }
    if(this.Quotation_Master_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    }
    this.issLoading=false;
    },
    error => {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}

daysrangecalculation()
{
    
}

display_Customer(Client_Accounts_e: Client_Accounts)
{
    if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
}

Print_Click()
{       

    debugger;
        if(this.aggingperiod==1)
            this.agingeport=true;
        else
        this.agingeport=false;
        debugger;
        this.currentDate = this.formatDate(Date.now())
        this.FromDate = this.formatDate(this.Search_FromDate)
        this.ToDate = this.formatDate(this.Search_ToDate)
        
        setTimeout(()=>{
        let popupWinindow
        let innerContents = document.getElementById("Print_Div1").innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();  
        })
  
}

Export() {
    debugger
    this.Receipt_Voucher_Service_.exportExcel(
      this.Quotation_Master_Data,
      "Statement of Account Report"
    );
  }

}
