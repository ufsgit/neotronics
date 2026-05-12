import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock_Take_Name_Service } from '../../../services/Stock_Take_Name.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Stock_Take_Name } from "../../../models/Stock_Take_Name";
import { Status_s } from '../../../models/Status_s';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { status } from 'aws-sdk/clients/iotfleetwise';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {    dateInput: 'DD/MM/YYYY',    },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };
@Component({
selector: 'app-StockTakeName',
templateUrl: './StockTakeName.component.html',
styleUrls: ['./StockTakeName.component.css']
})

export class StockTakeNameComponent implements OnInit {
Stock_Take_Name_Data:Stock_Take_Name[]
Stock_Take_Name_:Stock_Take_Name=new Stock_Take_Name();

Stock_Take_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;

Status_Data:Status_s[];
Status_:Status_s=new Status_s();
Status_Temp:Status_s=new Status_s();

Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;

year:any;
month:any;
day:any;
date:any;
isLoading=false; 

Stock_Take_Name_Edit:boolean;
Stock_Take_Name_Save:boolean;
Stock_Take_Name_Delete:boolean;
Check_Hide:boolean=true;

constructor(public Stock_Take_Name_Service_:Stock_Take_Name_Service, 
    private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(113);
if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Stock_Take_Name_Edit=this.Permissions.Edit;
    this.Stock_Take_Name_Save=this.Permissions.Save;
    this.Stock_Take_Name_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}

trackByFn(index, item) 
{
return index;
}

Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 300;
     
    this.Get_Status_Dropdown();
    this.Clr_Item();
    this.Entry_View = false;
    this.Check_Hide = true;
}

Create_New()
{
    this.Entry_View = true;
    this.Check_Hide = true;
    this.Clr_Item();
}

Close_Click()
{
    this.Entry_View = false;
    this.Check_Hide = true;
    this.Search_Item();
}

Clr_Item()
{
   this.Stock_Take_Name_.Stock_Take_Name_Id=0;
   this.Stock_Take_Name_.Stocktakename="";
   this.Stock_Take_Name_.Status_Id=0;
   this.Stock_Take_Name_.Status_Name="";
   this.Stock_Take_Name_.StartDate=new Date();
   this.Status_ = null;
//    if(this.Item_Group_Data!=null && this.Item_Group_Data != undefined)
//    this.Item_Group_=this.Item_Group_Data[0];
   if(this.Status_Data!=null && this.Status_Data != undefined)
   this.Status_=this.Status_Data[0];
}

Get_Status_Dropdown() 
{         
        this.Stock_Take_Name_Service_.Status_Dropdown().subscribe(Rows => {       
        this.Status_Data = Rows[0];
        this.Status_Temp.Status_Id = 0;
        this.Status_Temp.Status_Name = "Select";
        this.Status_Data.unshift(this.Status_Temp);
        this.Status_ = this.Status_Data[0];
        },
        Rows => 
        {
        //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
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

Search_Item()
{    
    if(this.Stock_Take_Name_Search==undefined || this.Stock_Take_Name_Search==null)   
    this.Stock_Take_Name_Search='';
    this.issLoading=true;
    debugger
    this.Stock_Take_Name_Service_.Search_stock_take_name(this.Stock_Take_Name_Search).subscribe(Rows => {
     debugger
    this.Stock_Take_Name_Data=Rows[0];
    this.Total_Entries=this.Stock_Take_Name_Data.length;
    if(this.Stock_Take_Name_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
  
}

Delete_Item(Stock_Take_Name_Id,index)
{   
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
    this.Stock_Take_Name_Service_.Delete_stock_take_name(Stock_Take_Name_Id).subscribe(Delete_status => {
        console.log('Delete_status: ',Delete_status);
        Delete_status=Delete_status[0][0].DeleteStatus_.data[0];;
     if(Delete_status==1){ 
    this.Stock_Take_Name_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    this.Search_Item();
    }
    else
    {
   // this.Item_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});});
    }
    });
}

Save_Item()
{
        if(this.Stock_Take_Name_.Stocktakename=="" || this.Stock_Take_Name_.Stocktakename==null || this.Stock_Take_Name_.Stocktakename==undefined)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Name', Type: "3" } });
                }
            if (this.Status_ == undefined || this.Status_ == null) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'select the Status', Type: "3" } });
        }
        else  if (this.Status_.Status_Id == undefined || this.Status_.Status_Id == null) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'select the Status', Type: "3" } });
        }     
else
    {
    this.Stock_Take_Name_.Status_Id= this.Status_.Status_Id;
    this.Stock_Take_Name_.Status_Name=this.Status_.Status_Name;
    this.Stock_Take_Name_.StartDate=this.New_Date(new Date(moment(this.Stock_Take_Name_.StartDate).format('YYYY-MM-DD')));
    this.issLoading=true;
    this.Stock_Take_Name_Service_.Save_stock_take_name(this.Stock_Take_Name_).subscribe(Save_status => {

    Save_status=Save_status[0];
    if(Number(Save_status[0].Stock_Take_Name_Id)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
        this.Clr_Item();
}    
    else if (Number(Save_status[0].Stock_Take_Name_Id)==-1)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Item Name Already Exists',Type:"2"}});
    }
    else{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
}

Edit_Stock_Take_Name(Item_e:Stock_Take_Name,index)
{
    debugger
    this.Entry_View = true;
    this.Check_Hide = false;
    debugger;
this.Stock_Take_Name_=Item_e;
this.Stock_Take_Name_=Object.assign({},Item_e);

for (var i = 0; i < this.Status_Data.length; i++) {
    if (Item_e.Status_Id == this.Status_Data[i].Status_Id)
    this.Status_ = this.Status_Data[i];
}

}
}
