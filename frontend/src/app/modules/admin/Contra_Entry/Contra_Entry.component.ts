import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Contra_Entry_Service } from '../../../services/Contra_Entry.Service';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.Service';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { Contra_Entry } from '../../../models/Contra_Entry';
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
import { MatDialog } from '@angular/material/dialog';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Contra_Entry',
templateUrl: './Contra_Entry.component.html',
styleUrls: ['./Contra_Entry.component.css'],

providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},],
})
export class Contra_EntryComponent implements OnInit {
Contra_Entry_Data:Contra_Entry[]
Contra_Entry_:Contra_Entry= new Contra_Entry();
Contra_Entry_Name_Search:string;

FromAccount_:Client_Accounts=new Client_Accounts();
Client_Accounts_Data:Client_Accounts[]

ToAccount_:Client_Accounts=new Client_Accounts();
Search_FromDate:Date=new Date();
Search_ToDate:Date=new Date();
FromAccount_Search:Client_Accounts=new Client_Accounts();
ToAccount_Search:Client_Accounts=new Client_Accounts();
Voucher_No_search:number;
FromAccount_Temp:Client_Accounts=new Client_Accounts();
ToAccount_Temp:Client_Accounts=new Client_Accounts();

Look_In_Date:Boolean=false;
month: any;
day: any;
date:any;
year: any;
Login_User:string="0";


Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Contra_Entry_Edit:boolean;
Contra_Entry_Save:boolean;
Contra_Entry_Delete:boolean;
Total_Amounts:number=0;
    User_Type_Id: number;
    User_Type:string;
constructor(public Receipt_Voucher_Service_:Receipt_Voucher_Service,public Contra_Entry_Service_:Contra_Entry_Service,public Journal_Entry_Service_:Journal_Entry_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Login_User=localStorage.getItem("Login_User"); 
this.User_Type_Id=Number(localStorage.getItem('User_Type_Id'));
this.User_Type=(localStorage.getItem('User_Type'));

this.Permissions = Get_Page_Permission(18);
if(this.Permissions==undefined || this.Permissions==null)
{1
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Contra_Entry_Edit=this.Permissions.Edit;
this.Contra_Entry_Save=this.Permissions.Save;
this.Contra_Entry_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
this.Search_FromDate=this.New_Date(this.Search_FromDate);
this.Search_ToDate=this.New_Date(this.Search_ToDate);
this.Clr_Contra_Entry();
//this.Search_Contra_Entry();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Contra_Entry();
}
Close_Click()
{
this.Clr_Contra_Entry();
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
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
 Clr_Contra_Entry()
 {
    this.Contra_Entry_.Contra_Entry_Id=0;
    this.Contra_Entry_.Date=new Date();
    this.Contra_Entry_.Date=this.New_Date(this.Contra_Entry_.Date);
    this.Contra_Entry_.Voucher_No=null;
    this.Contra_Entry_.From_Account_Id=0;
    this.Contra_Entry_.Amount=null;
    this.Contra_Entry_.To_Account_Id=0;
    this.Contra_Entry_.PaymentModeName='';
    this.Contra_Entry_.User_Id=0;
    this.ToAccount_=null;
    this.FromAccount_=null;
    this.Contra_Entry_.Description="";
    this.Contra_Entry_.Payment_Status=0;

}
//  Get_Client_Accounts_Typeahead(event: any)
//     {
             
//             this.issLoading=true;
//     var Value = "";
//     if (event.target.value == "")
//     Value = undefined;
//     else
//     Value = event.target.value;
//     this.Receipt_Voucher_Service_.Get_Client_Accounts_Typeahead(Value).subscribe(Rows => {
//     if (Rows != null) {
//     this.Client_Accounts_Data = Rows[0];
//     }
//     this.issLoading=false;
//     },
//     Rows => { 
//         this.issLoading=false;
//      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
//     }

 Get_Client_Accounts_Typeahead(event: any)
 {
      
     this.issLoading=true;
 var Value = "";
 if (event.target.value == "")
 Value = undefined;
 else
 Value = event.target.value;
 this.Journal_Entry_Service_.Accounts_Typeahead('4,5,11',Value).subscribe(Rows => {
      
 if (Rows != null) {
 this.Client_Accounts_Data = Rows[0];
 }    
     this.issLoading=false;
 },
 Rows => {    
         this.issLoading=false;
 });
 }

 display_FromAccount(Client_Accounts_e: Client_Accounts) 
 { 
 if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
}
Search_Contra_Entry()
{ 
    var look_In_Date_Value=0,ClientAccount=0,Voucher_No_search_=0,ClientAccounts_Id=0;
    if (this.Look_In_Date == true )
    look_In_Date_Value = 1;
    if (this.ToAccount_Search != undefined && this.ToAccount_Search!=null)
    if (this.ToAccount_Search.Client_Accounts_Id != undefined && this.ToAccount_Search.Client_Accounts_Id != null)
    ClientAccounts_Id = this.ToAccount_Search.Client_Accounts_Id;
    // if (this.FromAccount_Search != undefined && this.FromAccount_Search!=null)
    // if (this.FromAccount_Search.Client_Accounts_Id != undefined && this.FromAccount_Search.Client_Accounts_Id != null)
    // ClientAccount= this.FromAccount_Search.Client_Accounts_Id;
    if (this.Voucher_No_search != undefined && this.Voucher_No_search != null && this.Voucher_No_search != 0)
    Voucher_No_search_ = this.Voucher_No_search;
                 
    this.issLoading=true;
    this.Contra_Entry_Service_.Search_Contra_Entry(moment(this.Search_FromDate).format('YYYY-MM-DD'),moment(this.Search_ToDate).format('YYYY-MM-DD'),ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value,
this.User_Type_Id, this.Login_User).subscribe(Rows => {
                 
    this.Contra_Entry_Data=Rows[0];
    this.Total_Entries=this.Contra_Entry_Data.length;
    for (var i = 0; i < this.Contra_Entry_Data.length; i++) {
        this.Total_Amounts =
            Number(this.Total_Amounts) +
            Number(this.Contra_Entry_Data[i].Amount);
    }
    this.Total_Amounts =Number(this.Total_Amounts.toFixed(3));
    if(this.Contra_Entry_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
    }
    this.issLoading=false;
    },
    Rows => {
        this.issLoading=false;
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
  

}
Delete_Contra_Entry(Contra_Entry_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
    this.Contra_Entry_Service_.Delete_Contra_Entry(Contra_Entry_Id).subscribe(Delete_status => {
         
       console.log( Delete_status[0][0].Contra_Entry_Id_)
    if(Delete_status[0][0].Contra_Entry_Id_>0){
        this.Total_Entries=this.Total_Entries-1;
        this.Contra_Entry_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    }
    else
    {
   
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Eroor occured',Type:"2"}});
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
Save_Contra_Entry()
{
  
     

    if (this.FromAccount_ == undefined || this.FromAccount_.Client_Accounts_Id == 0 || this.FromAccount_ == null||this.FromAccount_.Client_Accounts_Id==undefined) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The From account', Type: "3" } });
        }
        else if(this.Contra_Entry_.Amount==undefined||this.Contra_Entry_.Amount==null||this.Contra_Entry_.Amount==undefined||this.Contra_Entry_.Amount==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Amount', Type: "3" } });
        }
        else if(this.ToAccount_==undefined||this.ToAccount_==null||this.ToAccount_.Client_Accounts_Id==undefined||this.ToAccount_.Client_Accounts_Id==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The To Account', Type: "3" } });
        }
        else
    {

        this.Contra_Entry_.User_Id=Number(this.Login_User);
        this.Contra_Entry_.From_Account_Id=this.FromAccount_.Client_Accounts_Id;
        this.Contra_Entry_.To_Account_Id=this.ToAccount_.Client_Accounts_Id;
        this.Contra_Entry_.Date=this.New_Date(new Date(moment(this.Contra_Entry_.Date).format('YYYY-MM-DD')));
    
    console.log("Before Contra Entry Save API call");
    this.issLoading = true;

    this.Contra_Entry_Service_.Save_Contra_Entry(this.Contra_Entry_)
    .pipe(
      finalize(() => {
        console.log("Contra Entry Save Finalize executed");
        this.issLoading = false;
        const saveButton = document.getElementById("Save_Button");
        if (saveButton) saveButton.hidden = false;
      })
    )
    .subscribe({
      next: (Save_status) => {
        console.log("Contra Entry Save API Response:", Save_status);
        
        if (!Save_status || !Save_status[0]) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Invalid server response', Type: "2" }
          });
          return;
        }

        if (Number(Save_status[0][0].Contra_Entry_Id_) > 0) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Saved Successfully', Type: "false" }
          });
          this.Clr_Contra_Entry();
          this.Close_Click();
        } else {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Error Occured', Type: "2" }
          });
        }
      },
      error: (error) => {
        console.error("Contra Entry Save API ERROR:", error);
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
        });
      }
    });
}
}
Edit_Contra_Entry(Contra_Entry_e:Contra_Entry,index)
{
this.Entry_View=true;
this.Contra_Entry_=Contra_Entry_e;
this.Contra_Entry_=Object.assign({},Contra_Entry_e);


this.FromAccount_Temp.Client_Accounts_Id=Contra_Entry_e.From_Account_Id;
this.FromAccount_Temp.Client_Accounts_Name=Contra_Entry_e.FromAccount_Name;
this.FromAccount_=this.FromAccount_Temp;

this.ToAccount_Temp.Client_Accounts_Id=Contra_Entry_e.To_Account_Id;
this.ToAccount_Temp.Client_Accounts_Name=Contra_Entry_e.ToAccount_Name;
this.ToAccount_=this.ToAccount_Temp;
}
}

