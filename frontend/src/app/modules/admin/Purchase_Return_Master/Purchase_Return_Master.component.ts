import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Purchase_Master_Service } from '../../../services/Purchase_Master.Service';
import { purchase_return_master_Service } from '../../../services/Purchase_Return_Master.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { purchase_return_master } from '../../../models/Purchase_Return_Master';
import { Purchase_Return_Details } from '../../../models/Purchase_Return_Details';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { Bill_Type } from '../../../models/Bill_Type';
import { Item } from '../../../models/Item';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: { dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY', },
};
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
 @Component({
selector: 'app-purchase_return_master',
templateUrl: './purchase_return_master.component.html',
styleUrls: ['./purchase_return_master.component.css'],
providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },],
})

export class purchase_return_masterComponent implements OnInit {
purchase_return_master_Data:purchase_return_master[]
purchase_return_master_:purchase_return_master= new purchase_return_master();
purchase_return_master_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
myHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
purchase_return_master_Edit:boolean;
purchase_return_master_Save:boolean;
purchase_return_master_Delete:boolean;

To_Stock_Data:Client_Accounts[]
To_Stock_:Client_Accounts= new Client_Accounts();
To_Stock_Temp_:Client_Accounts=new Client_Accounts();

Supplier_Data:Client_Accounts[]
Supplier_:Client_Accounts= new Client_Accounts();
Search_Supplier:Client_Accounts= new Client_Accounts();
Supplier_Temp:Client_Accounts= new Client_Accounts();

Bill_Type_Data:Bill_Type[]
Bill_Type_:Bill_Type= new Bill_Type();
Bill_Type_Temp:Bill_Type= new Bill_Type();

year:any;
month:any;
day:any;
date:any;
isLoading=false; 


Barcode_Data:Purchase_Return_Details[];
Item_Data:Purchase_Return_Details[]
Item_:Purchase_Return_Details= new Purchase_Return_Details();
Barcode_:Purchase_Return_Details= new Purchase_Return_Details();
Barcode_Temp_:Purchase_Return_Details= new Purchase_Return_Details();
Item_Temp:Purchase_Return_Details= new Purchase_Return_Details();

Purchase_Return_Details_:Purchase_Return_Details=new Purchase_Return_Details();
Purchase_Return_Details_Data:Purchase_Return_Details[];

Purcahse_Master_Index:number;
Purchase_Return_Details_Index:number=-1;
CGST_SUM:number=0;
SGST_SUM:number=0;
IGST_Sum:number=0;
GST_Sum:number=0;
Tot_discount:number=0;
Tot_Cess:number=0;
Tot_Amount:number=0;
Tot_Net:number=0;
Tot_Gross:number=0;
Tot_Taxamt:number=0;

Edit_CGST:number=0;
Edit_SGST:number=0;
Edit_GST:number=0;
Edit_IGST:number=0;
Edit_Discount:number=0;
Edit_Cess:number=0;
Edit_Totamt:number=0;
Edit_Net:number=0;
Edit_Gross:number=0;
Edit_Tax:number=0;
Amount_In_Words:string;

Search_FromDate: Date = new Date();
Search_ToDate: Date = new Date();
Look_In_Date:Boolean=true;
Voucher_Number:number=0;
Search_Customer:Client_Accounts= new Client_Accounts();

Is_Expiry_Show:boolean=true;
     constructor(public Purchase_Master_Service_: Purchase_Master_Service,public purchase_return_master_Service_:purchase_return_master_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(4);
if(this.Permissions==undefined || this.Permissions==null)
    {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login');
    }
    else
    {
        this.purchase_return_master_Edit=this.Permissions.Edit;
        this.purchase_return_master_Save=this.Permissions.Save;
        this.purchase_return_master_Delete=this.Permissions.Delete;
        this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.myHeight = (window.innerHeight);
    this.myHeight = this.myHeight -400;
    this.Search_FromDate = this.New_Date(this.Search_FromDate);
    this.Search_ToDate = this.New_Date(this.Search_ToDate);
    this.purchase_return_master_.PurchaseDate = new Date(); 
    this.Entry_View=false;
    this.Load_Bill_Type();
    this.Clr_purchase_return_master();
    this.Clr_Purchase_Return_Details();
}
Create_New()
{
  
    this.Entry_View = true;
    this.Clr_purchase_return_master();
    this.Clr_Purchase_Return_Details();
    this.Purchase_Return_Details_Data=[];
}
Close_Click()
{
    this.Entry_View = false;
    this.Is_Expiry_Show=true;
    this.Purchase_Return_Details_Data=[];
   
    this.Clr_purchase_return_master();
    this.Clr_Purchase_Return_Details();
    this.Search_purchase_return_master();
}
trackByFn(index, item) 
{
    return index;
}





Clr_purchase_return_master()
{

   this.purchase_return_master_.Purchase_Return_Details_Id=0;
   this.purchase_return_master_.Account_Party_Id=0;
   this.purchase_return_master_.PurchaseDate = new Date();
   this.purchase_return_master_.PurchaseDate = this.New_Date(this.purchase_return_master_.PurchaseDate);
   this.purchase_return_master_.Discount=0;
   this.purchase_return_master_.InvoiceNo="";
   this.purchase_return_master_.Roundoff=0;
   this.purchase_return_master_.TotalAmount=0;
   this.purchase_return_master_.TotalDiscount=0;
   this.purchase_return_master_.TaxableAmount=0;
   this.purchase_return_master_.GrossTotal=0;
   this.purchase_return_master_.NetTotal=0;
   this.purchase_return_master_.BillType=0;
   this.purchase_return_master_.Description="";
   this.purchase_return_master_.User_Id=0;
   this.Supplier_=null;
   this.purchase_return_master_.Address1="";
   this.purchase_return_master_.Address2="";
    this.purchase_return_master_.Address3 = "";
    this.purchase_return_master_.Bill_No = "";
   this.purchase_return_master_.Address4="";
    this.Tot_discount=0;
    this.Tot_Amount=0;
    this.Tot_Net= 0;
    this.Tot_Gross=0;
    this.CGST_SUM=0;
    this.SGST_SUM= 0;
    this.IGST_Sum=0;
    this.GST_Sum=0;
     
   if(this.Bill_Type_Data!=undefined && this.Bill_Type_Data!=null)
   this.Bill_Type_=this.Bill_Type_Data[0];

   
}

Clr_Purchase_Return_Details()
{
this.Purchase_Return_Details_Index=-1;
this.Purchase_Return_Details_.Purchase_Return_Details_Id=0;
this.Purchase_Return_Details_.Purchase_Return_Master_Id=0;
this.Purchase_Return_Details_.ItemId=0;
this.Purchase_Return_Details_.ItemName="";
this.Purchase_Return_Details_.GroupId=0;
this.Purchase_Return_Details_.GroupName="";
this.Purchase_Return_Details_.UnitId=0;
this.Purchase_Return_Details_.UnitName="";
    this.Purchase_Return_Details_.StockId = 0;
this.Purchase_Return_Details_.HSNMasterId=0;
this.Purchase_Return_Details_.HSNCODE="";
this.Purchase_Return_Details_.Quantity=0;
this.Purchase_Return_Details_.Discount=0;
this.Purchase_Return_Details_.NetValue=0;
this.Item_=null;
this.Edit_CGST=0;
this.Edit_SGST=0;
this.Edit_IGST=0;
this.Edit_GST=0;
this.Edit_Discount=0;
this.Edit_Totamt=0;
this.Edit_Net=0;
this.Edit_Gross=0;
}
New_Date(Date_) {
        this.date = Date_;
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        if (this.month < 10) {
            this.month = "0" + this.month;
        }
        this.day = this.date.getDate().toString();
        if (Number.parseInt(this.day) < 10) {
            this.day = "0" + this.day;
        }
        this.date = this.year + "-" + this.month + "-" + this.day;
        return this.date;
}
Amount_Calculation() {

}


checkbox_Click()
{ 
    this.Final_Amounts();
}
Final_Amounts()
{
     
this.Tot_discount= Number(this.purchase_return_master_.TotalDiscount)+Number(this.Purchase_Return_Details_.Discount)-this.Edit_Discount;;
this.Tot_Net= Number(this.purchase_return_master_.TaxableAmount)+Number(this.Purchase_Return_Details_.NetValue)-this.Edit_Net;


    if(this.purchase_return_master_.Roundoff==undefined || this.purchase_return_master_.Roundoff==null)
    this.purchase_return_master_.Roundoff=0;

    if(this.purchase_return_master_.Discount==undefined || this.purchase_return_master_.Discount==null)
    this.purchase_return_master_.Discount=0;


    var Transportation_Gst = 0, Transportation_Total = 0, Handling_Gst = 0, Handling_Total = 0;


  
    this.purchase_return_master_.GrossTotal=Number(this.Tot_Gross.toFixed(2));
    this.purchase_return_master_.TotalDiscount= Number(this.Tot_discount.toFixed(2));
    this.purchase_return_master_.TaxableAmount= Number(this.Tot_Net.toFixed(2));
    this.purchase_return_master_.NetTotal= Number(this.Tot_Amount.toFixed(2));
    this.purchase_return_master_.TotalAmount= Number(this.Tot_Amount.toFixed(2))-Number(this.purchase_return_master_.Discount)+
        Number(this.purchase_return_master_.Roundoff) ;

 
  //  this.Manual_Roundoff_Calculation();
      
    this.purchase_return_master_.TotalAmount = Number(this.purchase_return_master_.Roundoff) + Number(this.purchase_return_master_.TotalAmount);
    this.purchase_return_master_.TotalAmount = Number(this.purchase_return_master_.TotalAmount.toFixed(2));
  //  this.purchase_return_master_.GrandTotal=Math.round(this.purchase_return_master_.GrandTotal)


  
//this.Clr_Sales_Edit_Data();
}

Master_Amount_Change()
{
          
    if(this.purchase_return_master_.Roundoff==undefined || this.purchase_return_master_.Roundoff==null)
    this.purchase_return_master_.Roundoff=0;


    if(this.purchase_return_master_.Discount==undefined || this.purchase_return_master_.Discount==null)
    this.purchase_return_master_.Discount=0;

this.purchase_return_master_.TotalAmount= Number(this.purchase_return_master_.NetTotal)-Number(this.purchase_return_master_.Discount)+
Number(this.purchase_return_master_.Roundoff);
}
Delete_purchase_return_master(purchase_return_master_Id,index)
{
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.purchase_return_master_Service_.Delete_purchase_return_master(purchase_return_master_Id).subscribe(Delete_status => {
        if(Delete_status[0][0].purchase_return_master_Id_>0){
        this.purchase_return_master_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
        }
        else
        {
     //   this.purchase_return_master_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
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

Delete_Purchase_Return_Details(Purchase_Return_Details_e:Purchase_Return_Details,index)
{ 

      
    this.Purchase_Return_Details_Data.splice(index, 1);
    this.Edit_Discount=Number(Purchase_Return_Details_e.Discount);
    this.Edit_Tax=Purchase_Return_Details_e.NetValue;
    this.CGST_SUM= this.CGST_SUM-this.Edit_CGST;
    this.SGST_SUM= this.SGST_SUM-this.Edit_SGST;
   
    this.GST_Sum= this.GST_Sum-this.Edit_GST;
    this.Tot_discount=this.Tot_discount-this.Edit_Discount;
    this.Tot_Cess=this.Tot_Cess- this.Edit_Cess;
    this.Tot_Amount=this.Tot_Amount- this.Edit_Totamt;
    this.Tot_Net=this.Tot_Net- this.Edit_Net;
    this.Tot_Gross=this.Tot_Gross-this.Edit_Gross;
    this.purchase_return_master_.GrossTotal=this.purchase_return_master_.GrossTotal-this.Edit_Gross;
    this.purchase_return_master_.TotalDiscount=this.purchase_return_master_.TotalDiscount-this.Edit_Discount;
    this.purchase_return_master_.NetTotal= this.purchase_return_master_.NetTotal-this.Edit_Net;
    this.purchase_return_master_.TotalAmount= this.purchase_return_master_.TotalAmount- this.Edit_Totamt;
    //this.purchase_return_master_.GrandTotal= this.purchase_return_master_.GrandTotal-this.Edit_Totamt;
      
    this.purchase_return_master_.TaxableAmount=  this.purchase_return_master_.TaxableAmount-this.Edit_Tax;
    this.purchase_return_master_.GrossTotal=Number(this.purchase_return_master_.GrossTotal.toFixed(2));
    this.purchase_return_master_.TotalDiscount=Number(this.purchase_return_master_.TotalDiscount.toFixed(2));
    this.purchase_return_master_.NetTotal=Number(this.purchase_return_master_.NetTotal.toFixed(2));
    //this.purchase_return_master_.Cess=Number(this.purchase_return_master_.Cess.toFixed(2));
    this.purchase_return_master_.TotalAmount=Number(this.purchase_return_master_.TotalAmount.toFixed(2));
   // this.Round_Off_Calculation();
   // this.purchase_return_master_.GrandTotal=Number(this.purchase_return_master_.GrandTotal.toFixed(2));
 this.Purchase_Return_Details_Data.splice(index, 1);
}

 Search_To_Stock_Typeahead(event: any)
 {
     var Value = "";
     if (event.target.value == "")
     Value = undefined;
     else
     Value = event.target.value;
     {
      
     this.issLoading = true;
         this.Purchase_Master_Service_.Search_To_Stock_Typeahead(2,Value).subscribe(Rows => {
      
     if (Rows != null) {
     this.To_Stock_Data = Rows[0];
     }
     this.issLoading = false;
     },
     Rows => {
      
     this.issLoading = false;
     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
     });
     }
 }

display_To_Stock(Client_Accounts_e: Client_Accounts)
 {
    if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
 }

Load_Bill_Type()
{
    var value=2;
    this.Purchase_Master_Service_.Load_Bill_Type(value).subscribe(Rows => {
        if (Rows != null) {
        this.Bill_Type_Data = Rows[0];
        this.Bill_Type_=this.Bill_Type_Data[0];
        }
        },
        Rows => {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}
Search_Supplier_Typeahead(event: any)
{
    var grpid="1,3";
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
      {
     this.issLoading = true;
        this.Purchase_Master_Service_.Search_Supplier_Typeahead(grpid,Value).subscribe(Rows => {
    if (Rows != null) {
        this.Supplier_Data = Rows[0];
    }
    this.issLoading = false;
    },
    Rows => {
     
    this.issLoading = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
 }
display_Supplier(Client_Accounts_e: Client_Accounts) 
    {
    if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
    }
Supplier_Change()
    {
    this.purchase_return_master_.Address1=this.Supplier_.Address1;
    this.purchase_return_master_.Address2=this.Supplier_.Address2;
    this.purchase_return_master_.Address3=this.Supplier_.Address3;
    this.purchase_return_master_.Address4=this.Supplier_.Address4;
    }
Get_Barcode_Purchase(event: any)
{
  var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
    {
        this.issLoading = true;
        this.Purchase_Master_Service_.Get_Barcode_Purchase(Value).subscribe(Rows => {
    if (Rows != null) 
    {
        this.Barcode_Data = Rows[0];
    }
    this.issLoading = false;
    },
    Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:false}});
    });
    }
}
 display_Barcode(Barcode_E: Purchase_Return_Details) 
 {
    if (Barcode_E) { return Barcode_E.Item_Code; }
 }
Get_Purchase_Return_Item_Typeahead(event: any)
{
     var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
        {  
            this.issLoading = true;
        this.Purchase_Master_Service_.Get_Purchase_Typeahead(Value).subscribe(Rows => {
  
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
 display_Item(Item_: Purchase_Return_Details)
{
    if (Item_) { return Item_.ItemName; }
}

Barcode_Change(Barcode_s:Purchase_Return_Details)
{
    
    this.Purchase_Return_Details_=Object.assign({},Barcode_s);
    this.Barcode_Temp_.ItemId=Barcode_s.ItemId;
    this.Barcode_Temp_.ItemName=Barcode_s.ItemName;
    this.Barcode_Temp_.StockId = Barcode_s.StockId;
    this.Item_=Object.assign({},this.Barcode_Temp_);

}
Item_Name_Change(Item_sl:Purchase_Return_Details)
{
    debugger;

    this.Purchase_Return_Details_=Object.assign({},Item_sl);

 this.Item_Temp.StockId=Item_sl.StockId;
 this.Item_Temp.Item_Code=Item_sl.Item_Code;
 this.Item_Temp.ItemId =Item_sl.ItemId;
 this.Item_Temp.ItemName =Item_sl.ItemName;
 this.Barcode_=Object.assign({},this.Item_Temp);

 this.Purchase_Return_Details_.StockId=Item_sl.StockId; 
 this.Purchase_Return_Details_.ItemCode=Item_sl.Item_Code;
 this.Purchase_Return_Details_.ItemId=Item_sl.ItemId;
//  this.Purchase_Return_Details_.ItemName=Item_sl.ItemName;

//     this.Purchase_Return_Details_=Object.assign({},Item_s);
//  if(Item_s.Barcode!="")
//     {
//     this.Item_Temp.StockId=Item_s.StockId;
//     this.Item_Temp.Barcode=Item_s.Barcode;
//     this.Barcode_=Object.assign({},this.Item_Temp);
//     this.Purchase_Return_Details_.Barcode=Item_s.Barcode;
//     }  


}
Search_purchase_return_master()
{
 
var look_In_Date_Value=0,ClientAccount=0,Voucher_No_search_=0;
if (this.Look_In_Date == true )
look_In_Date_Value = 1;
if (this.Search_Customer != undefined && this.Search_Customer!=null)
if (this.Search_Customer.Client_Accounts_Id != undefined && this.Search_Customer.Client_Accounts_Id != null)
ClientAccount= this.Search_Customer.Client_Accounts_Id;
if (this.Voucher_Number != undefined && this.Voucher_Number != null && this.Voucher_Number != 0)
Voucher_No_search_ = this.Voucher_Number;
this.issLoading=true;
 this.purchase_return_master_Service_.Search_purchase_return_master(look_In_Date_Value,moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),ClientAccount,Voucher_No_search_,0,0,0,0,0,1).subscribe(Rows => {
 this.purchase_return_master_Data=Rows[0];
 this.Total_Entries=this.purchase_return_master_Data.length;
    if(this.purchase_return_master_Data.length==0)
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
Plus_Purchase_Return_Details()
{
     

    if(this.Item_==undefined || this.Item_==null || this.Item_.ItemId==undefined || this.Item_.ItemId==0 )
    {
        const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select The Item',Type: "3" }});
        return
    }
    else if(this.Purchase_Return_Details_.Quantity==undefined || this.Purchase_Return_Details_.Quantity==null || this.Purchase_Return_Details_.Quantity==0 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Quantity',Type: "3" }});
        return
    }
    // if(this.To_Stock_==undefined || this.To_Stock_==null || this.To_Stock_.Client_Accounts_Id==undefined || this.To_Stock_.Client_Accounts_Id==0 )
    // {
    //     const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select To Stock',Type: "3" }});
    //     return
    // }
   
    else
    {   
        if(this.Purchase_Return_Details_Data==undefined)
this.Purchase_Return_Details_Data=[];

 
if( this.Barcode_==null)
{
 //   const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
    //this.Purchase_Return_Details_.Barcode=Barcode_string;
   // this.Purchase_Return_Details_.Barcode='';
}
//  else if(this.Barcode_.Barcode==undefined ||this.Barcode_.Barcode==null)
// {
//     // const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
//     // this.Purchase_Return_Details_.Barcode=Barcode_string;
//     this.Purchase_Return_Details_.Barcode='';
// }
     // this.Purchase_Return_Details_.ItemId=this.Item_.ItemId;
        // this.Purchase_Return_Details_.ItemName=this.Item_.ItemName;

        // this.Purchase_Return_Details_.To_Employee_Id=this.To_Stock_.Client_Accounts_Id;
        // this.Purchase_Return_Details_.To_Stock_Name=this.To_Stock_.Client_Accounts_Name;
        
        if (this.Purchase_Return_Details_Index >= 0) {
            this.Purchase_Return_Details_Data[this.Purchase_Return_Details_Index] = Object.assign({}, this.Purchase_Return_Details_);
            }
        else {
            this.Purchase_Return_Details_Data.push(Object.assign({}, this.Purchase_Return_Details_));
              }
               
this.Final_Amounts();
this.Purchase_Return_Details_Index=-1;
this.Clr_Purchase_Return_Details();
}

}
Save_purchase_return_master()
{

if(this.Purchase_Return_Details_Data==undefined || this.Purchase_Return_Details_Data==null || this.Purchase_Return_Details_Data.length==0 || this.Purchase_Return_Details_Data.length==undefined )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Please Add Details',Type: "3" }});
        return
    }
else if(this.Supplier_==undefined || this.Supplier_==null )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Supplier',Type: "3" }});
        return
    }
else if(this.Supplier_.Client_Accounts_Id==undefined||this.Supplier_==undefined || this.Supplier_==null ||this.Supplier_.Client_Accounts_Id==0)
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Supplier',Type: "3" }});
    return
  }
else if(this.purchase_return_master_.PurchaseDate==undefined || this.purchase_return_master_.PurchaseDate==null)
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Date',Type: "3" }});
    return
  }
  else  if(this.purchase_return_master_.InvoiceNo==undefined || this.purchase_return_master_.InvoiceNo==null ||  this.purchase_return_master_.InvoiceNo=="")
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Bill Number',Type: "3" }});
        return
    }
 else if(this.Purchase_Return_Details_Data==undefined || this.Purchase_Return_Details_Data==null || this.Purchase_Return_Details_Data.length==0 || this.Purchase_Return_Details_Data.length==undefined )
    {
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type: "3" }});
       return
    }
    else
    {
       
        this.purchase_return_master_.BillType=this.Bill_Type_.Bill_Type_Id;
        this.purchase_return_master_.Account_Party_Id=this.Supplier_.Client_Accounts_Id;
    debugger
    this.purchase_return_master_.Purchase_Return_Details = this.Purchase_Return_Details_Data;
    this.purchase_return_master_.PurchaseDate = this.New_Date(new Date(moment(this.purchase_return_master_.PurchaseDate).format('YYYY-MM-DD')));
    this.purchase_return_master_.Entry_Date = this.New_Date(new Date(moment(this.purchase_return_master_.Entry_Date).format('YYYY-MM-DD')));
    console.log("Before Purchase Return Save API call");
    this.issLoading = true;

    this.purchase_return_master_Service_.Save_purchase_return_master(this.purchase_return_master_)
    .pipe(
        finalize(() => {
            console.log("Purchase Return Save Finalize executed");
            this.issLoading = false;
            const saveButton = document.getElementById("Save_Button");
            if (saveButton) saveButton.hidden = false;
        })
    )
    .subscribe({
        next: (Save_status) => {
            console.log("Purchase Return Save API Response:", Save_status);

            if (!Save_status || !Save_status[0]) {
                this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: 'Invalid server response', Type: "2" }
                });
                return;
            }

            if (Number(Save_status[0].purchase_return_master_Id_) > 0) {
                this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: 'Saved Successfully', Type: "false" }
                });
                this.Close_Click();
            } else {
                this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: 'Error Occured', Type: "2" }
                });
            }
        },
        error: (error) => {
            console.error("Purchase Return Save API ERROR:", error);
            this.dialogBox.open(DialogBox_Component, {
                panelClass: 'Dialogbox-Class',
                data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
            });
        }
    });
    }
}
Edit_purchase_return_master(purchase_return_master_e:purchase_return_master,index)
{
    
     
    this.Purcahse_Master_Index=index;
    this.purchase_return_master_=Object.assign({},purchase_return_master_e);
    
    this.Supplier_Temp.Client_Accounts_Id=purchase_return_master_e.Account_Party_Id;
    this.Supplier_Temp.Client_Accounts_Name=purchase_return_master_e.Customer;
    this.Supplier_=Object.assign({},this.Supplier_Temp);

    for(var i=0;i<this.Bill_Type_Data.length;i++)
    {
        if(this.Bill_Type_Data[i].Bill_Type_Id==purchase_return_master_e.BillType)
        {
            this.Bill_Type_=this.Bill_Type_Data[i];
        }
    }
    this.purchase_return_master_Service_.Get_purchase_return_master(purchase_return_master_e.Purchase_Return_Master_Id).subscribe(Rows => {
         
    if (Rows != null) {
    this.Purchase_Return_Details_Data = Rows[0];
    this.issLoading = false;
    }
    
    },
    Rows => {
     
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    
    this.Entry_View=true;
    this.purchase_return_master_=purchase_return_master_e;
    this.purchase_return_master_=Object.assign({},purchase_return_master_e);

}

Edit_Purchase_Return_Details(Purchase_Return_Details_e:Purchase_Return_Details,index)
{ 
     
    this.Purchase_Return_Details_Index=index;
    this.Purchase_Return_Details_=Object.assign({},Purchase_Return_Details_e);
    this.Edit_Discount=Purchase_Return_Details_e.Discount;
    this.Edit_Net=Purchase_Return_Details_e.NetValue;
    this.Edit_Tax=Purchase_Return_Details_e.NetValue;
    // this.Purchase_Return_Details_=Object.assign({},Purchase_Return_Details_e);



this.Item_Temp.ItemId=Purchase_Return_Details_e.ItemId;
this.Item_Temp.Item_Code=Purchase_Return_Details_e.Item_Code;
this.Barcode_=Object.assign({},this.Item_Temp);

this.Item_Temp.ItemId=Purchase_Return_Details_e.ItemId;
this.Item_Temp.ItemName=Purchase_Return_Details_e.ItemName;
this.Item_=Object.assign({},this.Item_Temp);
this.To_Stock_=Object.assign({},this.To_Stock_Temp_);

}


}

