import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Purchase_Master_Service } from '../../../services/Purchase_Master.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Purchase_Master } from '../../../models/Purchase_Master';
import { Purchase_Details } from '../../../models/Purchase_Details';
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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatAutocompleteSelectedEvent } from '@angular/material';
import { Account_Group } from '../../../models/Account_Group';
import { Item_Group_Service } from '../../../services/Item_Group.Service';
import { Item_Group } from '../../../models/Item_Group';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
 @Component({
selector: 'app-Purchase_Master',
templateUrl: './Purchase_Master.component.html',
styleUrls: ['./Purchase_Master.component.css'],
providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },],
})
export class Purchase_MasterComponent implements OnInit {
Purchase_Master_Data:Purchase_Master[]
Purchase_Master_:Purchase_Master= new Purchase_Master();
Purchase_Master_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
myInnerHeightTwo: number;
myHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Purchase_Master_Edit:boolean;
Purchase_Master_Save:boolean;
Purchase_Master_Delete:boolean;
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
Barcode_Data:Purchase_Details[];

Item_Data:Purchase_Details[]
Item_:Purchase_Details= new Purchase_Details();
Item_Data_Filter: Purchase_Master[];

Barcode_:Purchase_Details= new Purchase_Details();
Barcode_Temp_:Purchase_Details= new Purchase_Details();
Item_Temp:Purchase_Details= new Purchase_Details();
Purchase_Details_:Purchase_Details=new Purchase_Details();
Purchase_Details_Data:Purchase_Details[];
Purcahse_Master_Index:number;
Purchase_Details_Index:number=-1;
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
Item_Group_Data : Item_Group[]
Item_Group_ : Item_Group = new Item_Group ()
Item_Group_temp : Item_Group = new Item_Group ()
File: string;
Doc_Photo: any;
ImageFile_Doc: any;
Document_File_Array: any[];
Login_User: string = "0";


Purchase_Maste_Data: Purchase_Master[];
Purchase_Master_Data_Filter: Purchase_Master[];
Purchase_Maste_: Purchase_Master = new Purchase_Master();

Item_Data1:Item[]
Item1_:Item= new Item();
Item_Data_Filter1: Item[];

ItemName_Data:Item[]
ItemName_:Item= new Item();
ItemName_Data_Filter: Item[];

	/*** Added on 08-05-2024 ***/
	If_file_changed:boolean=false
	Save_Call_Status: boolean = false;

 /*** Added on 09-05-2024 ***/
 Purchase_Maste_Temp: Purchase_Master = new Purchase_Master();
 Item1_Temp:Item= new Item();
 Purchase_Maste_Search_: Purchase_Master = new Purchase_Master();

 /*** Added on 02-09-2024  ***/
 CGST_Amount: number;
 SGST_Amount: number;
 IGST_Amount: number;
 Sale_Tax: number;
 GST_Check: number=0;

