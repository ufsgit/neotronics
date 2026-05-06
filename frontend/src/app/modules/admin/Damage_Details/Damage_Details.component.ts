import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sales_Master_Service } from '../../../services/Sales_Master.Service';
import { Damage_Master_Service } from '../../../services/Damage_Master.Service';
import { Key_Value_Service } from '../../../services/Key_Value.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Item } from '../../../models/Item';
import { User_Details_Service } from '../../../services/User_Details.Service';
import { HttpClient } from '@angular/common/http';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { Damage_Master } from '../../../models/Damage_Master';
import { Damage_Details } from '../../../models/Damage_Details';
import { Stock } from '../../../models/Stock';
import {Key_Value } from '../../../models/Key_Value';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
parse: {
     dateInput: 'DD/MM/YYYY',
    },
  display: {dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY',  dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',},
};
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';@Component({
    selector: 'app-Damage_Details',
    templateUrl: './Damage_Details.component.html',
styleUrls: ['./Damage_Details.component.css'],
providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})
export class Damage_DetailsComponent implements OnInit {
Damage_Master_Data:[]
Damage_Master_Index:number;


    Barcode_: Stock = new Stock();
    Barcode_Temp_: Stock = new Stock();
    Item_Temp_: Stock = new Stock();

Stock_Data:Stock[]
Stock_:Stock= new Stock();
Stock_Temp:Stock= new Stock();

Damage_Master_Name_Search="";
Entry_View:boolean=true;
myInnerHeight: number;
myHeight: number;
EditIndex: number;
 Total_Entries: number=0;
Data:string;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Damage_Master_Edit:boolean;
Damage_Master_Save:boolean;
Damage_Master_Delete:boolean;
year:any;
month:any;
day:any;
date:any;
isLoading=false; 
Damage_Edit_Index:number=-1;
Login_Id:string;
From_Date:Date=new Date();
To_Date:Date=new Date();
Barcode_Data:Damage_Details[];
Search_FromDate: Date = new Date();
Search_ToDate: Date = new Date();
Is_Expiry_Show:boolean=true;
Look_In_Date:Boolean=true;
Employee_Edit:boolean=false;
Employee_:Client_Accounts= new Client_Accounts();
Employee_Data:Client_Accounts[]
Employee_Name:string;
Employee_Id:number;

Key_Value_Data:Key_Value[]
Key_Value_Name:string="";
    constructor(public Sales_Master_Service_:Sales_Master_Service,public Damage_Master_Service_:Damage_Master_Service,public Key_Value_Service_:Key_Value_Service,public User_Details_Service_:User_Details_Service,private http: HttpClient, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{     
        this.Employee_Name=localStorage.getItem('Employee_Name');
        this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
        this.Login_Id=localStorage.getItem('Login_User');
        this.From_Date=this.New_Date(this.From_Date);
        this.To_Date=this.New_Date(this.To_Date);
        this.Permissions = Get_Page_Permission(68);
         
        if(this.Permissions==undefined || this.Permissions==null)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login');
        }
        else
        {
        this.Damage_Master_Edit=this.Permissions.Edit;
        this.Damage_Master_Save=this.Permissions.Save;
        this.Damage_Master_Delete=this.Permissions.Delete;
        this.Page_Load();
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
    this.myHeight = (window.innerHeight);
    this.myHeight = this.myHeight - 400;
    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
    this.Entry_View=false;
  //  this.Search_Key_Value();
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
Search_Damage_Report()
{
    var look_In_Date_Value = 0, ItemId=0;
if (this.Look_In_Date == true )
look_In_Date_Value = 1;
// this.issLoading=true;
    if (this.Stock_.ItemId == undefined || this.Stock_ == undefined || this.Stock_==null)
        ItemId=0
else
        ItemId = this.Stock_.ItemId;
        
    this.Damage_Master_Service_.Search_Damage_Report(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'), look_In_Date_Value, ItemId).subscribe(Rows => {
        
        this.Damage_Master_Data=Rows[0];
 this.issLoading=false;
 
this.Total_Entries=this.Damage_Master_Data.length;
if(this.Damage_Master_Data.length==0)
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

Search_Barcode_Typeahead(event: any)
{
      var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
        {
        this.issLoading = true;
        this.Sales_Master_Service_.Search_Barcode_Typeahead(Value).subscribe(Rows => {
            if (Rows != null) 
            {
                this.Barcode_Data = Rows[0];
            }
            this.issLoading = false;
        },
        Rows => {     
            this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
    }
 }
 display_Barcode(Barcode_E: Stock) 
 {
    if (Barcode_E) { return Barcode_E.Barcode; }
}
Search_Item_Typeahead(event: any)
{
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
        {
            this.issLoading = true;
    this.Sales_Master_Service_.Search_Item_Typeahead(Value).subscribe(Rows => {
  
        if (Rows != null) {
            this.Stock_Data = Rows[0];
        }
        this.issLoading = false;
    },
        Rows => {             
            this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
    }
    }
display_Item(Stock_e: Stock)
{
     if (Stock_e) { return Stock_e.ItemName; }
}
}

