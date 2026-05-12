import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Renderer2, NgZone, Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock_Service } from '../../../services/Stock.Service';
import{Stock_Add_Master_Service} from '../../../services/Stock_Add_Master.Service';
import { Sales_Master_Service } from '../../../services/Sales_Master.Service';
import{Stock_Take_Name_Service} from '../../../services/Stock_Take_Name.Service';
import {Stock_Take_Master_Service} from '../../../services/Stock_Take_Master.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Stock } from '../../../models/Stock';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import{Stock_Take_Name}from '../../../models/Stock_Take_Name';
import{Stock_Take_Master} from '../../../models/Stock_Take_Master';
import{Stock_Take_Details} from '../../../models/Stock_Take_Details';
// import { ConsoleReporter } from 'jasmine';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {    dateInput: 'DD/MM/YYYY',    },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };
@Component({
selector: 'app-StockTake',
templateUrl: './StockTake.component.html',
styleUrls: ['./StockTake.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class StockTakeComponent implements OnInit, AfterViewInit  {
    ngAfterViewInit() {}
    @ViewChild('Barcode_n', { read: Input, static: true }) inputEl: ElementRef;
    @ViewChild('bottomDiv', { static: false }) bottomDiv: ElementRef;
    @ViewChild('bottomDiv1', { static: false }) bottomDiv1: ElementRef;
    @ViewChild('bottomDiv2', { static: false }) bottomDiv2: ElementRef;
    @ViewChild('bottomDiv3', { static: false }) bottomDiv3: ElementRef;
    @ViewChild('topDiv', { static: false }) topDiv: ElementRef;
    @ViewChild('topDiv1', { static: false }) topDiv1: ElementRef;
  @HostListener('document:keydown', ['$event']) 
  handleKeyboardEvent(event: KeyboardEvent) { ;
      if(event.key=='F2')
    this.Save_Stock_Take_Master(1);
  }
 
Barcode_Data:Stock[]
Stock_Data:Stock[]
Stock_Data_Filter: Stock[];
Stock_:Stock= new Stock();
Stock_Add_Details_Index : number = -1;

Barcode_:Stock_Take_Details= new Stock_Take_Details();
Item_Temp_:Stock_Take_Details= new Stock_Take_Details();
Barcode_Temp_:Stock_Take_Details= new Stock_Take_Details();
Item_Data:Stock_Take_Details[]
Item_:Stock_Take_Details= new Stock_Take_Details();
Item_Temp:Stock_Take_Details= new Stock_Take_Details();

Stock_Temp:Stock= new Stock();
Barcode_Temp:Stock= new Stock();

Stock_Take_Name_:Stock_Take_Name=new Stock_Take_Name();
Search_Stock_Take_Name_:Stock_Take_Name=new Stock_Take_Name();
Stock_Take_Name_Temp:Stock_Take_Name=new Stock_Take_Name();
Stock_Take_Name_Data:Stock_Take_Name[];


Search_FromDate=new Date().toString();
myDate:Date=new Date();
Search_ToDate=new Date().toString();
Sales_Master_Name_Search:string;
Entry_View:boolean=false;
myInnerHeight: number;
EditIndex: number;
Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
StockAdd_Edit:boolean;
StockAdd_Save:boolean;
StockAdd_Delete:boolean;
year:any;
month:any;
day:any;
date:any;
isLoading=false; 
Stock_Add_Edit_Index:number=-1;
Login_User_Id:string;
Employee_Name:string;
Employee_Id:number;
Voucher_Number:number=0;
From_Date:Date=new Date();
To_Date:Date=new Date();
Date_Check:boolean=true;
Stock:number;

Edit_Sales:number=0;
Sale_Detail_Quantity:number=0;
Quotation_Details_Description:string;
Amount_In_Words:string;
Sales_Quantity:number=0;
Edit_Stock_:number=0;
User_Type:string;
User_Type_Id:number;
username:string="";
Sale_EditIndex:number=-1;
Sale_Permission_Edit:boolean= false;
Sale_Permission_Edit_Temp:boolean= false;

ItemCodeData=[];Item_Data_Filter1=[];
Stock_Add_Master_:Stock_Take_Master= new Stock_Take_Master();
Stock_Add_Details_Data:Stock_Take_Details[]
Stock_Add_Details_:Stock_Take_Details= new Stock_Take_Details();
Stock_Add_Master_Data:Stock_Take_Master[]

constructor(private route: ActivatedRoute, private router: Router, public dialogBox: MatDialog , private el: ElementRef, private zone: NgZone, 
    private renderer: Renderer2, public Stock_Service_: Stock_Service,public Sales_Master_Service_:Sales_Master_Service,
    public Stock_Add_Master_Service_:Stock_Add_Master_Service,public Stock_Take_Name_Service_:Stock_Take_Name_Service,
public Stock_Take_Master_Service_:Stock_Take_Master_Service) { }

ngOnInit() 
{
    this.User_Type=localStorage.getItem('User_Type');
    this.User_Type_Id=Number(localStorage.getItem('User_Type_Id'));
    this.Login_User_Id=localStorage.getItem('Login_User');
    this.Employee_Name=localStorage.getItem('Employee_Name');
    this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
    this.username=(localStorage.getItem('uname'));
    
    this.Permissions = Get_Page_Permission(10);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.StockAdd_Edit=this.Permissions.Edit;
    this.StockAdd_Save=this.Permissions.Save;
    this.StockAdd_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}

Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Stock_Add_Master_.EntryDate=new Date("dd-MMM-yyyy");
    this.Search_FromDate=this.formatDate(this.Search_FromDate);
    this.Search_ToDate=this.formatDate(this.Search_ToDate);
   this.Get_StockTakeName_Dropdown();
    this.Clr_Stock_Master();
    this.Clr_Stock_Details();
    this.Entry_View=false;
}

Get_StockTakeName_Dropdown() 
{         
        this.Stock_Take_Name_Service_.Get_StockTakeName_Dropdown().subscribe(Rows => {       
        this.Stock_Take_Name_Data = Rows[0];
        this.Stock_Take_Name_Temp.Stock_Take_Name_Id = 0;
        this.Stock_Take_Name_Temp.Stocktakename = "Select";
        this.Stock_Take_Name_Data.unshift(this.Stock_Take_Name_Temp);
        this.Stock_Take_Name_ = this.Stock_Take_Name_Data[0];

        this.Search_Stock_Take_Name_ = this.Stock_Take_Name_Data[0];
        },
        Rows => 
        {
        //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}

Get_Stock_Item_Code_Typeahead(event: any)
{
   var Value = "";
   debugger
   Value = event.target.value;
     
    this.issLoading = true;
    debugger
   this.Sales_Master_Service_.Get_Stock_Details_By_Item_Code_Typeahead(Value).subscribe(Rows => {     
      debugger
   if (Rows != null) {
       this.ItemCodeData = Rows[0];
   }
   this.issLoading = false;
   },
   Rows => {
    
   this.issLoading = false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
   });
   
}

display_ItemCode(item) 
{
  if (item) { return item.Item_Code; }
}

 Get_Stock(){
    debugger;
    this.Stock_Temp.ItemId=this.Barcode_.ItemId;
    this.Stock_Temp.ItemName=this.Barcode_.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);

    this.Stock_Add_Details_.Stock_Id=this.Barcode_.Stock_Id;
    this.Stock_Add_Details_.ItemId=this.Barcode_.ItemId;
    this.Stock_Add_Details_.ItemName=this.Barcode_.ItemName;
    this.Stock_Add_Details_.UnitId=this.Barcode_.UnitId;
    this.Stock_Add_Details_.UnitName=this.Barcode_.UnitName;
    this.Stock_Add_Details_.ItemName=this.Barcode_.ItemName;
    this.Stock_Add_Details_.GroupId=this.Barcode_.GroupId;
    this.Stock_Add_Details_.GroupName=this.Barcode_.GroupName;
    this.Stock_Add_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Stock_Add_Details_.HSNCODE=this.Barcode_.HSNCODE;
    this.Stock_Add_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Stock_Add_Details_.SaleTax=this.Barcode_.SaleTax;
    this.Stock_Add_Details_.Item_Code=this.Barcode_.Item_Code;
    this.Stock_Add_Details_.Country_Id=this.Barcode_.Country_Id;
    this.Stock_Add_Details_.Country_Name=this.Barcode_.Country_Name; 
}

Search_PurchaseItem_Typeahead(event: any)
{
  var Value = "";
  if(this.Barcode_ == null || this.Barcode_ == undefined)
    this.Barcode_ = new Stock_Take_Details();
  if (event.target.value == "") Value = "";  
  else Value = event.target.value.toLowerCase();
  this.Barcode_.ItemName=Value
  this.Stock_Add_Details_.ItemName=Value;
          this.issLoading = true;
  this.Sales_Master_Service_.Search_Stock_Details_Item_Typeahead(Value).subscribe(Rows => {
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

display_Item(Stock_e: Stock)
{
   if (Stock_e) { return Stock_e.ItemName; }
}

Item_Name_Change(Item_sl:Stock_Take_Details){
    debugger;    
    this.Stock_Add_Details_ =Object.assign({},Item_sl);
 this.Item_Temp_.Stock_Id=Item_sl.Stock_Id;
 this.Item_Temp_.Item_Code=Item_sl.Item_Code;
 this.Barcode_=Object.assign({},this.Item_Temp_);
 this.Stock_Add_Details_.Item_Code=Item_sl.Item_Code; 
 this.Stock_Add_Details_.ItemId=Item_sl.ItemId;
 this.Stock_Add_Details_.ItemName=Item_sl.ItemName;
 this.Stock_Add_Details_.UnitId=Item_sl.UnitId;
 this.Stock_Add_Details_.UnitName=Item_sl.UnitName;
 this.Stock_Add_Details_.SaleTax=Item_sl.SaleTax;
 this.Stock_Add_Details_.GroupId=Item_sl.GroupId;
 this.Stock_Add_Details_.PurchaseRate=Item_sl.PurchaseRate;
 this.Stock_Add_Details_.GroupName=Item_sl.GroupName;
 this.Stock_Add_Details_.HSNMasterId=Item_sl.HSNMasterId;
 this.Stock_Add_Details_.Quantity=Item_sl.Quantity;
 this.Stock_Add_Details_.SaleRate=Item_sl.SaleRate;
 }

Create_New()
{
    //document.getElementById("Tab_Edit").hidden=true; 
    this.Entry_View = true;
    this.Clr_Stock_Master();
    this.Clr_Stock_Details();
    this.Stock_Add_Details_Data=[];
}

Close_Click()
{
    this.Entry_View = false;
    this.Edit_Sales=0;
    this.Clr_Stock_Master();
    this.Clr_Stock_Details();
    //this.Load_Dropdowns();
    this.Stock_Add_Details_Data=[];
    setTimeout(() => {
        if (this.topDiv1) {
            this.topDiv1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    //document.getElementById("Tab_Edit").hidden=true; 
}

Focus_It(event)
{ 
    //const element = this.renderer.selectRootElement('#Barcode_n');
    setTimeout("$('[name=Barcode_n]').focus();", 0)
    //setTimeout(() => this.inputEl.nativeElement.focus());
}

Focus_down(event) {      
    // const element = this.renderer.selectRootElement('#Barcode_List');
    //setTimeout("$('[name=1]').focus();", 0)
    //setTimeout(() => this.inputEl.nativeElement.focus());
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
      //  this.date = this.day + "-"+ this.month + "-" + this.year ;
        return this.date;
}

numberToEnglish(n, custom_join_character) {
    var string = n.toString(),
        units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;
    var and = custom_join_character || 'and';
    /* Is number zero? */
    if (parseInt(string) === 0) {
        return 'zero';
    }
    /* Array of units as words */
    units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    /* Array of tens as words */
    tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    /* Array of scales as words */
    scales = ['', 'Thousand', 'Million', 'Billion'];
    /* Split user arguemnt into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while (start > 0) {
        end = start;
        chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }
    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
        return '';
    }
    /* Stringify each integer in each chunk */
    words = [];
    for (i = 0; i < chunksLen; i++) {
        chunk = parseInt(chunks[i]);
        if (chunk) {
            /* Split chunk into array of individual integers */
            ints = chunks[i].split('').reverse().map(parseFloat);
            /* If tens integer is 1, i.e. 10, then add 10 to units integer */
            if (ints[1] === 1) {
                ints[0] += 10;
            }
            /* Add scale word if chunk is not zero and array item exists */
            if ((word = scales[i])) {
                words.push(word);
            }
            /* Add unit word if array item exists */
            if ((word = units[ints[0]])) {
                words.push(word);
            }
            /* Add tens word if array item exists */
            if ((word = tens[ints[1]])) {
                words.push(word);
            }
            /* Add 'and' string after units or tens integer if: */
            if (ints[0] || ints[1]) {
                /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
                if (ints[2] || !i && chunksLen) {
                    words.push(and);
                }
            }
            /* Add hundreds word if array item exists */
            if ((word = units[ints[2]])) {
                words.push(word + ' hundred');
            }
        }
    }
    return words.reverse().join(' ');
}
//var Amount_Paid = (Receipt_Array.Amount);
New_Date_Format(Date_)
{
    debugger;
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
      //  this.date = this.day + "-"+ this.month + "-" + this.year ;
        return this.date;
}

Clr_Stock_Master()
{
    this.Stock_Add_Master_.Stock_Take_Master_Id=0;
    this.Stock_Add_Master_.User_Id=0;
    this.Stock_Add_Master_.EntryDate=new Date();
    this.Stock_Add_Master_.EntryDate=this.New_Date(this.Stock_Add_Master_.EntryDate);
    this.Stock_Add_Master_.Description = "";
    this.Stock_Add_Details_Data=[];
}

Clr_Stock_Details()
{
    this.Stock_Add_Details_Index=-1;
    this.Stock_Add_Details_.ItemId=0;
    this.Stock_Add_Details_.ItemName="";
    this.Stock_Add_Details_.UnitId=0;
    this.Stock_Add_Details_.UnitName="";
    this.Stock_Add_Details_.ItemName="";
    this.Stock_Add_Details_.GroupId=0;
    this.Stock_Add_Details_.GroupName="";
    this.Stock_Add_Details_.HSNMasterId=0
    this.Stock_Add_Details_.HSNCODE="";
    this.Stock_Add_Details_.HSNMasterId=0
    this.Stock_Add_Details_.SaleTax=0;
    this.Stock_Add_Details_.Item_Code="";
    this.Stock_Add_Details_.Country_Id=0
    this.Stock_Add_Details_.Country_Name="";
    this.Stock_Add_Details_.Amount=0;
    this.Stock_Add_Details_.SaleRate=0;
    this.Stock_Add_Details_.Quantity=0;
    this.Stock_Add_Details_.PurchaseRate=0;
    this.Barcode_=null;
    this.Stock_=null;
}

Clr_Sales_Edit_Data()
{    
    this.Quotation_Details_Description="";
}

Calculate_Total_Amount()
{
    if(this.Stock_Add_Details_.PurchaseRate ==undefined || this.Stock_Add_Details_.PurchaseRate ==null)
    this.Stock_Add_Details_.PurchaseRate =0;
    if(this.Stock_Add_Details_.Quantity ==undefined || this.Stock_Add_Details_.Quantity ==null)
    this.Stock_Add_Details_.Quantity=0;
    this.Stock_Add_Details_.Amount=Number(this.Stock_Add_Details_.PurchaseRate )*Number(this.Stock_Add_Details_.Quantity);
}

Delete_AddStock_Detail(itemIndex){
    this.Stock_Add_Details_Data.splice(itemIndex, 1);
  }

Search_Stock_Take_Master()
  {
      var look_In_Date_Value=0,Stock_Take_Name_Id=0; 
      if (this.Date_Check == true )
          look_In_Date_Value = 1; 
        if(this.Search_Stock_Take_Name_.Stock_Take_Name_Id==undefined || this.Search_Stock_Take_Name_.Stock_Take_Name_Id==null || this.Search_Stock_Take_Name_.Stock_Take_Name_Id==0)
            Stock_Take_Name_Id=0;
        else
        Stock_Take_Name_Id=this.Search_Stock_Take_Name_.Stock_Take_Name_Id;
      this.issLoading=true;    
       debugger
      this.Stock_Take_Master_Service_.Search_Stock_Take_Master(look_In_Date_Value,moment(this.Search_FromDate).format('YYYY-MM-DD'), 
      moment(this.Search_ToDate).format('YYYY-MM-DD'),Stock_Take_Name_Id, this.Login_User_Id).subscribe(Rows => {
        debugger
      this.Stock_Add_Master_Data=Rows[0];
      this.Total_Entries=this.Stock_Add_Master_Data.length;
      if(this.Stock_Add_Master_Data.length==0)
      {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
      }
      this.issLoading=false;
      },
      Rows => {
          this.issLoading=false;
          const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      });
  }

Delete_Stock_Take_Master(Stock_Add_Master_Id,index)
 {
    const dialogRef = this.dialogBox.open
    ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>        
    {    
    if(result=='Yes')
    {
    this.issLoading=true;
    debugger
    this.Stock_Take_Master_Service_.Delete_Stock_Take_Master(Stock_Add_Master_Id).subscribe(Delete_status => {    
        debugger   
        Delete_status=Delete_status[0];
    if(Delete_status[0].Stock_Add_Master_Id_>0){
    this.Stock_Add_Master_Data.splice(index, 1);
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
      
      this.Search_Stock_Take_Master();
    }
    else
    {
    //this.Sales_Master_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    }
    this.issLoading=false;
    },
    Rows => {
        this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error',Type:"2"}});
    });
    }
    });
}

Plus_Stock_Add_Details()
{

if(this.Stock_Add_Details_.Stock_Id>0)
    this.Stock_Add_Details_.Stock_Id=this.Stock_Add_Details_.Stock_Id;
else
    this.Stock_Add_Details_.Stock_Id=0;

/*if(this.Stock_Add_Details_.Quantity==undefined || this.Stock_Add_Details_.Quantity==null || this.Stock_Add_Details_.Quantity==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Quantity',Type: "3" }});
return
}
else if(this.Stock_Add_Details_.PurchaseRate==undefined || this.Stock_Add_Details_.PurchaseRate==null || this.Stock_Add_Details_.PurchaseRate==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Purchase Rate',Type: "3" }});
return
}
else if(this.Stock_Add_Details_.SaleRate==undefined || this.Stock_Add_Details_.SaleRate==null || this.Stock_Add_Details_.SaleRate==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Sales Rate',Type: "3" }});
return
}
else 
{*/
if(this.Stock_Add_Details_Data==undefined)
this.Stock_Add_Details_Data=[];
if( this.Barcode_==null)
{
    this.Stock_Add_Details_.Item_Code='';
}
else if(this.Barcode_.Item_Code!=undefined && this.Barcode_.Item_Code!=null)
{
    this.Stock_Add_Details_.Item_Code=  this.Barcode_.Item_Code;
}
else if(this.Barcode_!=undefined && this.Barcode_!=null)
{
    const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
    this.Stock_Add_Details_.Barcode=Barcode_string;
}
    
debugger;
    if (this.Stock_Add_Edit_Index >= 0) 
    {
        this.Stock_Add_Details_Data[this.Stock_Add_Edit_Index] = Object.assign({}, this.Stock_Add_Details_);
    }
    else
    {
        this.Stock_Add_Details_Data.push(Object.assign({}, this.Stock_Add_Details_));
    }
    debugger;
    this.Stock_Add_Edit_Index=-1;
    this.Clr_Stock_Add_Details();  
//}
}

Search_Item_Typeahead(event: any)
{
    var Value = "";

    if(this.Barcode_ == null || this.Barcode_ == undefined)
        this.Barcode_ = new Stock_Take_Details();

    if (event.target.value == "") Value = "";
    else Value = event.target.value.toLowerCase();

    this.Barcode_.ItemName=Value
     this.Stock_Add_Details_.ItemName=Value;

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

Barcode_keyup(event: any)
{
    this.Search_Barcode_Typeahead(event);
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

safeNumber(value) {
    return isNaN(value) ? 0 : value;
}

Clr_Stock_Add_Details()
{
this.Stock_Add_Details_.Stock_Take_Details_Id=0;
this.Stock_Add_Details_.Stock_Take_Master_Id=0;
this.Stock_Add_Details_.ItemId=0;
this.Stock_Add_Details_.Item_Code="";
this.Stock_Add_Details_.ItemName="";
this.Stock_Add_Details_.GroupId=0;
this.Stock_Add_Details_.GroupName="";
this.Stock_Add_Details_.UnitId=0;
this.Stock_Add_Details_.UnitName="";
this.Stock_Add_Details_.Stock_Id=0;
this.Stock_Add_Details_.PurchaseRate=0;
this.Stock_Add_Details_.SaleRate=0;
this.Stock_Add_Details_.HSNMasterId=0;
this.Stock_Add_Details_.HSNCODE="";
this.Stock_Add_Details_.SaleTax=0;
this.Stock_Add_Details_.Quantity=0;
this.Barcode_=null;
this.Item_ = null;
// this.Is_Expiry_Check();
}

Save_Stock_Take_Master(Printstatus:number)
{
    debugger

    if(this.Stock_Add_Details_Data == undefined || this.Stock_Add_Details_Data == null || this.Stock_Add_Details_Data.length == 0 || this.Stock_Add_Details_Data.length == undefined )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type:"3"}});
        return
    }
    if(this.Stock_Take_Name_==null || this.Stock_Take_Name_==undefined)
        {
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select Stock Take Name',Type:"3"}});
            return
        }

        if(this.Stock_Take_Name_.Stock_Take_Name_Id==null || this.Stock_Take_Name_.Stock_Take_Name_Id==undefined)
            {
                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select Stock Take Name',Type:"3"}});
                return
            }

    this.Stock_Add_Master_.EntryDate = this.formatDate(this.Stock_Add_Master_.EntryDate)
    this.Stock_Add_Master_.Stock_Take_Details=this.Stock_Add_Details_Data;
    this.Stock_Add_Master_.User_Id=Number(this.Login_User_Id);    
    this.Stock_Add_Master_.User_Name=this.username;
    this.Stock_Add_Master_.Stock_Take_Name_Id=this.Stock_Take_Name_.Stock_Take_Name_Id;
    this.Stock_Add_Master_.Stocktakename=this.Stock_Take_Name_.Stocktakename;
    this.Stock_Add_Master_.Description="";
    this.issLoading=true;   
    debugger
    this.Stock_Take_Master_Service_.Save_Stock_Take_Master(this.Stock_Add_Master_).subscribe(Save_status => {   
        
        if(Number(Save_status[0].Stock_Take_Master_Id_)>0)
        {
            this.Stock_Add_Master_.Stock_Take_Master_Id = Save_status[0].Stock_Take_Master_Id_;            
            
                this.issLoading = false;
                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
                this.Entry_View = false;
                // this.Search_Quotation();
                this.Close_Click();
                this.Search_Stock_Take_Master();
                this.Clr_Stock_Master(); 
        }
        else{
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        setTimeout(() => {
            if (this.topDiv) {
                this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        document.getElementById("Save_Button").hidden=false;   
        }
        this.issLoading=false;
        },
        Rows => { 
            this.issLoading=false;
            document.getElementById('Save_Button').hidden=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        setTimeout(() => {
            if (this.topDiv) {
                this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        });

}

Enable_Disable_Permission()
{
    if( this.Sale_Permission_Edit==false)
    {
    $('#SALE :input').attr('disabled', 'true');
    }
    else if( this.Sale_Permission_Edit==true){
    $('#SALE :input').removeAttr('disabled');
    }
}

Disable_Tab_Permission()
{
    this.Sale_Permission_Edit= false;
    this.Enable_Disable_Permission();
}

Edit_Stock_Take_Master(Sales_Master_e:Stock_Take_Master,index)
{ 
    debugger;
    this.Entry_View=true;
    this.Edit_Sales=1;
    this.Stock_Add_Master_=Object.assign({},Sales_Master_e); 

    for(var i=0;i<this.Stock_Take_Name_Data.length;i++)
    {
        if(this.Stock_Take_Name_Data[i].Stock_Take_Name_Id==  this.Stock_Add_Master_.Stock_Take_Name_Id)
        {
            this.Stock_Take_Name_ = this.Stock_Take_Name_Data[i]
        }
    }
    
this.issLoading = true;
debugger
this.Stock_Take_Master_Service_.Get_Stock_Take_Details(Sales_Master_e.Stock_Take_Master_Id).subscribe(Rows => { 
    debugger
    if (Rows != null) {
        this.Stock_Add_Details_Data = Rows[0];
        
        }
           this.issLoading = false;
       },
     Rows => {
            this.issLoading = false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}

Barcode_Change(Barcode_sl:Stock_Take_Details)
{    
      debugger
    this.Stock_Add_Details_=Object.assign({},Barcode_sl);
    this.Barcode_Temp_.ItemId=Barcode_sl.ItemId;
    this.Barcode_Temp_.ItemName=Barcode_sl.ItemName;
    this.Item_=Object.assign({},this.Barcode_Temp_);   
    
    this.Stock_Add_Details_.ItemId=Barcode_sl.ItemId;
    this.Stock_Add_Details_.ItemName=Barcode_sl.ItemName;    
}

Edit_Stock_Take_Details(Stock_add_details_e:Stock_Take_Details, index){

debugger

this.Stock_Add_Edit_Index=index;
this.Stock_Add_Details_=Object.assign({},Stock_add_details_e);

this.Item_Temp.ItemId=Stock_add_details_e.ItemId;
this.Item_Temp.Item_Code=Stock_add_details_e.Item_Code;
this.Barcode_=Object.assign({},this.Item_Temp);

this.Item_Temp.ItemId=Stock_add_details_e.ItemId;
this.Item_Temp.ItemName=Stock_add_details_e.ItemName;
this.Item_=Object.assign({},this.Item_Temp);
  
  }

numberToWordsIndianCurrency(amount) {
    if (amount === 0) return "zero rupees";

    const belowTwenty = [
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven",
        "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    ];

    const tens = [
        "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    ];

    const indianUnits = [
        "", "thousand", "lakh", "crore"
    ];

    function helper(num) {
        if (num < 20) return belowTwenty[num];
        else if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + belowTwenty[num % 10] : "");
        else return belowTwenty[Math.floor(num / 100)] + " hundred" + (num % 100 ? " " + helper(num % 100) : "");
    }

    function convertToWords(num) {
        let word = "";
        let unitsIndex = 0;

        // Handle numbers below 1000
        if (num % 1000 !== 0) {
            word = helper(num % 1000) + (indianUnits[unitsIndex] ? " " + indianUnits[unitsIndex] : "") + " " + word;
        }
        num = Math.floor(num / 1000);
        unitsIndex++;

        // Handle thousands
        if (num % 100 !== 0) {
            word = helper(num % 100) + " thousand " + word;
        }
        num = Math.floor(num / 100);
        unitsIndex++;

        // Handle lakhs
        if (num % 100 !== 0) {
            word = helper(num % 100) + " lakh " + word;
        }
        num = Math.floor(num / 100);
        unitsIndex++;

        // Handle crores
        if (num > 0) {
            word = helper(num) + " crore " + word;
        }

        return word.trim();
    }

    // Split amount into rupees and paise
    const parts = amount.toString().split(".");
    const rupeesPart = parseInt(parts[0], 10);
    const paisePart = parts.length > 1 ? parseInt(parts[1].substring(0, 2), 10) : 0; // Only handle two decimal places

    let rupeesWord = rupeesPart > 0 ? convertToWords(rupeesPart) + " rupees" : "";
    let paiseWord = paisePart > 0 ? convertToWords(paisePart) + " paise" : "";

    if (rupeesWord && paiseWord) {
        return `${rupeesWord} and ${paiseWord}`;
    } else if (rupeesWord) {
        return rupeesWord;
    } else {
        return paiseWord;
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
}