 SGST_Amount1: number;
 CGST_Amount1: number;
 IGST_Amount1: number;
 Sale_Tax1: number;
 GST_Amount:number;
 GST_Amount1:number;


constructor(public Item_Group_Service_ : Item_Group_Service,public Purchase_Master_Service_:Purchase_Master_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    debugger
   this.Login_User = localStorage.getItem("Login_User");
this.Permissions = Get_Page_Permission(12);
if(this.Permissions==undefined || this.Permissions==null)
    {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login');
    }
    else
    {
        this.Purchase_Master_Edit=this.Permissions.Edit;
        this.Purchase_Master_Save=this.Permissions.Save;
        this.Purchase_Master_Delete=this.Permissions.Delete;
        this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 290;
    this.myInnerHeightTwo = this.myInnerHeight - 370;
    this.myHeight = (window.innerHeight);
    this.myHeight = this.myHeight -400;
    this.Search_FromDate = this.New_Date(this.Search_FromDate);
    this.Search_ToDate = this.New_Date(this.Search_ToDate);
    this.Purchase_Master_.PurchaseDate = new Date().toString(); 
    this.Entry_View=false;
    this.Load_Bill_Type();
    this.Search_Purchase_Master();
    this.Clr_Purchase_Master();
    this.Clr_Purchase_Details();
}
Create_New()
{  
    this.Entry_View = true;
    this.Clr_Purchase_Master();
    this.Clr_Purchase_Details();
    this.Purchase_Details_Data=[];
}
Close_Click()
{
    this.Entry_View = false;
    this.Is_Expiry_Show=true;
    this.Purchase_Details_Data=[];
    this.Is_Expiry_Check();
    this.Clr_Purchase_Master();
    this.Clr_Purchase_Details();
}
trackByFn(index, item) 
{
    return index;
}
Is_Expiry_Check()
{
if(this.Purchase_Details_.Is_Expiry==true)
this.Is_Expiry_Show=false;
else
this.Is_Expiry_Show=true;
}
Clr_Purchase_Master()
{
   this.Purchase_Master_.Purchase_Master_Id=0;
   this.Purchase_Master_.Account_Party_Id=0;
   this.Purchase_Master_.PurchaseDate = new Date().toString();
   this.Purchase_Master_.PurchaseDate = this.formatDate(this.Purchase_Master_.PurchaseDate);
   this.Purchase_Master_.Discount=0;
   this.Purchase_Master_.InvoiceNo="";
   this.Purchase_Master_.Roundoff=0;
   this.Purchase_Master_.TotalAmount=0;
   this.Purchase_Master_.TotalDiscount=0;
   this.Purchase_Master_.TaxableAmount=0;
   this.Purchase_Master_.TotalGST=0;
   this.Purchase_Master_.TotalCGST=0;
   this.Purchase_Master_.TotalSGST=0;
   this.Purchase_Master_.TotalIGST=0;
   this.Purchase_Master_.Other_Charges=0;  
   this.Purchase_Master_.GrossTotal=0;
   this.Purchase_Master_.NetTotal=0;
   this.Purchase_Master_.BillType=0;
   this.Purchase_Master_.Description="";
   this.Purchase_Master_.User_Id=0;
   this.Supplier_=null;
   this.Purchase_Master_.Address1="";
   this.Purchase_Master_.Address2="";
   this.Purchase_Master_.Address3="";
   this.Purchase_Master_.Address4="";
    this.Purchase_Master_.Transportation_Charge = 0;
    this.Purchase_Master_.Handling_Charge = 0;
    this.Purchase_Master_.Isgst = false;
    this.Purchase_Master_.Transportation_Gst = 0;
    this.Purchase_Master_.Handling_Gst = 0;
    this.Purchase_Master_.Transportation_Total = 0;
    this.Purchase_Master_.Handling_Total = 0;
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
   this.Item_Group_=null;
   this.Doc_Photo =""
   this.ImageFile_Doc = ""
   this.Purchase_Maste_ = null;
   this.Item1_ = null;
   this.GST_Check = 0;
  //  this.Purchase_Master_.

 /*** Added on 10-05-2024 ***/
	this.If_file_changed=false
}
Clr_Purchase_Details()
{
this.Purchase_Details_Index=-1;
this.Purchase_Details_.Purchase_Details_Id=0;
this.Purchase_Details_.Purchase_Master_Id=0;
this.Purchase_Details_.ItemId=0;
this.Purchase_Details_.Barcode="";
this.Purchase_Details_.ItemName="";
this.Purchase_Details_.GroupId=0;
this.Purchase_Details_.GroupName="";
this.Purchase_Details_.UnitId=0;
this.Purchase_Details_.UnitName="";
    this.Purchase_Details_.StockId = 0;
    this.Purchase_Details_.To_Employee_Id = 0;
this.Purchase_Details_.PurchaseRate=0;
this.Purchase_Details_.SaleRate=0;
this.Purchase_Details_.MRP=0;
this.Purchase_Details_.HSNMasterId=0;
this.Purchase_Details_.HSNCODE="";
this.Purchase_Details_.Include_Tax=0;
this.Purchase_Details_.SaleTax=0;
this.Purchase_Details_.Quantity=0;
this.Purchase_Details_.Stock_Details_Id=0;
this.Purchase_Details_.Quantity_Kg=0;
this.Purchase_Details_.GrossValue=0;
this.Purchase_Details_.Discount=0;
this.Purchase_Details_.NetValue=0;
this.Purchase_Details_.CGST=0;
this.Purchase_Details_.CGST_AMT=0;
this.Purchase_Details_.SGST=0;
this.Purchase_Details_.SGST_AMT=0;
this.Purchase_Details_.IGST=0;
this.Purchase_Details_.Item_Code ='';
    this.Purchase_Details_.IGST_AMT = 0;
    this.Purchase_Details_.Description = "";
this.Purchase_Details_.Is_Expiry=false;
this.Purchase_Details_.Expiry_Date=new Date();
this.Purchase_Details_.Expiry_Date=this.New_Date(this.Purchase_Details_.Expiry_Date);
this.Purchase_Details_.GST_Amount=0;
this.Purchase_Details_.TotalAmount=0;
this.Purchase_Details_.To_Stock_Name="";
this.Item_=null;
this.To_Stock_=null;
this.Barcode_=null;
this.Edit_CGST=0;
this.Edit_SGST=0;
this.Edit_IGST=0;
this.Edit_GST=0;
this.Edit_Discount=0;
this.Edit_Totamt=0;
this.Edit_Net=0;
this.Edit_Gross=0;

this.IGST_Amount = 0;
this.SGST_Amount = 0;
this.CGST_Amount = 0;

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

Get_Item_Name_Get_With_Code()
{
    debugger;
    var Item_Code;
    if(this.Purchase_Details_.Item_Code == '' || this.Purchase_Details_.Item_Code == null || this.Purchase_Details_.Item_Code == undefined || this.Purchase_Details_.Item_Code == 'undefined')
    {
        Item_Code == ''
        this.Purchase_Details_.ItemName = ''
        this.issLoading = false;
        return;     
    }
    else
    Item_Code=this.Purchase_Details_.Item_Code;
        debugger
this.Purchase_Master_Service_.Get_Item_Name_With_Code(Item_Code,this.Item_Group_.Item_Group_Id).subscribe(Rows => {
    debugger;

    if (Rows != null) {
        this.Purchase_Details_.ItemName = Rows[0][0].ItemName;
        this.Purchase_Details_.ItemId = Rows[0][0].ItemId;
        // this.Purchase_Details_.Item_Code = Rows[0][0].Item_Code;
}
    this.issLoading = false;
},
    Rows => {
  this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
 

}

Amount_Calculation() //satheesh sir modified this code
{     
  debugger;
  var PurchaseRate=0,Quantity=0,Discount=0,CGST=0,SGST=0,IGST=0,GrossValue=0,NetValue=0,Include_Tax=0,CGST_AMT=0,SGST_AMT=0,IGST_AMT=0,GST=0,GST_Amount=0,TotalAmount=0;
    if(this.Purchase_Details_.PurchaseRate==undefined || this.Purchase_Details_.PurchaseRate==null)
      PurchaseRate=0;
    else
    PurchaseRate=Number(this.Purchase_Details_.PurchaseRate);
    if(this.Purchase_Details_.Quantity==undefined || this.Purchase_Details_.Quantity==null)
      Quantity=0;
    else
      Quantity=Number(this.Purchase_Details_.Quantity);
    if(this.Purchase_Details_.Discount==undefined || this.Purchase_Details_.Discount==null)
      Discount=0;
    else
    Discount=Number(this.Purchase_Details_.Discount);
    if(this.Purchase_Details_.CGST==undefined || this.Purchase_Details_.CGST==null)
      CGST=0;
    else
      CGST=Number(this.Purchase_Details_.CGST);
    if(this.Purchase_Details_.SGST==undefined || this.Purchase_Details_.SGST==null)
      SGST=0;
    else
      SGST = Number(this.Purchase_Details_.SGST);
    if(this.Purchase_Details_.IGST==undefined || this.Purchase_Details_.IGST==null)
      IGST=0;
    else
      IGST = Number(this.Purchase_Details_.IGST);
      if(this.Purchase_Details_.SaleTax==undefined || this.Purchase_Details_.SaleTax==null)
      GST=0;
    else
    GST=Number(this.Purchase_Details_.SaleTax);


      GrossValue=Number(PurchaseRate)*Number(Quantity);
    this.Purchase_Details_.GrossValue=Number(GrossValue.toFixed(2));
    NetValue=Number(GrossValue)-Number(Discount);
    this.Purchase_Details_.NetValue = Number(NetValue.toFixed(2));
    if(this.Bill_Type_.Bill_Type_Id==3)
    {
      CGST_AMT=Number(NetValue)*Number(CGST)/100;
      SGST_AMT=Number(NetValue)*Number(SGST)/100;
      IGST_AMT=0;
      GST_Amount=CGST_AMT+SGST_AMT;     
    }
    if(this.Bill_Type_.Bill_Type_Id==4)
      {
        CGST_AMT=0;
        SGST_AMT=0
        IGST_AMT=Number(NetValue)*Number(IGST)/100;
        GST_Amount=IGST_AMT; 
      }
      if(this.Bill_Type_.Bill_Type_Id==5)
        {
          CGST_AMT=0;
          SGST_AMT=0
          IGST_AMT=0;
          GST_Amount=0;
        }
        GST=Number(this.Purchase_Details_.SaleTax);
        Include_Tax = Number(PurchaseRate) +Number(PurchaseRate) * Number(GST)/100;   
        this.Purchase_Details_.Include_Tax = Number(Include_Tax.toFixed(2));
        this.Purchase_Details_.CGST_AMT = Number(CGST_AMT.toFixed(2));
        this.CGST_Amount1 = this.Purchase_Details_.CGST_AMT;
        this.Purchase_Details_.SGST_AMT = Number(SGST_AMT.toFixed(2));
        this.SGST_Amount1 = this.Purchase_Details_.SGST_AMT;
        this.Purchase_Details_.IGST_AMT = Number(IGST_AMT.toFixed(2));
        this.IGST_Amount1 = this.Purchase_Details_.IGST_AMT;   
        this.SGST_Amount = CGST_AMT;
        this.CGST_Amount = SGST_AMT;
        this.IGST_Amount =IGST_AMT;
        this.GST_Amount=GST_Amount;
        this.GST_Amount1=GST_Amount;
        TotalAmount=NetValue+GST_Amount;
    this.Purchase_Details_.TotalAmount = Number(TotalAmount.toFixed(2));
}
checkbox_Click()
{ 
    this.Final_Amounts();
}

bill_type_chnages() //satheesh sir added this code
{
  this.Amount_Calculation();
  this.excelcalculation();
  this.Final_Amounts();
}

excelcalculation()//satheesh sir added this code
{
  debugger;
  for(var i = 0; i< this.Purchase_Details_Data.length ; i++)
  {
    var GrossValue=0,Discount=0,NetValue=0,Total=0,SGST_AMT=0,CGST_AMT=0,IGST_AMT=0,GST_Amount=0,gst=0,cgst=0,sgst=0,igst=0,prate=0,qty=0;
    prate= Number(this.Purchase_Details_Data[i].PurchaseRate);
    qty=Number(this.Purchase_Details_Data[i].Quantity);
    Discount=Number(this.Purchase_Details_Data[i].Discount);
    gst=Number(this.Purchase_Details_Data[i].SaleTax);
    
    cgst=Number(this.Purchase_Details_Data[i].CGST);
    sgst=Number(this.Purchase_Details_Data[i].SGST);
    igst=Number(this.Purchase_Details_Data[i].IGST);
    GrossValue=Number(prate)*Number(qty);
    NetValue=Number(GrossValue)-Number(Discount);
    if(this.Bill_Type_.Bill_Type_Id==3)
      {
        CGST_AMT=Number(NetValue)*Number(cgst)/100;
        SGST_AMT=Number(NetValue)*Number(sgst)/100;
        IGST_AMT=0;
        GST_Amount=Number(CGST_AMT)+Number(SGST_AMT);     
      }
      if(this.Bill_Type_.Bill_Type_Id==4)
        {
          CGST_AMT=0;
          SGST_AMT=0
          IGST_AMT=Number(NetValue)*Number(igst)/100;
          GST_Amount=Number(IGST_AMT); 
        }
        if(this.Bill_Type_.Bill_Type_Id==5)
          {
            CGST_AMT=0;
            SGST_AMT=0
            IGST_AMT=0;
            GST_Amount=0;
          }
          Total=  Number(NetValue) + Number(GST_Amount);
     this.Purchase_Details_Data[i].CGST_AMT= Number(CGST_AMT.toFixed(3));
     this.Purchase_Details_Data[i].SGST_AMT= Number(SGST_AMT.toFixed(3));
     this.Purchase_Details_Data[i].IGST_AMT= Number(IGST_AMT.toFixed(3));
     this.Purchase_Details_Data[i].GST_Amount= Number(GST_Amount.toFixed(3));
     this.Purchase_Details_Data[i].TotalAmount= Number(Total.toFixed(3));    
  }
}

Final_Amounts()
{
    this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.CGST_SUM=0,this.SGST_SUM=0,this.GST_Sum=0,this.Tot_Cess=0,this.Tot_Amount=0;
    for(var i = 0; i< this.Purchase_Details_Data.length ; i++)
    {
        this.Tot_Gross = Number(this.Tot_Gross) + Number(this.Purchase_Details_Data[i].GrossValue);
        this.Tot_discount = Number(this.Tot_discount) + Number(this.Purchase_Details_Data[i].Discount);
        this.Tot_Net = Number(this.Tot_Net) + Number(this.Purchase_Details_Data[i].NetValue);
        this.CGST_SUM =Number(this.CGST_SUM) + Number(this.Purchase_Details_Data[i].CGST_AMT);
        this.SGST_SUM = Number(this.SGST_SUM) + Number(this.Purchase_Details_Data[i].SGST_AMT);
        this.IGST_Sum = Number(this.IGST_Sum) + Number(this.Purchase_Details_Data[i].IGST_AMT);
        this.GST_Sum = Number(this.GST_Sum) + Number(this.Purchase_Details_Data[i].GST_Amount);
        this.Tot_Cess = Number(this.Tot_Cess) + Number(this.Purchase_Details_Data[i].CGST_AMT);
        this.Tot_Amount = Number(this.Tot_Amount) + Number(this.Purchase_Details_Data[i].TotalAmount);
    }
    if(this.Purchase_Master_.Roundoff==undefined || this.Purchase_Master_.Roundoff==null)
    this.Purchase_Master_.Roundoff=0;
  
    if(this.Purchase_Master_.Other_Charges==undefined || this.Purchase_Master_.Other_Charges==null)
    this.Purchase_Master_.Other_Charges=0;
    if(this.Purchase_Master_.Discount==undefined || this.Purchase_Master_.Discount==null)
    this.Purchase_Master_.Discount=0;    
    var Transportation_Gst = 0, Transportation_Total = 0, Handling_Gst = 0, Handling_Total=0;
   
    this.Purchase_Master_.GrossTotal = Number(this.Tot_Gross.toFixed(3));
    this.Purchase_Master_.TotalDiscount = Number(this.Tot_discount.toFixed(3));
    this.Purchase_Master_.TaxableAmount = Number(this.Tot_Net.toFixed(3));
    this.Purchase_Master_.TotalCGST = Number(this.CGST_SUM.toFixed(3));
    this.Purchase_Master_.TotalSGST =  Number(this.SGST_SUM.toFixed(3));
    this.Purchase_Master_.TotalGST = Number(this.GST_Sum.toFixed(3));
    this.Purchase_Master_.TotalIGST = Number(this.IGST_Sum.toFixed(3));
    this.Purchase_Master_.NetTotal = Number(this.Tot_Amount.toFixed(3));
    this.Purchase_Master_.TotalAmount = Number(this.Tot_Amount.toFixed(3)) + Number(this.Purchase_Master_.Other_Charges) - Number(this.Purchase_Master_.Discount) +
    Number(this.Purchase_Master_.Roundoff) + Number(this.Purchase_Master_.Handling_Total) + Number(this.Purchase_Master_.Transportation_Total);

    this.Purchase_Master_.TotalAmount = Number(this.Purchase_Master_.TotalAmount.toFixed(3));
  }
Master_Amount_Change()
{          
    if(this.Purchase_Master_.Roundoff==undefined || this.Purchase_Master_.Roundoff==null)
    this.Purchase_Master_.Roundoff=0;
    if(this.Purchase_Master_.Other_Charges==undefined || this.Purchase_Master_.Other_Charges==null)
    this.Purchase_Master_.Other_Charges=0;
    if(this.Purchase_Master_.Discount==undefined || this.Purchase_Master_.Discount==null)
    this.Purchase_Master_.Discount=0;
    this.Purchase_Master_.TotalAmount= Number(this.Purchase_Master_.NetTotal)+
    Number(this.Purchase_Master_.Other_Charges)-Number(this.Purchase_Master_.Discount)+
    Number(this.Purchase_Master_.Roundoff);
}
Delete_Purchase_Master(Purchase_Master_Id,index)
{
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Purchase_Master_Service_.Delete_Purchase_Master(Purchase_Master_Id).subscribe(Delete_status => {
        if(Delete_status[0][0].Purchase_Master_Id_>0){
        this.Purchase_Master_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
        this.Search_Purchase_Master();
        }
        else
        {
     //   this.Purchase_Master_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
        this.Search_Purchase_Master();
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
Delete_Purchase_Details(Purchase_Details_e:Purchase_Details,index)
{       
    // this.Purchase_Details_Data.splice(index, 1);
    // this.Edit_CGST=Purchase_Details_e.CGST_AMT
    // this.Edit_SGST=Purchase_Details_e.SGST_AMT;
    // this.Edit_IGST=Purchase_Details_e.IGST_AMT;
    // this.Edit_GST=Purchase_Details_e.GST_Amount;
    // this.Edit_Discount=Number(Purchase_Details_e.Discount);
    // this.Edit_Net=Purchase_Details_e.NetValue+Purchase_Details_e.GST_Amount;
    // this.Edit_Tax=Purchase_Details_e.NetValue;
    // this.Edit_Gross=Purchase_Details_e.GrossValue;
    // this.Edit_Totamt=Purchase_Details_e.TotalAmount;
    // this.CGST_SUM= this.CGST_SUM-this.Edit_CGST;
    // this.SGST_SUM= this.SGST_SUM-this.Edit_SGST;   
    // this.GST_Sum= this.GST_Sum-this.Edit_GST;
    // this.Tot_discount=this.Tot_discount-this.Edit_Discount;
    // this.Tot_Cess=this.Tot_Cess- this.Edit_Cess;
    // this.Tot_Amount=this.Tot_Amount- this.Edit_Totamt;
    // this.Tot_Net=this.Tot_Net- this.Edit_Net;
    // this.Tot_Gross=this.Tot_Gross-this.Edit_Gross;
    // this.Purchase_Master_.GrossTotal=this.Purchase_Master_.GrossTotal-this.Edit_Gross;
    // this.Purchase_Master_.TotalDiscount=this.Purchase_Master_.TotalDiscount-this.Edit_Discount;
    // this.Purchase_Master_.NetTotal= this.Purchase_Master_.NetTotal-this.Edit_Net;
    // this.Purchase_Master_.TotalCGST= this.Purchase_Master_.TotalCGST-this.Edit_CGST;
    // this.Purchase_Master_.TotalSGST=   this.Purchase_Master_.TotalSGST-this.Edit_SGST;
    // this.Purchase_Master_.TotalIGST=  this.Purchase_Master_.TotalIGST-this.Edit_IGST;
    // this.Purchase_Master_.TotalAmount= this.Purchase_Master_.TotalAmount- this.Edit_Totamt;
    // this.Purchase_Master_.TotalGST=   this.Purchase_Master_.TotalGST-this.Edit_GST;
    // //this.Purchase_Master_.GrandTotal= this.Purchase_Master_.GrandTotal-this.Edit_Totamt;      
    // this.Purchase_Master_.TaxableAmount=  this.Purchase_Master_.TaxableAmount-this.Edit_Tax;
    // this.Purchase_Master_.GrossTotal=Number(this.Purchase_Master_.GrossTotal.toFixed(2));
    // this.Purchase_Master_.TotalDiscount=Number(this.Purchase_Master_.TotalDiscount.toFixed(2));
    // this.Purchase_Master_.NetTotal=Number(this.Purchase_Master_.NetTotal.toFixed(2));
    // this.Purchase_Master_.TotalCGST=Number(this.Purchase_Master_.TotalCGST.toFixed(2));
    // this.Purchase_Master_.TotalSGST=Number(this.Purchase_Master_.TotalSGST.toFixed(2));
    // //this.Purchase_Master_.Cess=Number(this.Purchase_Master_.Cess.toFixed(2));
    // this.Purchase_Master_.TotalAmount=Number(this.Purchase_Master_.TotalAmount.toFixed(2));
    // this.Purchase_Master_.TotalGST=Number(this.Purchase_Master_.TotalGST.toFixed(2));
   // this.Round_Off_Calculation();
   // this.Purchase_Master_.GrandTotal=Number(this.Purchase_Master_.GrandTotal.toFixed(2));
 this.Purchase_Details_Data.splice(index, 1);
 this.Final_Amounts();
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
        this.Bill_Type_Temp.Bill_Type_Id = 0
        this.Bill_Type_Temp.Bill_Type_Name = "Select";
				this.Bill_Type_Data.unshift(this.Bill_Type_Temp);
        this.Bill_Type_=this.Bill_Type_Data[0];
        }
        },
        Rows => {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}
Search_Supplier_Typeahead(event: any)
{
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
      {
     this.issLoading = true;
    this.Purchase_Master_Service_.Search_Supplier_Typeahead('1,3',Value).subscribe(Rows => {     
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
    this.Purchase_Master_.Address1=this.Supplier_.Address1;
    this.Purchase_Master_.Address2=this.Supplier_.Address2;
    this.Purchase_Master_.Address3=this.Supplier_.Address3;
    this.Purchase_Master_.Address4=this.Supplier_.Address4;
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
 display_Barcode(Barcode_E: Purchase_Details) 
 {
    if (Barcode_E) { return Barcode_E.Barcode; }
 }
Get_Purchase_Item_Typeahead(event: any)
{
     var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
        {  
            this.issLoading = true;
    this.Purchase_Master_Service_.Get_Purchase_Item_Typeahead(Value).subscribe(Rows => {
        debugger;
  
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
 display_Item(Item_: Purchase_Details)
{
    debugger;
    if (Item_) { return Item_.ItemName; }
}
Barcode_Change(Barcode_s:Purchase_Details)
{   
    this.Purchase_Details_=Object.assign({},Barcode_s);
    this.Barcode_Temp_.ItemId=Barcode_s.ItemId;
    this.Barcode_Temp_.ItemName=Barcode_s.ItemName;
    this.Item_=Object.assign({},this.Barcode_Temp_);
// this.Purchase_Details_.ItemId=Barcode_s.ItemId;
// this.Purchase_Details_.ItemName=Barcode_s.ItemName;
// this.Purchase_Details_.UnitId=Barcode_s.UnitId;
// this.Purchase_Details_.UnitName=Barcode_s.UnitName;
// this.Purchase_Details_.SaleTax=Barcode_s.SaleTax;
// this.Purchase_Details_.GroupId=Barcode_s.GroupId;
// this.Purchase_Details_.PurchaseRate=Barcode_s.PurchaseRate;
// this.Purchase_Details_.GroupName=Barcode_s.GroupName;
// this.Purchase_Details_.HSNMasterId=Barcode_s.HSNMasterId;
// this.Purchase_Details_.Barcode=Barcode_s.Barcode;
// this.Purchase_Details_.Quantity=Barcode_s.Quantity;
// this.Purchase_Details_.SaleRate=Barcode_s.SaleRate;
// this.Purchase_Details_.MRP=Barcode_s.MRP;
}
Item_Name_Change(Item_s:Purchase_Details)
{   
    this.Purchase_Details_=Object.assign({},Item_s);
 //if(this.Barcode_==undefined||this.Barcode_==null)
//  if(Item_s.Barcode!="")
//     {
//     this.Item_Temp.StockId=Item_s.StockId;
//     this.Item_Temp.Barcode=Item_s.Barcode;
//     this.Barcode_=Object.assign({},this.Item_Temp);
//     this.Purchase_Details_.Barcode=Item_s.Barcode;
//     }  
      // this.Purchase_Details_.ItemId=Item_s.ItemId;
    // this.Purchase_Details_.ItemName=Item_s.ItemName;
    // this.Purchase_Details_.UnitId=Item_s.UnitId;
    // this.Purchase_Details_.UnitName=Item_s.UnitName;
    // this.Purchase_Details_.SaleTax=Item_s.SaleTax;
    // this.Purchase_Details_.CGST=Item_s.CGST;
    // this.Purchase_Details_.SGST=Item_s.SGST;
    // this.Purchase_Details_.IGST=Item_s.IGST;
    // this.Purchase_Details_.HSNCODE=Item_s.HSNCODE;
    // this.Purchase_Details_.SGST_AMT=Item_s.SGST_AMT;
    // this.Purchase_Details_.CGST_AMT=Item_s.CGST_AMT;
    // this.Purchase_Details_.IGST_AMT=Item_s.IGST_AMT;
    // this.Purchase_Details_.GST_Amount=Item_s.GST_Amount;
    // this.Purchase_Details_.GroupId=Item_s.GroupId;
    // this.Purchase_Details_.PurchaseRate=Item_s.PurchaseRate;
    // this.Purchase_Details_.GroupName=Item_s.GroupName;
    // this.Purchase_Details_.HSNMasterId=Item_s.HSNMasterId;
    // this.Purchase_Details_.Quantity=Item_s.Quantity;
    // this.Purchase_Details_.SaleRate=Item_s.SaleRate;
    // this.Purchase_Details_.MRP=Item_s.MRP;
    // this.Purchase_Details_.GroupId=Item_s.GroupId;
    // this.Purchase_Details_.GroupName=Item_s.GroupName; 
}
// Search_Purchase_Master()
// {
// this.issLoading=true;
// this.Purchase_Master_Service_.Search_Purchase_Master('').subscribe(Rows => {
//  this.Purchase_Master_Data=Rows[0];
// this.Total_Entries=this.Purchase_Master_Data.length;
//     if(this.Purchase_Master_Data.length==0)
//     {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
//     }
//     this.issLoading = false;
//  },
//  Rows => { 
//      this.issLoading = false;
// const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
//     });
// }
Search_Purchase_Master()
{ 
    debugger
var look_In_Date_Value=0,ClientAccount=0,Voucher_No_search_=0,Branch_Id=0;
if (this.Look_In_Date == true )
look_In_Date_Value = 1;

if (this.Search_Customer != undefined && this.Search_Customer!=null)
if (this.Search_Customer.Client_Accounts_Id != undefined && this.Search_Customer.Client_Accounts_Id != null)
ClientAccount= this.Search_Customer.Client_Accounts_Id;

if (this.Voucher_Number != undefined && this.Voucher_Number != null && this.Voucher_Number != 0)
Voucher_No_search_ = this.Voucher_Number;

if (this.Purchase_Maste_Search_ != undefined && this.Purchase_Maste_Search_ != null)
  {
    if(this.Purchase_Maste_Search_.Branch_Id != undefined && this.Purchase_Maste_Search_.Branch_Id != null && this.Purchase_Maste_Search_.Branch_Id != 0)
      {
        Branch_Id = this.Purchase_Maste_Search_.Branch_Id
      }
  }
// this.issLoading=true;
// debugger
//  this.Purchase_Master_Service_.Search_Purchase_Master(look_In_Date_Value,moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),ClientAccount,Voucher_No_search_,this.Login_User,Branch_Id).subscribe(Rows => {
 
//  debugger
//     this.Purchase_Master_Data=Rows[0];
//  this.Total_Entries=this.Purchase_Master_Data.length;
//     if(this.Purchase_Master_Data.length==0)
//     {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
//     }
//     this.issLoading=false;
//     },
//     Rows => { 
//             this.issLoading=false;
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//     });
    }
Plus_Purchase_Details() //satheesh sir modified this code
{     
    debugger
    if(this.Item1_ ==undefined || this.Item1_==null || this.Item1_.Item_Id == null || this.Item1_.Item_Id == 0 )
    {
        const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select The Item Code',Type: "3" }});
        return
    }
    else if(this.Purchase_Details_.ItemName==undefined || this.Purchase_Details_.ItemName==null || this.Purchase_Details_.ItemName=='')
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Item Name',Type: "3" }});
        return
    }
    else if(this.Purchase_Details_.PurchaseRate==undefined || this.Purchase_Details_.PurchaseRate==null || this.Purchase_Details_.PurchaseRate==0 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Purchase Rate',Type: "3" }});
        return
    }
    else if(this.Purchase_Details_.Quantity==undefined || this.Purchase_Details_.Quantity==null || this.Purchase_Details_.Quantity==0 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Quantity',Type: "3" }});
        return
    }
    // if(this.To_Stock_==undefined || this.To_Stock_==null || this.To_Stock_.Client_Accounts_Id==undefined || this.To_Stock_.Client_Accounts_Id==0 )
    // {
    //     const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select To Stock',Type: "3" }});
    //     return
    // }
    // else if(this.Purchase_Details_.MRP==undefined || this.Purchase_Details_.MRP==null || this.Purchase_Details_.MRP==0 )
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter MRP',Type: "3" }});
    //     return
    // }
    // else if(this.Purchase_Details_.SaleRate==undefined || this.Purchase_Details_.SaleRate==null || this.Purchase_Details_.SaleRate==0 )
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Sale Rate',Type: "3" }});
    //     return
    // }
    // else if ( this.Purchase_Details_.Quantity_Kg == null|| this.Purchase_Details_.Quantity_Kg == undefined)
    // {
    //     this.Purchase_Details_.Quantity_Kg =0
    // }    
    else
    {   
        if(this.Purchase_Details_Data==undefined)
this.Purchase_Details_Data=[]; 
//document.getElementById("BARCODE").nodeValue = this.Barcode_.Barcode;
//this.Stock_Add_Details_.Barcode=(document.getElementById("BARCODE").value); 
//this.Stock_Add_Details_.Barcode= Object.assign({},this.Barcode_.Barcode);
// if( this.Barcode_==null)
// {
//  //   const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
//     //this.Purchase_Details_.Barcode=Barcode_string;
//     this.Purchase_Details_.Barcode='';
// }
//  else if(this.Barcode_.Barcode==undefined ||this.Barcode_.Barcode==null)
// {
//     // const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
//     // this.Purchase_Details_.Barcode=Barcode_string;
//     this.Purchase_Details_.Barcode='';
// }
// else if(this.Barcode_.Barcode!=undefined && this.Barcode_.Barcode!=null)
// {
//     this.Purchase_Details_.Barcode=  this.Barcode_.Barcode;
// }
// else if(this.Barcode_!=undefined && this.Barcode_!=null)
// {
//     const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
//     this.Purchase_Details_.Barcode=  Barcode_string;
// }       

debugger
var prate=0;var peprs=8;var psale=0;var pmrp=0;var pv=0;
if(this.Purchase_Details_.PurchaseRate!=null || this.Purchase_Details_.PurchaseRate!=undefined)
prate=this.Purchase_Details_.PurchaseRate;
pv=prate*peprs/100;
 pv=Number(pv.toFixed(2));
psale=Number(prate)+pv;

debugger; 

this.Purchase_Details_.SaleRate=Number(psale.toFixed(2));
this.Purchase_Details_.MRP=psale;
this.Purchase_Details_.Item_Code = this.Item1_.Item_Code;
this.Purchase_Details_.HSNCODE = this.Item1_.HSNCODE;
this.Purchase_Details_.HSNMasterId = 0;
this.Purchase_Details_.CGST_AMT = this.CGST_Amount1;
this.Purchase_Details_.SGST_AMT = this.SGST_Amount1;
this.Purchase_Details_.IGST_AMT = this.IGST_Amount1;
this.Purchase_Details_.GST_Amount=this.GST_Amount1;
this.Purchase_Details_.SaleTax = this.Item1_.Sales_Tax;
this.Purchase_Details_.IGST= this.Item1_.Sales_Tax;
this.Purchase_Details_.CGST=this.Item1_.CGST;
this.Purchase_Details_.SGST=this.Item1_.SGST;
this.Purchase_Details_.IGST=this.Item1_.IGST;
this.Purchase_Details_.UnitId = this.Item1_.Saleunit_Id;
this.Purchase_Details_.UnitName = this.Item1_.Saleunit_Name;
this.Purchase_Details_.GroupId = this.Item1_.Group_Id;
this.Purchase_Details_.GroupName = this.Item1_.Group_Name;

        this.Purchase_Details_.Expiry_Date=this.New_Date(new Date(moment(this.Purchase_Details_.Expiry_Date).format('YYYY-MM-DD')));
        // this.Purchase_Details_.ItemId=this.Item_.ItemId;
        // this.Purchase_Details_.ItemName=this.Item_.ItemName;
        // this.Purchase_Details_.To_Employee_Id=this.To_Stock_.Client_Accounts_Id;
        // this.Purchase_Details_.To_Stock_Name=this.To_Stock_.Client_Accounts_Name;        
        if (this.Purchase_Details_Index >= 0) {
            this.Purchase_Details_Data[this.Purchase_Details_Index] = Object.assign({}, this.Purchase_Details_);
            }
        else {
            this.Purchase_Details_Data.push(Object.assign({}, this.Purchase_Details_));
              }               
this.Final_Amounts();
this.Purchase_Details_Index=-1;
this.Clr_Purchase_Details();
}
}
Save_Purchase_Master()
{
if(this.Purchase_Details_Data==undefined || this.Purchase_Details_Data==null || this.Purchase_Details_Data.length==0 || this.Purchase_Details_Data.length==undefined )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Please Add Details',Type: "3" }});
        return
    }
else if(this.Supplier_==undefined || this.Supplier_==null )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Supplier',Type: "3" }});
        return
    }
    else if(this.Purchase_Maste_==undefined || this.Purchase_Maste_==null )
      {
          const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Branch',Type: "3" }});
          return
      }
else if(this.Supplier_.Client_Accounts_Id==undefined||this.Supplier_==undefined || this.Supplier_==null ||this.Supplier_.Client_Accounts_Id==0)
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Supplier',Type: "3" }});
    return
  }
  else if(this.Item_Group_==undefined || this.Item_Group_==null ||this.Item_Group_.Item_Group_Id==0 || this.Item_Group_.Item_Group_Id==undefined)
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Category',Type: "3" }});
    return
  }
else if(this.Purchase_Master_.PurchaseDate==undefined || this.Purchase_Master_.PurchaseDate==null)
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Bill Date',Type: "3" }});
    return
  }
  else  if(this.Purchase_Master_.InvoiceNo==undefined || this.Purchase_Master_.InvoiceNo==null ||  this.Purchase_Master_.InvoiceNo=="")
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Invoice No',Type: "3" }});
        return
    }
 else if(this.Bill_Type_==undefined || this.Bill_Type_==null || this.Bill_Type_.Bill_Type_Id==0 || this.Bill_Type_.Bill_Type_Id==undefined )
    {
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select Bill Type',Type: "3" }});
       return
    }
 else if(this.Purchase_Details_Data==undefined || this.Purchase_Details_Data==null || this.Purchase_Details_Data.length==0 || this.Purchase_Details_Data.length==undefined )
    {
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type: "3" }});
       return
    }
    else
    {       

        this.Purchase_Master_.User_Id = Number(this.Login_User);
        this.Purchase_Master_.BillType=this.Bill_Type_.Bill_Type_Id;
        this.Purchase_Master_.BillType_Name = this.Bill_Type_.Bill_Type_Name;
        this.Purchase_Master_.Account_Party_Id=this.Supplier_.Client_Accounts_Id;
        this.Purchase_Master_.Purchase_Details=this.Purchase_Details_Data;
        this.Purchase_Master_.Document_Name = this.Doc_Photo;
        this.Purchase_Master_.Item_Group_Id=this.Item_Group_.Item_Group_Id;
        this.Purchase_Master_.Item_Group_Name=this.Item_Group_.Item_Group_Name;

        debugger; 

        this.Purchase_Master_.Branch_Id = this.Purchase_Maste_.Branch_Id
        this.Purchase_Master_.Branch_Name = this.Purchase_Maste_.Branch_Name;
    // document.getElementById('Save_Button').hidden=true;
    
    this.Purchase_Master_.PurchaseDate = this.New_Date(new Date(moment(this.Purchase_Master_.PurchaseDate).format('YYYY-MM-DD')));
    this.Purchase_Master_.Entry_Date = this.New_Date(new Date(moment(this.Purchase_Master_.Entry_Date).format('YYYY-MM-DD')));
       this.issLoading=true;  
       this.upload(); 
  //      debugger   
  //  this.Purchase_Master_Service_.Save_Purchase_Master(this.Purchase_Master_,
  //   this.Doc_Photo,
  //   this.ImageFile_Doc,
  //   this.Document_File_Array).subscribe(Save_status => {    
  //       debugger           
  //  // Save_status=Save_status[0];
  //   if(Number(Save_status[0][0].Purchase_Master_Id_)>0)
  //   {
  //   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
  //   this.Clr_Purchase_Details();
  //   this.Clr_Purchase_Master();
  //   this.Purchase_Details_Data=[];
  //   this.Search_Purchase_Master();
  //   }
  //   else if (Number(Save_status[0][0].Purchase_Master_Id_) == -1)
  //   {
  //       const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Bill No Already Exists', Type: "2" } });
  //   }
  //   else{
  //   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  //   }
  //   this.issLoading=false;
  //   },
  //   Rows => { 
  //       this.issLoading=false;
  //   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  //   });
    }
}

File_Change_Vat(event: Event) {
  this.If_file_changed = true
  const file = (event.target as HTMLInputElement).files;
  this.ImageFile_Doc = file;
  this.Doc_Photo = this.ImageFile_Doc[0].name;
}

/*** Added on 08-05-2024 ***/

upload() 
{

  
  if(this.If_file_changed)
  {
    const file = this.ImageFile_Doc.item(0);

    if (file) 
    {

      console.log('file.size: ', file.size);
      console.log(' 5 * 1024 * 1024: ',  5 * 1024 * 1024);
      if (file.size > 5 * 1024 * 1024) 
      { // Check if file size exceeds 5 MB
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: 'dialogbox-class',
        data: {Message: 'File size exceeds 5 MB. Please select a smaller file.',Type: "3" }});
        this.Save_Call_Status = false;	
        this.issLoading = false;
      }

      else
      {
      
        this.Purchase_Master_Service_.uploadFile(file).then(res=>{
        console.log('res: ', res);
        this.Purchase_Master_.filepath=res['Location']
        console.log('this.Purchase_Master_.filepath: ', this.Purchase_Master_.filepath);
        this.Save()
      });
      }	
    
    }
    
    
    }else
    {
      this.Save()
    }
  }

  Save() {
    console.log("Before Purchase Master Save API call");
    this.issLoading = true;

    this.Purchase_Master_Service_.Save_Purchase_Master(this.Purchase_Master_)
    .pipe(
      finalize(() => {
        console.log("Purchase Master Save Finalize executed");
        this.issLoading = false;
        const saveButton = document.getElementById("Save_Button");
        if (saveButton) saveButton.hidden = false;
      })
    )
    .subscribe({
      next: (Save_status) => {
        console.log("Purchase Master Save API Response:", Save_status);
        
        if (Number(Save_status[0][0].Purchase_Master_Id_) > 0) {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Saved Successfully", Type: "false" },
          });
          this.Save_Call_Status = false;
          this.Clr_Purchase_Master();
          this.Clr_Purchase_Details(); 
          this.Purchase_Details_Data = [];
          this.Search_Purchase_Master();       
        } 
        else if (Number(Save_status[0][0].Purchase_Master_Id_) == -1) {
          this.dialogBox.open(DialogBox_Component, { 
            panelClass: 'Dialogbox-Class', 
            data: { Message: 'Bill No Already Exists', Type: "2" } 
          });
        }
        else {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },
          });
        }
      },
      error: (error) => {
        console.error("Purchase Master Save API ERROR:", error);
        this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" },
        });
      }
    });
  }

  Download_Documents(Photo) {

		// debugger
		// var bs = environment.FilePath;
		// var s = bs + Photo;
		window.open(Photo, "_blank"); 
	  }

