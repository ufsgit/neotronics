import { Component, OnInit,Input,Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge, from } from 'rxjs';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.Service';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.Service';
import { Stock_Service } from '../../../services/Stock.Service';
import { Item_Group_Service } from '../../../services/Item_Group.Service';
import { Item } from '../../../models/Item';
import { Sale_Unit } from '../../../models/Sale_Unit';
import { Sale_Unit_Service } from '../../../services/Sale_Unit.Service';
import { User_Details_Service } from '../../../services/User_Details.Service';
import { Item_Group } from '../../../models/Item_Group';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Voucher_Type } from '../../../models/Voucher_Type';
import { Client_Accounts} from '../../../models/Client_Accounts';
import { Contra_Entry_Service } from '../../../services/Contra_Entry.Service';
import { Stock_Add_Master_Service } from '../../../services/Stock_Add_Master.Service';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component'
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
        parse: { dateInput: 'LL',},
        display: {
          dateInput: 'LL', monthYearLabel: 'MMM YYYY',dateA11yLabel: 'LL',monthYearA11yLabel: 'MMMM YYYY',
        },
      };
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Stock } from '../../../models/Stock';

@Component({
        selector: 'app-Stock_Report',
        templateUrl: './Stock_Report.component.html',
        styleUrls: ['./Stock_Report.component.css'],
        providers: [
                {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
                {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
              ],
})
export class Stock_ReportComponent implements OnInit {
        Entry_View:boolean=false;
        myInnerHeight: number;
        Entry_View_Edit:boolean=false;
        EditIndex: number;

        month: any;
        year: any;
        date: any;
        d: Date;
        day: any;
        Total_Entries:Number=0;   
        color = 'primary';     
        Menu_Id:number=24;
        mode = 'indeterminate';
        value = 50;
        issLoading: boolean;
        array:any;
        Total_Entry: number=0;

        Client_Accounts_Data:Client_Accounts[]
        Accounts_Data:any;
        Sale_Unit:Sale_Unit=new Sale_Unit();
        Search_FromDate:Date=new Date();
        Search_ToDate:Date=new Date();
        Voucher_Type_Data:Voucher_Type[];
        Sale_Unit_Data:Sale_Unit[];
        Barcode_Search:"";
        Sale_Unit_Temp:Sale_Unit=new Sale_Unit();
       
        Stock_:Stock= new Stock();
        Item_Data:Item[]
        Item_:Item= new Item();
     
        Employee_:Client_Accounts= new Client_Accounts();
        Employee_Data:Client_Accounts[]
        Item_Group_Data:Item_Group[]
        Edit_Item_Group:Item_Group=new Item_Group();
        Item_Group_:Item_Group=new Item_Group();
        Item_Group_Temp:Item_Group=new Item_Group();
        Item_Temp:Item=new Item();
        Edit_Item:Item=new Item();
        Voucher_Type_Search:Voucher_Type=new Voucher_Type();
        Voucher_Type_Temp:Voucher_Type=new Voucher_Type();
        Search_Date:Date=new Date();
        
        Login_User:string="0";
        Employee_Name:string;
        Employee_Id:number;
        User_Type:number;
        Employee_Edit:boolean=false;

        Is_Date_Check:Boolean=true;
constructor(public Receipt_Voucher_Service_:Receipt_Voucher_Service,public User_Details_Service_:User_Details_Service,public Sale_Unit_Service_:Sale_Unit_Service,public Stock_Service_:Stock_Service, public Stock_Add_Master_Service_:Stock_Add_Master_Service,public Item_Group_Service_:Item_Group_Service,public Journal_Entry_Service_:Journal_Entry_Service,public ContraEntry_Service_:Contra_Entry_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{  
        this.Search_FromDate=new Date();
        this.User_Type=Number(localStorage.getItem('User_Type'));
        this.Employee_Name=localStorage.getItem('Employee_Name');
        this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
        this.Login_User=localStorage.getItem("Login_User");
        this.array=Get_Page_Permission(this.Menu_Id);
        if(this.array==undefined || this.array==null)
        {
        }
        else 
        {
        this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 300;      
        this.Search_FromDate=new Date();
        this.Search_ToDate=new Date();
        this.Search_Date=this.New_Date(this.Search_Date);
        this.Search_Date=new Date();
        this.Get_Voucher_Type();
        this.Get_Stock_Report();
        this.Search_Sale_Unit();
        this.Entry_View=true;
        if (this.User_Type==2){
        this.Employee_.Client_Accounts_Id=this.Employee_Id;
        this.Employee_.Client_Accounts_Name=this.Employee_Name;
        this.Employee_Edit=true;
}
 }
Close_Click()
{
this.Entry_View = true;
this.Entry_View_Edit=false;
}
trackByFn(index, item) 
{
    return index;
}
Edit_Stock_Report(Stock_e:Stock,index)
{   
    this.Entry_View_Edit=true;
    this.Entry_View=false;
    this.Stock_=Stock_e;
    this.Stock_.Stock_Id=Stock_e.Stock_Id;
    this.Stock_.Barcode=Stock_e.Barcode;
    this.Stock_.Quantity=Stock_e.Quantity;
    this.Stock_.SaleRate=Stock_e.SaleRate;
    this.Stock_.PurchaseRate=Stock_e.PurchaseRate;
    this.Stock_.MRP=Stock_e.MRP;
   
    this.Item_Temp.Item_Id=Stock_e.ItemId;
    this.Item_Temp.Item_Name=Stock_e.ItemName;
    this.Edit_Item=Object.assign({},this.Item_Temp);
    this.Item_Group_Temp.Item_Group_Id=Stock_e.GroupId;
    this.Item_Group_Temp.Item_Group_Name=Stock_e.GroupName;
    this.Edit_Item_Group=Object.assign({},this.Item_Group_Temp);

    for (var i = 0; i < this.Sale_Unit_Data.length; i++) {
        if (Stock_e.UnitId == this.Sale_Unit_Data[i].Sale_Unit_Id)
        this.Sale_Unit = this.Sale_Unit_Data[i];  
    }
  this.Stock_=Object.assign({},Stock_e);    
}
Employee_Typeahead(event: any)
 {
    var Value = "";  
     if (event.target.value == "")
         Value = undefined;
     else
         Value = event.target.value;
         {        
             this.issLoading = true;
     this.User_Details_Service_.Employee_Typeahead(2,Value).subscribe(Rows => {
         if (Rows != null) {
             this.Employee_Data = Rows[0];
              }
              this.issLoading = false;
     },
         Rows => {         
             this.issLoading = false;
     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
         });
     }
}
display_Employee(Client_Accounts_e: Client_Accounts)
 {
     if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
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
Search_Sale_Unit()
    {
        this.Sale_Unit_Service_.Search_Sale_Unit('').subscribe(Rows => {
        this.Sale_Unit_Data=Rows[0];
        this.Total_Entries=this.Sale_Unit_Data.length;
        this.Sale_Unit_Temp.Sale_Unit_Id = 0;
        this.Sale_Unit_Temp.Sale_Unit_Name = "Select";
        this.Sale_Unit_Data.unshift(this.Sale_Unit_Temp);
        this.Sale_Unit = this.Sale_Unit_Data[0];
     if(this.Sale_Unit_Data.length==0)
        {
          const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
         }
         },
       Rows => {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
}
Get_Voucher_Type() 
        {
        this.Receipt_Voucher_Service_.Get_Voucher_Type().subscribe(Rows => {      
        if(Rows!=undefined)
        {
        this.Voucher_Type_Data = Rows[0];
        this.Voucher_Type_Temp.Voucher_Type_Id = 0;
        this.Voucher_Type_Temp.Voucher_Type_Name = "All";
        this.Voucher_Type_Data.unshift(Object.assign({},this.Voucher_Type_Temp));
        this.Voucher_Type_Search = this.Voucher_Type_Data[0];
        }
        },
        Rows => 
        {
        //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
 }
Save_Stock_Report()
{
        if (this.Stock_.PurchaseRate == undefined || this.Stock_.PurchaseRate == null ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Purchase Rate', Type: "3" } });
        }
        else if(this.Stock_.SaleRate==undefined||this.Stock_.SaleRate==null)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter The SaleRate', Type: "3" } });
        }
        else if(this.Stock_.MRP==undefined||this.Stock_.MRP==null)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter The MRP', Type: "3" } });
        }
   else
{          
document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
this.Stock_Service_.Save_Stock_InStockReport(this.Stock_).subscribe(Save_status => {       
Save_status=Save_status[0];
if(Number(Save_status[0].Stock_Id_)>0)
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
}
Get_Client_Accounts_Typeahead(event: any)
{    
        var Value = "";
        if (event.target.value == "")
        Value = undefined;
        else
        Value = event.target.value;
        this.Receipt_Voucher_Service_.Get_Client_Accounts_Typeahead(Value).subscribe(Rows => {
        if (Rows != null) {
        this.Client_Accounts_Data = Rows[0];
        }
        },
        Rows => { 
                this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
      
}
Search_Item_Typeahead(event: any)
{
  var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
     // if(this.Item_Data==undefined || this.Item_Data.length==0)
        {
            this.issLoading = true;
    this.Stock_Add_Master_Service_.Search_Item_Typeahead(Value).subscribe(Rows => {
  
        if (Rows != null) {
            this.Item_Data = Rows[0];
        }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
    }
    }
Edit_Item_Name_Typeahead(event: any)
{  
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;  
       // if(this.Item_Data==undefined || this.Item_Data.length==0)
        {
            this.issLoading = true;
    this.Stock_Add_Master_Service_.Search_Item_Typeahead(Value).subscribe(Rows => {
  
        if (Rows != null) {
            this.Item_Data = Rows[0];   
        }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
    }
    }
display_Item(Item_e: Item) 
{
 if (Item_e) { return Item_e.Item_Name; }
 }
Edit_display_Item(Item_e: Item) 
{
  if (Item_e) { return Item_e.Item_Name; }
}
Search_Item_Group_Typeahead(event: any)
{
  var Value = "";
        if (event.target.value == "")
                Value = undefined;
        else
                Value = event.target.value;                      
        // if(this.Item_Data==undefined || this.Item_Data.length==0)
                {
                this.issLoading = true;
        this.Item_Group_Service_.Search_Item_Group(Value).subscribe(Rows => {
         
                if (Rows != null) {
                this.Item_Group_Data = Rows[0];
                }
                this.issLoading = false;
        },
                Rows => {
                this.issLoading = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                });
        }
        }

 Edit_ItemGroup_Group_Typehead(event: any)
        {

        var Value = "";
        if (event.target.value == "")
                Value = undefined;
        else
                Value = event.target.value;
    {
                this.issLoading = true;
        this.Item_Group_Service_.Search_Item_Group(Value).subscribe(Rows => {
         
                if (Rows != null) {
                this.Item_Group_Data = Rows[0];
                }
                this.issLoading = false;
        },
                Rows => {
                this.issLoading = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                });
        }
}

display_Item_Group(Item_Group_e: Item_Group)
 {
if (Item_Group_e) { return Item_Group_e.Item_Group_Name; }
}
Edit_display_Item_Group(Item_Group_e: Item_Group) 
{
  if (Item_Group_e) { return Item_Group_e.Item_Group_Name; }
 }    
Get_Stock_Report()
    {  
        
        var look_In_Date_Value=0,Item_Id_=0,Item_Group_Id_=0,Barcode_Search_='undefined',   Employee_Id=0; 
        if (this.Is_Date_Check == true )
         look_In_Date_Value = 1;
        if(this.Item_.Item_Id==undefined ||  this.Item_==undefined || this.Item_==null)
        Item_Id_=0
        else
        Item_Id_=this.Item_.Item_Id;

        if(this.Item_Group_.Item_Group_Id==undefined ||  this.Item_Group_==undefined || this.Item_Group_==null)
        Item_Group_Id_=0
        else
        Item_Group_Id_=this.Item_Group_.Item_Group_Id;

        if (this.Barcode_Search != undefined && this.Barcode_Search != null && this.Barcode_Search !='')
        Barcode_Search_ = this.Barcode_Search;

        if(this.Employee_.Client_Accounts_Id==undefined ||  this.Employee_==undefined || this.Employee_==null)
        Employee_Id=0
        else
        Employee_Id=this.Employee_.Client_Accounts_Id;
    this.issLoading=true; 
this.Receipt_Voucher_Service_.Get_Stock_Report(Barcode_Search_,Item_Id_,Item_Group_Id_,Employee_Id,look_In_Date_Value).subscribe(Rows =>        
        {
              
        this.Accounts_Data=Rows[0];
this.Total_Entry=this.Accounts_Data.length;

        if(this.Accounts_Data.length==0)
        {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
        }
        this.issLoading=false;
        },
        Rows => { 
                this.issLoading=false;
         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
       
        }
}    


