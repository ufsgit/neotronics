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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';@Component({
selector: 'app-Damage_Master',
templateUrl: './Damage_Master.component.html',
styleUrls: ['./Damage_Master.component.css'],
providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})
export class Damage_MasterComponent implements OnInit {
Damage_Master_Data:Damage_Master[]
Damage_Master_:Damage_Master= new Damage_Master();

Damage_Details_Data:Damage_Details[]
Damage_Details_:Damage_Details= new Damage_Details();
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
        this.Permissions = Get_Page_Permission(67);
         
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
    this.Clr_Damage_Master();
    this.Search_Damage_Master();
    this.Entry_View=false;
  //  this.Search_Key_Value();
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Damage_Master();
    this.Clr_Damage_Details();
    this.Damage_Details_Data=[];
}
Close_Click()
{
    this.Entry_View = false;
    this.Clr_Damage_Master();
    this.Clr_Damage_Details();
    this.Damage_Details_Data = [];
    this.Search_Damage_Master();
    this.Is_Expiry_Show=true;
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
Clr_Damage_Master()
{
        this.Damage_Edit_Index=-1;
this.Damage_Master_.Damage_Master_Id=0;
this.Damage_Master_.Date=new Date();
    this.Damage_Master_.Date = this.New_Date(this.Damage_Master_.Date);
this.Damage_Master_.Damage_No="";
this.Damage_Master_.User_Id=0;
}
Clr_Damage_Details()
{
this.Damage_Details_.Damage_Details_Id=0;
this.Damage_Details_.Damage_Master_Id=0;
this.Damage_Details_.ItemId=0;
this.Damage_Details_.Barcode="";
this.Damage_Details_.ItemName="";
this.Damage_Details_.GroupId=0;
this.Damage_Details_.GroupName="";
this.Damage_Details_.UnitId=0;
this.Damage_Details_.UnitName="";
this.Damage_Details_.StockId=0;
this.Damage_Details_.PurchaseRate=0;
this.Damage_Details_.SaleRate=0;
this.Damage_Details_.MRP=0;
this.Damage_Details_.HSNMasterId=0;
this.Damage_Details_.HSNCODE="";
this.Damage_Details_.GST=0;
this.Damage_Details_.Quantity=0;
this.Damage_Details_.CGST=0;
this.Damage_Details_.SGST=0;
this.Damage_Details_.Amount=0;
this.Stock_=null;
// this.To_Stock_=null;
this.Barcode_=null;
}
Search_Damage_Master()
{
 var look_In_Date_Value=0;
if (this.Look_In_Date == true )
look_In_Date_Value = 1;
this.issLoading=true;
// if(this.Employee_.Client_Accounts_Id==undefined ||  this.Employee_==undefined || this.Employee_==null)
// Employee_Id=0
// else
// Employee_Id=this.Employee_.Client_Accounts_Id;
this.Damage_Master_Service_.Search_Damage_Master(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),look_In_Date_Value).subscribe(Rows => {
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
Delete_Damage_Master(Damage_Master_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Damage_Master_Service_.Delete_Damage_Master(Damage_Master_Id).subscribe(Delete_status => {
if(Delete_status[0][0].Damage_Master_Id_>0){
this.Damage_Master_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
this.Search_Damage_Master();
}
else
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
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
Save_Damage_Master()
{
      
if(this.Damage_Details_Data.length==0)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Please Add Details',Type: "3" }});    
return
}
this.Damage_Master_.User_Id= Number(this.Login_Id);
    this.Damage_Master_.Date = this.New_Date(new Date(moment(this.Damage_Master_.Date).format('YYYY-MM-DD')));

this.Damage_Master_.Damage_Details=this.Damage_Details_Data;
this.issLoading=true;

 
this.Damage_Master_Service_.Save_Damage_Master(this.Damage_Master_).subscribe(Save_status => {
        this.issLoading=false;
 
         
if(Number(Save_status[0].Damage_Master_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Close_Click();
}
else{
        this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}

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
Item_Name_Change(Item_sl:Stock){
    
    // this.Stock_=Object.assign({},Item_sl);
if(Item_sl.Barcode!="")
{
this.Item_Temp_.Stock_Id=Item_sl.Stock_Id;
this.Item_Temp_.Barcode=Item_sl.Barcode;
this.Barcode_=Object.assign({},this.Item_Temp_);
this.Damage_Details_.Barcode=Item_sl.Barcode;
}
this.Damage_Details_.ItemId=Item_sl.ItemId;
this.Damage_Details_.ItemName=Item_sl.ItemName;
this.Damage_Details_.UnitId=Item_sl.UnitId;
this.Damage_Details_.UnitName=Item_sl.UnitName;
    this.Damage_Details_.GST=Item_sl.SaleTax;
this.Damage_Details_.GroupId=Item_sl.GroupId;
this.Damage_Details_.PurchaseRate=Item_sl.PurchaseRate;
this.Damage_Details_.GroupName=Item_sl.GroupName;
this.Damage_Details_.HSNMasterId=Item_sl.HSNMasterId;
// this.Damage_Details_.Quantity=Item_sl.Quantity;
this.Damage_Details_.SaleRate=Item_sl.SaleRate;
this.Damage_Details_.MRP=Item_sl.MRP;
}
Barcode_Change(Barcode_sl:Stock)
{
          
    this.Barcode_=Object.assign({},Barcode_sl);
    this.Barcode_Temp_.ItemId=Barcode_sl.ItemId;
    this.Barcode_Temp_.ItemName=Barcode_sl.ItemName;
    this.Stock_=Object.assign({},this.Barcode_Temp_);
 
    this.Damage_Details_.ItemId=Barcode_sl.ItemId;
    this.Damage_Details_.ItemName=Barcode_sl.ItemName;
    this.Damage_Details_.UnitId=Barcode_sl.UnitId;
    this.Damage_Details_.UnitName=Barcode_sl.UnitName;
    this.Damage_Details_.GroupId = Barcode_sl.GroupId;
    this.Damage_Details_.GST = Barcode_sl.SaleTax;
    this.Damage_Details_.PurchaseRate=Barcode_sl.PurchaseRate;
    this.Damage_Details_.GroupName=Barcode_sl.GroupName;
    this.Damage_Details_.HSNMasterId=Barcode_sl.HSNMasterId;
    // this.Damage_Details_.Quantity=Barcode_sl.Quantity;
    this.Damage_Details_.SaleRate=Barcode_sl.SaleRate;
    this.Damage_Details_.MRP=Barcode_sl.MRP;
   
}
Quantity_Change()
{
    if (this.Damage_Details_.Quantity == undefined || this.Damage_Details_.Quantity == null )
    this.Damage_Details_.Quantity=0;
    if (this.Damage_Details_.SaleRate == undefined || this.Damage_Details_.SaleRate == null)
        this.Damage_Details_.SaleRate = 0;
    if (this.Damage_Details_.Amount == undefined || this.Damage_Details_.Amount == null)
        this.Damage_Details_.Amount = 0;
    this.Damage_Details_.Amount = Number(this.Damage_Details_.Quantity) * Number(this.Damage_Details_.SaleRate)
}
Plus_Damage_Details()
{
if(this.Damage_Details_.StockId>0)
    this.Damage_Details_.StockId=this.Damage_Details_.StockId;
else
    this.Damage_Details_.StockId=0;
    if (this.Stock_ == undefined || this.Stock_ == null || this.Stock_.ItemId == 0 || this.Stock_.ItemId==undefined)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Item Name',Type: "3" }});
return
} 

else if(this.Damage_Details_.Quantity==undefined || this.Damage_Details_.Quantity==null || this.Damage_Details_.Quantity==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Quantity',Type: "3" }});
return
}
else if(this.Damage_Details_.PurchaseRate==undefined || this.Damage_Details_.PurchaseRate==null || this.Damage_Details_.PurchaseRate==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Purchase Rate',Type: "3" }});
return
}
else if(this.Damage_Details_.SaleRate==undefined || this.Damage_Details_.SaleRate==null || this.Damage_Details_.SaleRate==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Sales Rate',Type: "3" }});
return
}
else if(this.Damage_Details_.MRP==undefined || this.Damage_Details_.MRP==null || this.Damage_Details_.MRP==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter MRP',Type: "3" }});
return
}

else
 
{
if(this.Damage_Details_Data==undefined)
this.Damage_Details_Data=[];
//document.getElementById("BARCODE").nodeValue = this.Barcode_.Barcode;
//this.Damage_Details_.Barcode=(document.getElementById("BARCODE").value); 
//this.Damage_Details_.Barcode= Object.assign({},this.Barcode_.Barcode);
if( this.Barcode_==null)
{
    this.Damage_Details_.Barcode='';
}

else if(this.Barcode_.Barcode!=undefined && this.Barcode_.Barcode!=null)
{
    this.Damage_Details_.Barcode=  this.Barcode_.Barcode;
}
else if(this.Barcode_!=undefined && this.Barcode_!=null)
{
    const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
    this.Damage_Details_.Barcode=Barcode_string;
}
    if (this.Damage_Edit_Index >= 0) 
    {
        this.Damage_Details_Data[this.Damage_Edit_Index] = Object.assign({}, this.Damage_Details_);
    }
    else
    {
        this.Damage_Details_Data.push(Object.assign({}, this.Damage_Details_));
    }
    this.Damage_Edit_Index=-1;
    this.Clr_Damage_Details();  
}
}

Delete_Damage_Details(index)
{
        
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Damage_Details_Data.splice(index, 1);
this.issLoading=false;
}
});
}
Delete_Damage_Details2(index)
{
this.Damage_Details_Data.splice(index, 1);
}
Edit_Damage_Details(Damage_details_e:Damage_Details,index)
{
         
this.Damage_Edit_Index=index;
this.Damage_Details_=Object.assign({},Damage_details_e);

    this.Item_Temp_.ItemId=Damage_details_e.ItemId;
this.Item_Temp_.Barcode=Damage_details_e.Barcode;
    this.Barcode_ = Object.assign({}, this.Item_Temp_);

    this.Stock_Temp.ItemId=Damage_details_e.ItemId;
    this.Stock_Temp.ItemName=Damage_details_e.ItemName;
this.Stock_=Object.assign({},this.Stock_Temp);


}
Edit_Damage_Master(Damage_Master_e:Damage_Master,index)
{
   
this.Damage_Master_Index=index;
this.Damage_Master_Service_.Get_Damage_Details(Damage_Master_e.Damage_Master_Id).subscribe(Rows => {
     
if (Rows != null) {
this.Damage_Details_Data = Rows[0];

this.issLoading = false;
}

},
Rows => {
 
this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});

this.Entry_View=true;
this.Damage_Master_=Damage_Master_e;
this.Damage_Master_=Object.assign({},Damage_Master_e);
}
}