Edit_Purchase_Master(Purchase_Master_e:Purchase_Master,index)
{  
  debugger;
    this.Purcahse_Master_Index=index;
    this.Purchase_Master_=Object.assign({},Purchase_Master_e);    
    this.Supplier_Temp.Client_Accounts_Id=Purchase_Master_e.Account_Party_Id;
    this.Supplier_Temp.Client_Accounts_Name=Purchase_Master_e.Customer;
    this.Supplier_=Object.assign({},this.Supplier_Temp);
    this.Purchase_Maste_Temp.Branch_Id = Purchase_Master_e.Branch_Id;
    this.Purchase_Maste_Temp.Branch_Name = Purchase_Master_e.Branch_Name;
    this.Purchase_Maste_ = Object.assign({},this.Purchase_Maste_Temp);
    this.Doc_Photo = this.Purchase_Master_.Document_Name;
    this.Item_Group_temp.Item_Group_Id=Purchase_Master_e.Item_Group_Id;
    this.Item_Group_temp.Item_Group_Name=Purchase_Master_e.Item_Group_Name;
    this.Item_Group_=Object.assign({},this.Item_Group_temp);


  
    for(var i=0;i<this.Bill_Type_Data.length;i++)
    {
        
        if(this.Bill_Type_Data[i].Bill_Type_Id==Purchase_Master_e.BillType)
        {
            this.Bill_Type_=this.Bill_Type_Data[i];
        }
    }

    if(this.Bill_Type_.Bill_Type_Id == 3)
    {
      this.GST_Check = 1;
    }
    
    this.Purchase_Master_Service_.Get_Purchase_Details(Purchase_Master_e.Purchase_Master_Id).subscribe(Rows => {         
    if (Rows != null) {
    this.Purchase_Details_Data = Rows[0];
    this.issLoading = false;
    }    
    },
    Rows => {     
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });    
    this.Entry_View=true;
    this.Purchase_Master_=Purchase_Master_e;
    this.Purchase_Master_=Object.assign({},Purchase_Master_e);
}
Edit_Purchase_Details(Purchase_Details_e:Purchase_Details,index)
{  
  debugger 
    this.To_Stock_=null;
    this.Purchase_Details_Index=index;
    this.Purchase_Details_=Object.assign({},Purchase_Details_e);
    // this.Purchase_Details_Index=index;
    // this.Purchase_Details_=Purchase_Details_e;
    // this.To_Stock_Temp_.Client_Accounts_Id=Purchase_Details_e.To_Employee_Id;
    // this.To_Stock_Temp_.Client_Accounts_Name=Purchase_Details_e.To_Stock_Name;
    // this.To_Stock_=Object.assign({},this.To_Stock_Temp_);
    // this.Item_Temp.ItemId=Purchase_Details_e.ItemId;
    // this.Item_Temp.ItemName=Purchase_Details_e.ItemName;
    // this.Item_=Object.assign({},this.Item_Temp);
    this.Edit_CGST=Purchase_Details_e.CGST_AMT
    this.Edit_SGST=Purchase_Details_e.SGST_AMT;
    this.Edit_GST=Purchase_Details_e.GST_Amount;
    this.Edit_Discount=Purchase_Details_e.Discount;
    this.Edit_IGST=Purchase_Details_e.IGST_AMT;
    this.Edit_Net=Purchase_Details_e.NetValue;
    this.Edit_Tax=Purchase_Details_e.NetValue;
    this.Edit_Gross=Purchase_Details_e.GrossValue;
    this.Edit_Totamt=Purchase_Details_e.TotalAmount;
    // this.Purchase_Details_=Object.assign({},Purchase_Details_e);
    this.Item1_Temp.Item_Id=Purchase_Details_e.ItemId;
    this.Item1_Temp.Item_Name=Purchase_Details_e.ItemName;
    this.Item1_Temp.Item_Code=Purchase_Details_e.Item_Code;
    this.Item1_Temp.HSNCODE = Purchase_Details_e.HSNCODE;
    this.Item1_Temp.Sales_Tax = Purchase_Details_e.SaleTax;
    this.Item1_=Object.assign({},this.Item1_Temp);
    this.Item_Temp.Barcode=Purchase_Details_e.Barcode;
    this.Barcode_=Object.assign({},this.Item_Temp);
    this.Item_Temp.ItemId=Purchase_Details_e.ItemId;
    this.Item_Temp.ItemName=Purchase_Details_e.ItemName;
    this.Item_=Object.assign({},this.Item_Temp);
    this.To_Stock_Temp_.Client_Accounts_Id=Purchase_Details_e.To_Employee_Id;
    this.To_Stock_Temp_.Client_Accounts_Name=Purchase_Details_e.To_Stock_Name;
    this.To_Stock_=Object.assign({},this.To_Stock_Temp_);

    this.CGST_Amount1 = this.Edit_CGST;
    this.SGST_Amount1 = this.Edit_SGST;
    this.IGST_Amount1 = this.Edit_IGST;

    if(this.GST_Check == 1)
    {
      this.CGST_Amount = this.Edit_CGST;
      this.SGST_Amount = this.Edit_SGST;
    }
    else
    {
      this.CGST_Amount = 0;
      this.SGST_Amount = 0;
    }

    this.IGST_Amount = this.Edit_IGST;

 
}
Get_Item_Group(event: any) {
    var Value = "";
    if (event.target.value == "") Value = undefined;
    else Value = event.target.value;
    this.issLoading = true;
    this.Item_Group_Service_.Search_Item_Group(Value).subscribe(
        (Rows) => {
            if (Rows != null) {
                this.Item_Group_Data = Rows[0];
            }
            this.issLoading = false;
        },
        (Rows) => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Error Occured", Type: "2" },
            });
        }
    );
}
display_Item_Group(Item_Group_: Item_Group) {
    if (Item_Group_) {
        return Item_Group_.Item_Group_Name;
    }
}



