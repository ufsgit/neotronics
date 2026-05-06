import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock_Add_Details_Service } from '../../../services/Stock_Add_Details.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Stock_Add_Details } from '../../../models/Stock_Add_Details';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Item_Group } from '../../../models/Item_Group';
@Component({
selector: 'app-Stock_Add_Details',
templateUrl: './Stock_Add_Details.component.html',
styleUrls: ['./Stock_Add_Details.component.css']
})
export class Stock_Add_DetailsComponent implements OnInit {
Stock_Add_Details_Data:Stock_Add_Details[]
Stock_Add_Details_:Stock_Add_Details= new Stock_Add_Details();
Stock_Add_Details_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Stock_Add_Details_Edit:boolean;
Stock_Add_Details_Save:boolean;
Stock_Add_Details_Delete:boolean;
ItemGroup_Data:Item_Group[]


 
ItemGroup_: Item_Group = new Item_Group();
ItemGroup_Search: Item_Group = new Item_Group();
ItemGroup_Data_Temp: Item_Group = new Item_Group();

ItemGroup_Mode_: Item_Group = new Item_Group();
ItemGroup_Data_: Item_Group = new Item_Group();

constructor(public Stock_Add_Details_Service_:Stock_Add_Details_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(18);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Stock_Add_Details_Edit=this.Permissions.Edit;
this.Stock_Add_Details_Save=this.Permissions.Save;
this.Stock_Add_Details_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
  debugger
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Stock_Add_Details();
this.Search_Stock_Add_Details();
debugger
this.Get_Document_Dropdowns();
debugger
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Stock_Add_Details();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Stock_Add_Details()
 {
this.Stock_Add_Details_.Stock_Add_Details_Id=0;
this.Stock_Add_Details_.Stock_Add_Master_Id=0;
this.Stock_Add_Details_.ItemId=0;
this.Stock_Add_Details_.Barcode="";
this.Stock_Add_Details_.ItemName="";
this.Stock_Add_Details_.GroupId=0;
this.Stock_Add_Details_.GroupName="";
this.Stock_Add_Details_.UnitId=0;
this.Stock_Add_Details_.UnitName="";
this.Stock_Add_Details_.StockId=0;
this.Stock_Add_Details_.PurchaseRate=0;
this.Stock_Add_Details_.SaleRate=0;
this.Stock_Add_Details_.MRP=0;
this.Stock_Add_Details_.HSNMasterId=0;
this.Stock_Add_Details_.HSNCODE="";
this.Stock_Add_Details_.SaleTax=0;
this.Stock_Add_Details_.Quantity=0;
this.Stock_Add_Details_.Stock_Details_Id=0;
this.Stock_Add_Details_.To_Employee_Id=0;

}
Search_Stock_Add_Details()
{
this.issLoading=true;
this.Stock_Add_Details_Service_.Search_Stock_Add_Details('').subscribe(Rows => {
 this.Stock_Add_Details_Data=Rows[0];
this.issLoading=false;
this.Total_Entries=this.Stock_Add_Details_Data.length;
if(this.Stock_Add_Details_Data.length==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
}
this.issLoading = false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); 
 });
}
Delete_Stock_Add_Details(Stock_Add_Details_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Stock_Add_Details_Service_.Delete_Stock_Add_Details(Stock_Add_Details_Id).subscribe(Delete_status => {
if(Delete_status[0][0].Stock_Add_Details_Id_>0){
this.Stock_Add_Details_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
}
else
{
//this.Stock_Add_Details_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
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
Save_Stock_Add_Details()
{
  debugger
document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
debugger
this.Stock_Add_Details_Service_.Save_Stock_Add_Details(this.Stock_Add_Details_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Stock_Add_Details_Id_)>0)
{
  debugger
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
Edit_Stock_Add_Details(Stock_Add_Details_e:Stock_Add_Details,index)
{
  debugger
this.Entry_View=true;
this.Stock_Add_Details_=Stock_Add_Details_e;
debugger
this.Stock_Add_Details_=Object.assign({},Stock_Add_Details_e);
}


Get_Document_Dropdowns() {
    this.Stock_Add_Details_Service_.Get_ItemGroup_Load_Data().subscribe(
      (Rows) => {     
  
    
   debugger
      
        this.ItemGroup_Data = Rows[0].slice();
        this.ItemGroup_Data_Temp.Item_Group_Id = 0;
        this.ItemGroup_Data_Temp.Item_Group_Name = "Select";
        this.ItemGroup_Data.unshift(Object.assign({}, this.ItemGroup_Data_Temp));
        this.ItemGroup_Data_ = this.ItemGroup_Data[0];
  

        
   
  
   
      },
      (Rows) => {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: "2" },
        });
      }
    );
  }


}