Search_Branch_Typeahead(event: any, source: number) {
    // if (this.Followup_Branch_Data == undefined)
    // this.Followup_Branch_Data = [];
    // if (this.Followup_Branch_Data.length == 0) {
      debugger;
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value.toLowerCase();

    if (
      this.Purchase_Maste_Data == undefined ||
      this.Purchase_Maste_Data.length == 0
    ) {
      this.issLoading = true;
      debugger;
      this.Purchase_Master_Service_.Search_Branch_Typeahead(Value).subscribe(
        (Rows) => {
          debugger;
          if (Rows != null) {
            debugger;
            this.Purchase_Maste_Data = Rows[0];
            this.Purchase_Master_Data_Filter = [];
            if (source == 1) {
              for (var i = 0; i < this.Purchase_Maste_Data.length; i++) {
                if (
                  this.Purchase_Maste_Data[
                    i
                  ].Branch_Name.toLowerCase().includes(Value)
                )
                  this.Purchase_Master_Data_Filter.push(
                    this.Purchase_Maste_Data[i]
                  );
              }
            } else {
              this.Purchase_Master_Data_Filter = Rows[0];
            }

            this.issLoading = false;
          }
        },
        (Rows) => {
          this.issLoading = false;
          // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        }
      );
    } else {
      // if (source == 1) {
        this.Purchase_Master_Data_Filter = [];
        for (var i = 0; i < this.Purchase_Maste_Data.length; i++) {
          if (
            this.Purchase_Maste_Data[
              i
            ].Branch_Name.toLowerCase().includes(Value)
          )
            this.Purchase_Master_Data_Filter.push(this.Purchase_Maste_Data[i]);
        }
      // } else {
      //   this.Purchase_Master_Data_Filter = [];
      //   for (var i = 0; i < this.Purchase_Maste_Data.length; i++) {
      //     this.Purchase_Master_Data_Filter.push(this.Purchase_Maste_Data[i]);
      //   }
      // }
    }
    // }
  }
  display_Branch(Purchase_Maste_: Purchase_Master) {
    if (Purchase_Maste_) {
      return Purchase_Maste_.Branch_Name;
    }
  }




  
Search_ItemCode_Typeahead(event: any, source: number) {
    // if (this.Followup_Branch_Data == undefined)
    // this.Followup_Branch_Data = [];
    debugger;
    // if (this.Followup_Branch_Data.length == 0) {
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value.toLowerCase();

    if (
      this.Item_Data1 == undefined ||
      this.Item_Data1.length == 0
    ) {
      this.issLoading = true;
      debugger;
      this.Purchase_Master_Service_.Search_ItemCode_Typeahead("").subscribe(
        (Rows) => {
          debugger;
          if (Rows != null) {
            debugger;
            this.Item_Data1 = Rows[0];
            this.Item_Data_Filter1 = [];


            if (source == 1) {
              for (var i = 0; i < this.Item_Data1.length; i++) {
                if (
                  this.Item_Data1[
                    i
                  ].Item_Code.toLowerCase().includes(Value)
                )
                  this.Item_Data_Filter1.push(
                    this.Item_Data1[i]
                  );
              }


            } else {
              this.Item_Data_Filter1 = Rows[0];
            }

            this.issLoading = false;
          }
        },
        (Rows) => {
          this.issLoading = false;
          // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        }
      );
    } else {
      if (source == 1) {
        this.Item_Data_Filter1 = [];
        for (var i = 0; i < this.Item_Data1.length; i++) {
          if (
            this.Item_Data1[
              i
            ].Item_Code.toLowerCase().includes(Value)
          )
            this.Item_Data_Filter1.push(this.Item_Data1[i]);
        }
      } else {
        this.Item_Data_Filter1 = [];
        for (var i = 0; i < this.Item_Data1.length; i++) {
          this.Item_Data_Filter1.push(this.Item_Data1[i]);
        }
      }
    }
    // }
  }

  display_ItemCode(Item1_: Item) {
    debugger
    if (Item1_) {
        return Item1_.Item_Code;
    }
}
  onItemSelected(event: MatAutocompleteSelectedEvent) {
    debugger
   
    const selectedValue = event.option.value;
    this.Purchase_Details_.ItemName = selectedValue.Item_Name;
    this.Purchase_Details_.ItemId = selectedValue.Item_Id;
    this.Purchase_Details_.SaleTax = selectedValue.Sales_Tax;
    this.Purchase_Details_.CGST = selectedValue.CGST;
    this.Purchase_Details_.IGST = selectedValue.IGST;
    this.Purchase_Details_.SGST = selectedValue.SGST;
    this.Item1_ = selectedValue;
    this.Amount_Calculation();

}




  Search_ItemName_Typeahead(event: any, source: number) {
    // if (this.Followup_Branch_Data == undefined)
    // this.Followup_Branch_Data = [];
    // if (this.Followup_Branch_Data.length == 0) {
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value.toLowerCase();

    if (
      this.ItemName_Data == undefined ||
      this.ItemName_Data.length == 0
    ) {
      this.issLoading = true;
      debugger;
      this.Purchase_Master_Service_.Search_ItemName_Typeahead("").subscribe(
        (Rows) => {
          debugger;
          if (Rows != null) {
            debugger;
            this.ItemName_Data = Rows[0];
            this.ItemName_Data_Filter = [];
            if (source == 1) {
              for (var i = 0; i < this.ItemName_Data.length; i++) {
                if (
                  this.ItemName_Data[
                    i
                  ].Item_Code.toLowerCase().includes(Value)
                )
                  this.ItemName_Data_Filter.push(
                    this.ItemName_Data[i]
                  );
              }
            } else {
              this.ItemName_Data_Filter = Rows[0];
            }

            this.issLoading = false;
          }
        },
        (Rows) => {
          this.issLoading = false;
          // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        }
      );
    } else {
      if (source == 1) {
        this.ItemName_Data_Filter = [];
        for (var i = 0; i < this.ItemName_Data.length; i++) {
          if (
            this.ItemName_Data[
              i
            ].Item_Code.toLowerCase().includes(Value)
          )
            this.ItemName_Data_Filter.push(this.ItemName_Data[i]);
        }
      } else {
        this.ItemName_Data_Filter = [];
        for (var i = 0; i < this.ItemName_Data.length; i++) {
          this.ItemName_Data_Filter.push(this.ItemName_Data[i]);
        }
      }
    }
    // }
  }
  display_ItemName(ItemName_: Item) {
    if (ItemName_) {
      return ItemName_.Item_Name;
    }
  }


  /*** Added on 23-09-2024 */

  formatDate(dateString: string): string {
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
}